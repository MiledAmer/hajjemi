"use server";

import { z } from "zod";
import {
  APPOINTMENT_DURATION_MINUTES,
  SLOT_STEP_MINUTES,
  tunisParts,
} from "@/lib/booking";
import { db } from "@/server/db";
import { getSessionBarberProfile, getSessionUser } from "@/server/session";

// Every export here is a public endpoint callable from the browser, so each
// one derives the caller from the session and checks ownership itself. Expected
// failures come back as `{ ok: false, reason }` so the UI can show a message.

const createAppointmentSchema = z.object({
  barberId: z.string().min(1),
  startAt: z.coerce.date(),
});

// Max confirmed rdv per client per week.
const WEEKLY_CONFIRMED_LIMIT = 3;

// Monday 00:00 → next Monday 00:00 of the week containing `date`.
// ponytail: server-local week; a UTC host is off by an hour around Monday
// midnight in Tunis. Move to tunisParts if that edge ever matters.
function weekRange(date: Date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  return { start, end };
}

function confirmedCountInWeek(clientId: string, date: Date) {
  const { start, end } = weekRange(date);
  return db.appointment.count({
    where: {
      clientId,
      status: "CONFIRMED",
      startAt: { gte: start, lt: end },
    },
  });
}

export type CreateAppointmentResult =
  | { ok: true; id: string }
  | {
      ok: false;
      reason:
        | "unauthenticated"
        | "forbidden"
        | "invalid"
        | "unavailable"
        | "conflict"
        | "duplicate"
        | "limit";
    };

// clientId is always the signed-in user — never taken from the caller, and
// neither are the end time, status or price: a booking is always a PENDING,
// fixed-length request.
export async function createAppointment(
  input: z.infer<typeof createAppointmentSchema>,
): Promise<CreateAppointmentResult> {
  const parsed = createAppointmentSchema.safeParse(input);
  if (!parsed.success || Number.isNaN(parsed.data.startAt.getTime())) {
    return { ok: false, reason: "invalid" };
  }
  const { barberId, startAt } = parsed.data;

  const user = await getSessionUser();
  if (!user) return { ok: false, reason: "unauthenticated" };
  if (user.role !== "CLIENT") return { ok: false, reason: "forbidden" };

  const availability = await db.barberAvailability.findMany({
    where: { barberId },
  });
  if (availability.length === 0) {
    // Unknown barber, or one who never opened a day.
    return { ok: false, reason: "unavailable" };
  }

  // The slot must be in the future, on the slot grid, and inside one of the
  // barber's opening ranges for that weekday.
  const endAt = new Date(startAt.getTime() + APPOINTMENT_DURATION_MINUTES * 60_000);
  const { weekday, minutes } = tunisParts(startAt);
  const inHours = availability.some(
    (r) =>
      r.dayOfWeek === weekday &&
      minutes >= r.startMinute &&
      minutes + APPOINTMENT_DURATION_MINUTES <= r.endMinute,
  );
  if (
    startAt.getTime() <= Date.now() ||
    startAt.getTime() % 60_000 !== 0 ||
    minutes % SLOT_STEP_MINUTES !== 0 ||
    !inHours
  ) {
    return { ok: false, reason: "unavailable" };
  }

  const duplicate = await db.appointment.findFirst({
    where: {
      clientId: user.id,
      barberId,
      startAt,
      status: { in: ["PENDING", "CONFIRMED"] },
    },
  });
  if (duplicate) return { ok: false, reason: "duplicate" };

  // A client may hold only one open (pending or confirmed, still upcoming)
  // reservation at a time — no new booking while one is still open.
  const active = await db.appointment.findFirst({
    where: {
      clientId: user.id,
      status: { in: ["PENDING", "CONFIRMED"] },
      endAt: { gt: new Date() },
    },
  });
  if (active) return { ok: false, reason: "limit" };

  try {
    // Serializable so two clients racing for the same slot can't both win.
    return await db.$transaction(
      async (tx) => {
        const clash = await tx.appointment.findFirst({
          where: {
            barberId,
            status: { in: ["PENDING", "CONFIRMED"] },
            startAt: { lt: endAt },
            endAt: { gt: startAt },
          },
        });
        if (clash) return { ok: false, reason: "conflict" } as const;
        const created = await tx.appointment.create({
          data: { clientId: user.id, barberId, startAt, endAt, totalPriceMillimes: 0 },
        });
        return { ok: true, id: created.id } as const;
      },
      { isolationLevel: "Serializable" },
    );
  } catch (e) {
    // P2034 = serialization failure: someone else took the slot first.
    if ((e as { code?: string }).code === "P2034") {
      return { ok: false, reason: "conflict" };
    }
    console.error("createAppointment error:", e);
    throw e;
  }
}

export type RespondResult =
  | { ok: true }
  | {
      ok: false;
      reason:
        | "unauthenticated"
        | "not_found"
        | "not_pending"
        | "past"
        | "limit";
    };

// Barber accepts or declines one of their own pending requests.
export async function respondToAppointment(
  id: string,
  status: "CONFIRMED" | "CANCELLED",
): Promise<RespondResult> {
  if (typeof id !== "string" || (status !== "CONFIRMED" && status !== "CANCELLED")) {
    return { ok: false, reason: "not_found" };
  }
  const profile = await getSessionBarberProfile();
  if (!profile) return { ok: false, reason: "unauthenticated" };

  const appt = await db.appointment.findFirst({
    where: { id, barberId: profile.id },
  });
  if (!appt) return { ok: false, reason: "not_found" };
  if (appt.status !== "PENDING") return { ok: false, reason: "not_pending" };

  if (status === "CONFIRMED") {
    if (appt.startAt.getTime() <= Date.now()) return { ok: false, reason: "past" };
    if ((await confirmedCountInWeek(appt.clientId, appt.startAt)) >= WEEKLY_CONFIRMED_LIMIT) {
      return { ok: false, reason: "limit" };
    }
  }

  // Re-checking PENDING in the update guards against a concurrent client
  // cancellation between the read above and this write.
  const { count } = await db.appointment.updateMany({
    where: { id, barberId: profile.id, status: "PENDING" },
    // Accepting/declining is exactly what the client needs to be notified of.
    data: { status, clientSeenAt: null },
  });
  return count > 0 ? { ok: true } : { ok: false, reason: "not_pending" };
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

// Client-initiated cancellation. Allowed only while the cancellation day is
// strictly before the appointment day; on or after that day it's refused.
export async function cancelAppointment(
  id: string,
): Promise<
  | { ok: true }
  | { ok: false; reason: "unauthenticated" | "not_found" | "too_late" }
> {
  const user = await getSessionUser();
  if (!user) return { ok: false, reason: "unauthenticated" };
  const appt = await db.appointment.findUnique({ where: { id } });
  if (
    appt?.clientId !== user.id ||
    (appt.status !== "PENDING" && appt.status !== "CONFIRMED")
  ) {
    return { ok: false, reason: "not_found" };
  }
  // ISO day strings compare chronologically.
  if (tunisParts(new Date()).day >= tunisParts(appt.startAt).day) {
    return { ok: false, reason: "too_late" };
  }
  await db.appointment.update({
    where: { id },
    data: { status: "CANCELLED", clientSeenAt: new Date() },
  });
  return { ok: true };
}
