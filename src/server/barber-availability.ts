"use server";

import { z } from "zod";
import { db } from "@/server/db";
import { getSessionBarberProfile } from "@/server/session";
import { DayOfWeek } from "../../generated/prisma";

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

/// Per-day hours editor for the signed-in barber: one row per open day,
/// deleted for days off. Days omitted from the array are left untouched.
export async function setDailyHours(
  days: z.infer<typeof dayHoursSchema>[],
): Promise<{ error: string | null }> {
  const parsed = z.array(dayHoursSchema).max(7).safeParse(days);
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Horaires invalides.",
    };
  }
  const profile = await getSessionBarberProfile();
  if (!profile) return { error: "Non connecté." };

  try {
    const existing = await db.barberAvailability.findMany({
      where: { barberId: profile.id },
    });
    const ops = [];
    for (const d of parsed.data) {
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
              data: { barberId: profile.id, dayOfWeek: d.day, ...data },
            }),
      );
    }
    await db.$transaction(ops);
  } catch (e) {
    console.error("setDailyHours error:", e);
    return { error: "Échec de l'enregistrement des horaires." };
  }
  return { error: null };
}
