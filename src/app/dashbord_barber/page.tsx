import { notFound } from "next/navigation";
import { listAppointmentsByBarber } from "@/server/appointments";
import { listAvailability } from "@/server/barber-availability";
import { getBarberProfile } from "@/server/barber-profiles";
import { CURRENT_BARBER_PROFILE_ID } from "@/lib/current-barber";
import { DashboardClient } from "./_components/dashboard-client";

// Always live data — accept/decline and profile edits must never serve a
// build-time snapshot (this page has no dynamic API to auto-opt out with).
export const dynamic = "force-dynamic";

export default async function DashboardBarberPage() {
  const [profile, appointments, availability] = await Promise.all([
    getBarberProfile(CURRENT_BARBER_PROFILE_ID),
    listAppointmentsByBarber(CURRENT_BARBER_PROFILE_ID),
    listAvailability(CURRENT_BARBER_PROFILE_ID),
  ]);

  if (!profile) notFound();

  return (
    <DashboardClient
      profile={profile}
      appointments={appointments}
      availability={availability}
    />
  );
}
