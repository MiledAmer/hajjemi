"use server";

import { z } from "zod";
import { db } from "@/server/db";
import { deleteObject, keyFromUrl } from "@/server/r2";
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
  return db.barberProfile.findUnique({ where: { id }, include: { user: true } });
}

export async function getBarberProfileByUserId(userId: string) {
  return db.barberProfile.findUnique({ where: { userId } });
}

export async function listBarberProfiles() {
  return db.barberProfile.findMany({ orderBy: { createdAt: "desc" } });
}

export async function searchBarberProfiles(input: {
  query?: string;
  governorate?: Governorate;
}) {
  const query = input.query?.trim();
  return db.barberProfile.findMany({
    where: {
      governorate: input.governorate,
      ...(query
        ? {
            OR: [
              { businessName: { contains: query, mode: "insensitive" } },
              { address: { contains: query, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateBarberProfile(
  id: string,
  input: z.infer<typeof updateBarberProfileSchema>,
) {
  const data = updateBarberProfileSchema.parse(input);
  const previous = await db.barberProfile.findUnique({
    where: { id },
    select: { avatarUrl: true },
  });
  const updated = await db.barberProfile.update({ where: { id }, data });

  const oldAvatarUrl = previous?.avatarUrl;
  if (oldAvatarUrl && data.avatarUrl && data.avatarUrl !== oldAvatarUrl) {
    // Best-effort: the DB is already the source of truth for the current
    // avatar, so a failed delete just leaves an orphaned R2 object.
    await deleteObject(keyFromUrl(oldAvatarUrl)).catch(() => undefined);
  }

  return updated;
}

export async function deleteBarberProfile(id: string) {
  return db.barberProfile.delete({ where: { id } });
}
