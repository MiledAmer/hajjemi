"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { db } from "@/server/db";
import { emailSchema } from "@/lib/email";
import { personNameSchema, salonNameSchema } from "@/lib/name";
import { Governorate, Role } from "../../generated/prisma";

const signupSchema = z.object({
  role: z.enum(["client", "barbier"]),
  name: personNameSchema,
  phone: z
    .string()
    .trim()
    .regex(/^\d{8}$/, "Le numéro doit contenir 8 chiffres."),
  email: emailSchema,
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères."),
  // Barber-only fields
  businessName: salonNameSchema.optional(),
  governorate: z.nativeEnum(Governorate).optional(),
});

/**
 * Full sign-up, entirely server-side: validates the form, creates the Clerk
 * user via the backend API (no captcha / no client session involved), then
 * the linked row(s) in our DB. If the DB write fails the Clerk user is
 * deleted so the two stores never diverge. The page signs the user in
 * afterwards with the normal sign-in flow.
 */
export async function signupUser(input: z.infer<typeof signupSchema>) {
  const parsed = signupSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }
  const data = parsed.data;
  if (data.role === "barbier" && (!data.businessName || !data.governorate)) {
    return { error: "Nom du salon et gouvernorat requis." };
  }

  if (await db.user.findUnique({ where: { phone: data.phone } })) {
    return { error: "Ce numéro de téléphone est déjà utilisé." };
  }

  const client = await clerkClient();
  let clerkUserId: string;
  try {
    const [firstName, ...rest] = data.name.split(/\s+/);
    const clerkUser = await client.users.createUser({
      emailAddress: [data.email],
      password: data.password,
      firstName,
      lastName: rest.join(" ") || undefined,
      publicMetadata: { role: data.role },
    });
    clerkUserId = clerkUser.id;
  } catch (e) {
    console.error("signupUser clerk error:", e);
    const clerkMessage = (
      e as { errors?: { message?: string; code?: string }[] }
    ).errors?.[0];
    if (clerkMessage?.code === "form_identifier_exists") {
      return { error: "Cette adresse e-mail est déjà utilisée." };
    }
    if (clerkMessage?.code === "form_password_pwned") {
      return {
        error: "Ce mot de passe est trop courant, choisissez-en un autre.",
      };
    }
    return { error: clerkMessage?.message ?? "Échec de la création du compte." };
  }

  try {
    const user = await db.user.create({
      data: {
        clerkId: clerkUserId,
        email: data.email,
        name: data.name,
        phone: data.phone,
        role: data.role === "barbier" ? Role.BARBER : Role.CLIENT,
      },
    });
    if (data.role === "barbier" && data.businessName && data.governorate) {
      await db.barberProfile.create({
        data: {
          userId: user.id,
          businessName: data.businessName,
          governorate: data.governorate,
        },
      });
    }
  } catch (e) {
    console.error("signupUser db error:", e);
    // Roll back the Clerk user so email isn't stuck "already used" with no DB row.
    await client.users.deleteUser(clerkUserId).catch(() => undefined);
    return { error: "Erreur lors de l'enregistrement. Réessayez." };
  }
  return { error: null };
}

// Role of the signed-in Clerk user, from publicMetadata ({ "role": "barbier" }).
export async function getSessionRole() {
  const user = await currentUser();
  if (!user) return null;
  return user.publicMetadata.role === "barbier" ? "barbier" : "client";
}

// DB row of the signed-in Clerk user.
export async function getSessionUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;
  return db.user.findUnique({ where: { clerkId: clerkUser.id } });
}

// BarberProfile of the signed-in Clerk user (null if not a barber).
export async function getSessionBarberProfile() {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;
  return db.barberProfile.findFirst({
    where: { user: { clerkId: clerkUser.id } },
    include: { user: true },
  });
}

const contactSchema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^\d{8}$/, "Le numéro doit contenir 8 chiffres."),
  email: emailSchema,
});

/**
 * Updates the signed-in user's phone + email. The email is the Clerk login
 * identifier, so a change is mirrored to Clerk (new address added as verified
 * primary, old ones removed) to keep auth working.
 */
export async function updateBarberContact(
  input: z.infer<typeof contactSchema>,
) {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }
  const { phone, email } = parsed.data;
  const user = await getSessionUser();
  if (!user?.clerkId) return { error: "Non connecté." };

  const phoneTaken = await db.user.findFirst({
    where: { phone, id: { not: user.id } },
  });
  if (phoneTaken) return { error: "Ce numéro de téléphone est déjà utilisé." };

  if (email !== user.email) {
    const client = await clerkClient();
    try {
      await client.emailAddresses.createEmailAddress({
        userId: user.clerkId,
        emailAddress: email,
        verified: true,
        primary: true,
      });
      const clerkUser = await client.users.getUser(user.clerkId);
      await Promise.all(
        clerkUser.emailAddresses
          .filter((e) => e.emailAddress !== email)
          .map((e) => client.emailAddresses.deleteEmailAddress(e.id)),
      );
    } catch (e) {
      console.error("updateBarberContact clerk error:", e);
      const code = (e as { errors?: { code?: string }[] }).errors?.[0]?.code;
      if (code === "form_identifier_exists") {
        return { error: "Cette adresse e-mail est déjà utilisée." };
      }
      return { error: "Échec de la mise à jour de l'e-mail." };
    }
  }

  await db.user.update({ where: { id: user.id }, data: { phone, email } });
  return { error: null };
}

export async function getUser(id: string) {
  return db.user.findUnique({ where: { id } });
}

export async function listUsers() {
  return db.user.findMany({ orderBy: { createdAt: "desc" } });
}

export async function deleteUser(id: string) {
  return db.user.delete({ where: { id } });
}
