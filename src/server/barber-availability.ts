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

const dayHoursSchema = z
  .object({
    day: z.nativeEnum(DayOfWeek),
    open: z.boolean(),
    startMinute: z.number().int().min(0).max(1439),
    endMinute: z.number().int().min(0).max(1439),
  })
  .refine((d) => !d.open || d.endMinute > d.startMinute, {
    message: "L'heure de fin doit suivre l'heure de début.",
    path: ["endMinute"],
  });

/// Per-day hours editor: one row per open day, deleted for days off. Lets the
/// barber pick any combination of open days and times (not just Mon-Sat +
/// Sunday). Days omitted from the array are left untouched.
export async function setDailyHours(
  barberId: string,
  days: z.infer<typeof dayHoursSchema>[],
) {
  const parsed = z.array(dayHoursSchema).parse(days);
  const existing = await db.barberAvailability.findMany({ where: { barberId } });
  const ops = [];
  for (const d of parsed) {
    const row = existing.find((r) => r.dayOfWeek === d.day);
    if (!d.open) {
      if (row) ops.push(db.barberAvailability.delete({ where: { id: row.id } }));
      continue;
    }
    const data = { startMinute: d.startMinute, endMinute: d.endMinute };
    ops.push(
      row
        ? db.barberAvailability.update({ where: { id: row.id }, data })
        : db.barberAvailability.create({
            data: { barberId, dayOfWeek: d.day, ...data },
          }),
    );
  }
  await db.$transaction(ops);
}
