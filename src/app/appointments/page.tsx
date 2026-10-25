import { redirect } from "next/navigation";
import { listAppointmentsByClient } from "@/server/queries";
import { getSessionUser } from "@/server/session";
import { AppointmentsClient } from "./_components/appointments-client";

// Always live data — a barber's accept/decline must show up immediately.
export const dynamic = "force-dynamic";

export default async function AppointmentsPage() {
  const user = await getSessionUser();
  if (!user) redirect("/connexion?redirect_url=%2Fappointments");
  if (user.role === "BARBER") redirect("/dashbord_barber");
  const appointments = await listAppointmentsByClient(user.id);
  return <AppointmentsClient appointments={appointments} />;
}
