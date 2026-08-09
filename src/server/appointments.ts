"use server";

import { z } from "zod";
import { db } from "@/server/db";
import { AppointmentStatus } from "../../generated/prisma";

const createAppointmentSchema = z
  .object({
    clientId: z.string().min(1),
    barberId: z.string().min(1),
    startAt: z.coerce.date(),
    endAt: z.coerce.date(),
    // ponytail: no Service catalog yet, so the client can't price the
    // visit up front — barber sets/confirms the price out of band.
    totalPriceMillimes: z.number().int().nonnegative().default(0),
    status: z.nativeEnum(AppointmentStatus).default(AppointmentStatus.PENDING),
  })
  .refine((data) => data.endAt > data.startAt, {
    message: "endAt must be after startAt",
    path: ["endAt"],
  });

const updateAppointmentSchema = z.object({
  startAt: z.coerce.date().optional(),
  endAt: z.coerce.date().optional(),
  totalPriceMillimes: z.number().int().positive().optional(),
  status: z.nativeEnum(AppointmentStatus).optional(),
});

const WEEKLY_CONFIRMED_LIMIT = 3;

// Monday 00:00 → next Monday 00:00 of the week containing `date`.
function weekRange(date: Date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  return { start, end };
}

async function confirmedCountInWeek(
  clientId: string,
  date: Date,
  excludeId?: string,
) {
  const { start, end } = weekRange(date);
  return db.appointment.count({
    where: {
      clientId,
      status: "CONFIRMED",
      startAt: { gte: start, lt: end },
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
  });
}

export async function createAppointment(
  input: z.infer<typeof createAppointmentSchema>,
): Promise<{ limitReached: true } | { limitReached?: undefined; id: string }> {
  const data = createAppointmentSchema.parse(input);
  const confirmed = await confirmedCountInWeek(data.clientId, data.startAt);
  if (confirmed >= WEEKLY_CONFIRMED_LIMIT) return { limitReached: true };
  return db.appointment.create({ data });
}

export async function getAppointment(id: string) {
  return db.appointment.findUnique({ where: { id } });
}

// Confirmed appointments whose time has passed become COMPLETED lazily,
// whenever a list is read — no cron needed.
async function completePastAppointments() {
  await db.appointment.updateMany({
    where: { status: "CONFIRMED", endAt: { lt: new Date() } },
    data: { status: "COMPLETED" },
  });
}

export async function listAppointmentsByBarber(barberId: string) {
  await completePastAppointments();
  return db.appointment.findMany({
    where: { barberId },
    include: { client: true },
    orderBy: { startAt: "asc" },
  });
}

export async function listAppointmentsByClient(clientId: string) {
  await completePastAppointments();
  return db.appointment.findMany({
    where: { clientId },
    include: { barber: true },
    orderBy: { startAt: "asc" },
  });
}

export async function countUnseenAppointmentsForClient(clientId: string) {
  return db.appointment.count({ where: { clientId, clientSeenAt: null } });
}

export async function markAppointmentsSeenByClient(clientId: string) {
  return db.appointment.updateMany({
    where: { clientId, clientSeenAt: null },
    data: { clientSeenAt: new Date() },
  });
}

export async function updateAppointment(
  id: string,
  input: z.infer<typeof updateAppointmentSchema>,
) {
  const data = updateAppointmentSchema.parse(input);
  if (data.status === "CONFIRMED") {
    const appt = await db.appointment.findUniqueOrThrow({ where: { id } });
    const confirmed = await confirmedCountInWeek(
      appt.clientId,
      data.startAt ?? appt.startAt,
      id,
    );
    if (confirmed >= WEEKLY_CONFIRMED_LIMIT) return { limitReached: true };
  }
  return db.appointment.update({
    where: { id },
    data: {
      ...data,
      // Accepting/declining is exactly what the client needs to be notified
      // of — flag it unseen again even if they'd already checked this
      // appointment before (e.g. it was reopened).
      ...(data.status === "CONFIRMED" || data.status === "CANCELLED"
        ? { clientSeenAt: null }
        : {}),
    },
  });
}

export async function deleteAppointment(id: string) {
  return db.appointment.delete({ where: { id } });
}
