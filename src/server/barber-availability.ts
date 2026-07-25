"use server";

import { z } from "zod";
import { db } from "@/server/db";
import { DayOfWeek } from "../../generated/prisma";

const availabilitySchema = z
  .object({
    barberId: z.string().min(1),
    dayOfWeek: z.nativeEnum(DayOfWeek),
    startMinute: z.number().int().min(0).max(1439),
    endMinute: z.number().int().min(0).max(1439),
  })
  .refine((data) => data.endMinute > data.startMinute, {
    message: "endMinute must be after startMinute",
    path: ["endMinute"],
  });

const updateAvailabilitySchema = z
  .object({
    dayOfWeek: z.nativeEnum(DayOfWeek).optional(),
    startMinute: z.number().int().min(0).max(1439).optional(),
    endMinute: z.number().int().min(0).max(1439).optional(),
  })
  .refine(
    (data) =>
      data.startMinute === undefined ||
      data.endMinute === undefined ||
      data.endMinute > data.startMinute,
    { message: "endMinute must be after startMinute", path: ["endMinute"] },
  );

export async function createAvailability(
  input: z.infer<typeof availabilitySchema>,
) {
  const data = availabilitySchema.parse(input);
  return db.barberAvailability.create({ data });
}

export async function getAvailability(id: string) {
  return db.barberAvailability.findUnique({ where: { id } });
}

export async function listAvailability(barberId: string) {
  return db.barberAvailability.findMany({
    where: { barberId },
    orderBy: [{ dayOfWeek: "asc" }, { startMinute: "asc" }],
  });
}

export async function updateAvailability(
  id: string,
  input: z.infer<typeof updateAvailabilitySchema>,
) {
  const data = updateAvailabilitySchema.parse(input);
  return db.barberAvailability.update({ where: { id }, data });
}

export async function deleteAvailability(id: string) {
  return db.barberAvailability.delete({ where: { id } });
}
