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

export async function createAppointment(
  input: z.infer<typeof createAppointmentSchema>,
) {
  const data = createAppointmentSchema.parse(input);
  return db.appointment.create({ data });
}

export async function getAppointment(id: string) {
  return db.appointment.findUnique({ where: { id } });
}

export async function listAppointmentsByBarber(barberId: string) {
  return db.appointment.findMany({
    where: { barberId },
    include: { client: true },
    orderBy: { startAt: "asc" },
  });
}

export async function listAppointmentsByClient(clientId: string) {
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
