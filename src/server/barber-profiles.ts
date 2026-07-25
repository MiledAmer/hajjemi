"use server";

import { z } from "zod";
import { db } from "@/server/db";
import { Governorate, PlanType } from "../../generated/prisma";

const createBarberProfileSchema = z.object({
  userId: z.string().min(1),
  businessName: z.string().min(1),
  bio: z.string().optional(),
  governorate: z.nativeEnum(Governorate),
  address: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  coverImageUrl: z.string().url().optional(),
  planType: z.nativeEnum(PlanType).default(PlanType.BASIC),
});

const updateBarberProfileSchema = createBarberProfileSchema
  .omit({ userId: true })
  .partial();

export async function createBarberProfile(
  input: z.infer<typeof createBarberProfileSchema>,
) {
  const data = createBarberProfileSchema.parse(input);
  return db.barberProfile.create({ data });
}

export async function getBarberProfile(id: string) {
  return db.barberProfile.findUnique({ where: { id } });
}

export async function getBarberProfileByUserId(userId: string) {
  return db.barberProfile.findUnique({ where: { userId } });
}

export async function listBarberProfiles() {
  return db.barberProfile.findMany({ orderBy: { createdAt: "desc" } });
}

export async function updateBarberProfile(
  id: string,
  input: z.infer<typeof updateBarberProfileSchema>,
) {
  const data = updateBarberProfileSchema.parse(input);
  return db.barberProfile.update({ where: { id }, data });
}

export async function deleteBarberProfile(id: string) {
  return db.barberProfile.delete({ where: { id } });
}
