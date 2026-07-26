import { notFound } from "next/navigation";
import { listAppointmentsByBarber } from "@/server/appointments";
import { listAvailability } from "@/server/barber-availability";
import { getBarberProfile } from "@/server/barber-profiles";
import { BarberProfileClient } from "./_components/barber-profile-client";

export default async function ProfilBarberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [profile, availability, appointments] = await Promise.all([
    getBarberProfile(id),
    listAvailability(id),
    listAppointmentsByBarber(id),
  ]);

  if (!profile) notFound();

  return (
    <BarberProfileClient
      profile={profile}
      availability={availability}
      appointments={appointments}
    />
  );
}
