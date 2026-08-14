"use server";

import { z } from "zod";
import { db } from "@/server/db";
import { getSessionUser } from "@/server/users";
import { AppointmentStatus } from "../../generated/prisma";

const createAppointmentSchema = z
  .object({
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

// Max confirmed rdv per client per week — also the cap once any rdv is
// confirmed (confirmed + pending can't exceed this).
const WEEKLY_CONFIRMED_LIMIT = 3;
// A client may pile up more requests while none are confirmed yet.
const WEEKLY_PENDING_LIMIT = 4;

// Monday 00:00 → next Monday 00:00 of the week containing `date`.
function weekRange(date: Date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  return { start, end };
}

async function countInWeek(
  clientId: string,
  date: Date,
  statuses: ("PENDING" | "CONFIRMED")[],
  excludeId?: string,
) {
  const { start, end } = weekRange(date);
  return db.appointment.count({
    where: {
      clientId,
      status: { in: statuses },
      startAt: { gte: start, lt: end },
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
  });
}

const confirmedCountInWeek = (clientId: string, date: Date, excludeId?: string) =>
  countInWeek(clientId, date, ["CONFIRMED"], excludeId);

// clientId is always the signed-in user — never taken from the caller.
export async function createAppointment(
  input: z.infer<typeof createAppointmentSchema>,
): Promise<
  | { limitReached: true; duplicate?: undefined }
  | { duplicate: true; limitReached?: undefined }
  | { limitReached?: undefined; duplicate?: undefined; id: string }
> {
  const data = createAppointmentSchema.parse(input);
  const user = await getSessionUser();
  if (!user) throw new Error("Not signed in");
  const clientId = user.id;
  const duplicate = await db.appointment.findFirst({
    where: {
      clientId,
      barberId: data.barberId,
      startAt: data.startAt,
      status: { in: ["PENDING", "CONFIRMED"] },
    },
  });
  if (duplicate) return { duplicate: true };
  // Up to 4 requests while nothing is confirmed; once a rdv is confirmed the
  // combined pending + confirmed count is capped at 3.
  const confirmed = await confirmedCountInWeek(clientId, data.startAt);
  const active = await countInWeek(clientId, data.startAt, [
    "PENDING",
    "CONFIRMED",
  ]);
  const limit = confirmed > 0 ? WEEKLY_CONFIRMED_LIMIT : WEEKLY_PENDING_LIMIT;
  if (active >= limit) return { limitReached: true };
  return db.appointment.create({ data: { ...data, clientId } });
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
  const appointments = await db.appointment.findMany({
    where: { barberId },
    include: { client: true },
    orderBy: { startAt: "asc" },
  });
  // Annotate pending requests with how many confirmed slots the client
  // still has in that week, so the barber sees it before accepting.
  return Promise.all(
    appointments.map(async (a) => ({
      ...a,
      remainingThisWeek:
        a.status === "PENDING"
          ? Math.max(
              WEEKLY_CONFIRMED_LIMIT -
                (await confirmedCountInWeek(a.clientId, a.startAt)),
              0,
            )
          : null,
    })),
  );
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

// Called from the client — derives the user from the session.
export async function markAppointmentsSeenByClient() {
  const user = await getSessionUser();
  if (!user) return;
  await db.appointment.updateMany({
    where: { clientId: user.id, clientSeenAt: null },
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
