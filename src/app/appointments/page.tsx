import { listAppointmentsByClient } from "@/server/appointments";
import { CURRENT_CLIENT_USER_ID } from "@/lib/current-client";
import { AppointmentsClient } from "./_components/appointments-client";

// Always live data — a barber's accept/decline must show up immediately.
export const dynamic = "force-dynamic";

export default async function AppointmentsPage() {
  const appointments = await listAppointmentsByClient(CURRENT_CLIENT_USER_ID);
  return <AppointmentsClient appointments={appointments} />;
}
