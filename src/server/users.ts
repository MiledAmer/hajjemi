"use server";

import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { z } from "zod";
import { db } from "@/server/db";
import { Governorate, Role } from "../../generated/prisma";

const completeSignupSchema = z.object({
  role: z.enum(["client", "barbier"]),
  name: z.string().min(1),
  phone: z.string().min(1).optional(),
  // Barber-only fields
  businessName: z.string().min(1).optional(),
  governorate: z.nativeEnum(Governorate).optional(),
});

/**
 * Called right after a Clerk sign-up completes: stamps the role on the
 * Clerk user's publicMetadata and creates the linked row(s) in our DB.
 */
export async function completeSignup(
  input: z.infer<typeof completeSignupSchema>,
) {
  const data = completeSignupSchema.parse(input);
  const clerkUser = await currentUser();
  if (!clerkUser) return { error: "Non connecté." };

  const client = await clerkClient();
  await client.users.updateUserMetadata(clerkUser.id, {
    publicMetadata: { role: data.role },
  });

  try {
    const user = await db.user.upsert({
      where: { clerkId: clerkUser.id },
      update: { name: data.name, phone: data.phone },
      create: {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress,
        name: data.name,
        phone: data.phone,
        role: data.role === "barbier" ? Role.BARBER : Role.CLIENT,
      },
    });
    if (data.role === "barbier" && data.businessName && data.governorate) {
      await db.barberProfile.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          businessName: data.businessName,
          governorate: data.governorate,
        },
      });
    }
  } catch (e) {
    console.error("completeSignup db error:", e);
    return { error: "Ce numéro de téléphone est déjà utilisé." };
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
