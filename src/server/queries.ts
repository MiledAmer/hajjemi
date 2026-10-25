import { GOVERNORATE_LABELS } from "@/lib/governorate";
import { db } from "@/server/db";
import type { Governorate } from "../../generated/prisma";

// Read-only helpers for server components. Plain module (no "use server"):
// none of these may be exposed as callable endpoints.

// Confirmed appointments whose time has passed become COMPLETED, and pending
// requests nobody answered before their time are cancelled, lazily whenever
// a list is read — no cron needed.
async function settlePastAppointments() {
  const now = new Date();
  await db.appointment.updateMany({
    where: { status: "CONFIRMED", endAt: { lt: now } },
    data: { status: "COMPLETED" },
  });
  await db.appointment.updateMany({
    where: { status: "PENDING", startAt: { lt: now } },
    data: { status: "CANCELLED", clientSeenAt: null },
  });
}

export async function listAppointmentsByBarber(barberId: string) {
  await settlePastAppointments();
  return db.appointment.findMany({
    where: { barberId },
    include: { client: { select: { id: true, name: true } } },
    orderBy: { startAt: "asc" },
  });
}

export async function listAppointmentsByClient(clientId: string) {
  await settlePastAppointments();
  return db.appointment.findMany({
    where: { clientId },
    include: { barber: true },
    orderBy: { startAt: "asc" },
  });
}

export function countUnseenAppointmentsForClient(clientId: string) {
  return db.appointment.count({ where: { clientId, clientSeenAt: null } });
}

/// Time ranges that can't be booked on a barber's public page. Deliberately
/// carries no client info — this page is visible to everyone.
export function listBusySlots(barberId: string) {
  return db.appointment.findMany({
    where: {
      barberId,
      status: { in: ["PENDING", "CONFIRMED"] },
      endAt: { gt: new Date() },
    },
    select: { startAt: true, endAt: true },
    orderBy: { startAt: "asc" },
  });
}

export function listAvailability(barberId: string) {
  return db.barberAvailability.findMany({
    where: { barberId },
    orderBy: [{ dayOfWeek: "asc" }, { startMinute: "asc" }],
  });
}

// Public pages only get the barber's display name — never the user's
// email, phone or auth id.
const publicUser = { select: { name: true } } as const;

export function getBarberProfile(id: string) {
  return db.barberProfile.findUnique({
    where: { id },
    include: { user: publicUser },
  });
}

// Accent- and case-insensitive so "beja"/"BÉJA" both match "Béja".
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

export function searchBarberProfiles(input: {
  query?: string;
  governorate?: Governorate;
}) {
  const query = input.query?.trim();
  // Governorates whose label matches the typed text — lets clients search by
  // city name even though it's stored as an enum, not free text.
  const matchedGovs = query
    ? (Object.entries(GOVERNORATE_LABELS) as [Governorate, string][])
        .filter(([, label]) => normalize(label).includes(normalize(query)))
        .map(([g]) => g)
    : [];
  return db.barberProfile.findMany({
    where: {
      governorate: input.governorate,
      ...(query
        ? {
            OR: [
              { businessName: { contains: query, mode: "insensitive" } },
              { address: { contains: query, mode: "insensitive" } },
              ...(matchedGovs.length
                ? [{ governorate: { in: matchedGovs } }]
                : []),
            ],
          }
        : {}),
    },
    include: { user: publicUser },
    orderBy: { createdAt: "desc" },
  });
}
