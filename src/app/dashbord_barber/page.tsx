import { notFound } from "next/navigation";
import { listAppointmentsByBarber } from "@/server/appointments";
import { getBarberProfile } from "@/server/barber-profiles";
import { CURRENT_BARBER_PROFILE_ID } from "@/lib/current-barber";
import { DashboardClient } from "./_components/dashboard-client";

export default async function DashboardBarberPage() {
  const [profile, appointments] = await Promise.all([
    getBarberProfile(CURRENT_BARBER_PROFILE_ID),
    listAppointmentsByBarber(CURRENT_BARBER_PROFILE_ID),
  ]);

  if (!profile) notFound();

  return <DashboardClient profile={profile} appointments={appointments} />;
}
