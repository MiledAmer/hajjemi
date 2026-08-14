"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { db } from "@/server/db";
import { Governorate, Role } from "../../generated/prisma";

const signupSchema = z.object({
  role: z.enum(["client", "barbier"]),
  name: z
    .string()
    .trim()
    .min(1, "Le nom est requis.")
    .regex(/^[\p{L}\s'-]+$/u, "Le nom ne doit contenir que des lettres."),
  phone: z
    .string()
    .trim()
    .regex(/^\d{8}$/, "Le numéro doit contenir 8 chiffres."),
  email: z.string().trim().email("Adresse e-mail invalide."),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères."),
  // Barber-only fields
  businessName: z.string().trim().min(1).optional(),
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
    const clerkUser = await client.users.createUser({
      emailAddress: [data.email],
      password: data.password,
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

export async function getUser(id: string) {
  return db.user.findUnique({ where: { id } });
}

export async function listUsers() {
  return db.user.findMany({ orderBy: { createdAt: "desc" } });
}

export async function deleteUser(id: string) {
  return db.user.delete({ where: { id } });
}
