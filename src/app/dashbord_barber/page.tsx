import { redirect } from "next/navigation";
import { listAppointmentsByBarber, listAvailability } from "@/server/queries";
import { getSessionBarberProfile } from "@/server/session";
import { DashboardClient } from "./_components/dashboard-client";

// Always live data — accept/decline and profile edits must never serve a
// build-time snapshot (this page has no dynamic API to auto-opt out with).
export const dynamic = "force-dynamic";

export default async function DashboardBarberPage() {
  // Signed-out visitors are already bounced by the middleware; anyone here
  // without a barber profile is a client (or a half-created account).
  const profile = await getSessionBarberProfile();
  if (!profile) redirect("/search");

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
