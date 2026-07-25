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

const WEEKDAYS = [
  DayOfWeek.MONDAY,
  DayOfWeek.TUESDAY,
  DayOfWeek.WEDNESDAY,
  DayOfWeek.THURSDAY,
  DayOfWeek.FRIDAY,
  DayOfWeek.SATURDAY,
] as const;

const timeRangeSchema = z
  .string()
  .regex(/^\d{2}:\d{2} - \d{2}:\d{2}$/, "Format attendu: HH:MM - HH:MM");

function parseRange(range: string) {
  const [start, end] = timeRangeSchema.parse(range).split(" - ") as [
    string,
    string,
  ];
  const toMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h! * 60 + m!;
  };
  return { startMinute: toMinutes(start), endMinute: toMinutes(end) };
}

/// Simplified weekly-hours editor backing the dashboard's "Lundi - Samedi" /
/// "Dimanche" fields: applies one range to Mon-Sat and an optional range (or
/// closed) to Sunday, rather than exposing all 7 days individually.
export async function setWeeklyHours(
  barberId: string,
  input: { weekdaysRange: string; sundayRange: string | null },
) {
  const { startMinute, endMinute } = parseRange(input.weekdaysRange);
  const existing = await db.barberAvailability.findMany({
    where: { barberId },
  });

  await db.$transaction([
    ...WEEKDAYS.map((dayOfWeek) => {
      const row = existing.find((r) => r.dayOfWeek === dayOfWeek);
      return row
        ? db.barberAvailability.update({
            where: { id: row.id },
            data: { startMinute, endMinute },
          })
        : db.barberAvailability.create({
            data: { barberId, dayOfWeek, startMinute, endMinute },
          });
    }),
    ...(() => {
      const sunRow = existing.find((r) => r.dayOfWeek === DayOfWeek.SUNDAY);
      if (input.sundayRange) {
        const sun = parseRange(input.sundayRange);
        return [
          sunRow
            ? db.barberAvailability.update({
                where: { id: sunRow.id },
                data: sun,
              })
            : db.barberAvailability.create({
                data: {
                  barberId,
                  dayOfWeek: DayOfWeek.SUNDAY,
                  ...sun,
                },
              }),
        ];
      }
      return sunRow
        ? [db.barberAvailability.delete({ where: { id: sunRow.id } })]
        : [];
    })(),
  ]);
}
