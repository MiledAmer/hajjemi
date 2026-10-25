import { notFound } from "next/navigation";
import {
  getBarberProfile,
  listAvailability,
  listBusySlots,
} from "@/server/queries";
import { BarberProfileClient } from "./_components/barber-profile-client";

// Booked slots change constantly — never serve a stale snapshot.
export const dynamic = "force-dynamic";

export default async function ProfilBarberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await getBarberProfile(id);
  if (!profile) notFound();

  const [availability, busySlots] = await Promise.all([
    listAvailability(id),
    listBusySlots(id),
  ]);

  return (
    <BarberProfileClient
      profile={profile}
      availability={availability}
      busySlots={busySlots}
    />
  );
}
