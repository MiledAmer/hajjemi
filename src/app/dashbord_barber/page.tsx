import { notFound } from "next/navigation";
import { listAppointmentsByBarber } from "@/server/appointments";
import { listAvailability } from "@/server/barber-availability";
import { getSessionBarberProfile } from "@/server/users";
import { DashboardClient } from "./_components/dashboard-client";

// Always live data — accept/decline and profile edits must never serve a
// build-time snapshot (this page has no dynamic API to auto-opt out with).
export const dynamic = "force-dynamic";

export default async function DashboardBarberPage() {
  const profile = await getSessionBarberProfile();
  if (!profile) notFound();

  const [appointments, availability] = await Promise.all([
    listAppointmentsByBarber(profile.id),
    listAvailability(profile.id),
  ]);

  return (
    <DashboardClient
      profile={profile}
      appointments={appointments}
      availability={availability}
    />
  );
}
