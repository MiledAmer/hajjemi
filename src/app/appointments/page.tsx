import { listAppointmentsByClient } from "@/server/appointments";
import { getSessionUser } from "@/server/users";
import { AppointmentsClient } from "./_components/appointments-client";

// Always live data — a barber's accept/decline must show up immediately.
export const dynamic = "force-dynamic";

export default async function AppointmentsPage() {
  const user = await getSessionUser();
  const appointments = user ? await listAppointmentsByClient(user.id) : [];
  return <AppointmentsClient appointments={appointments} />;
}
