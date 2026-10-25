import { redirect } from "next/navigation";
import { getSessionBarberProfile } from "@/server/session";
import { QrClient } from "./_components/qr-client";

export const dynamic = "force-dynamic";

export default async function BarberQrPage() {
  const profile = await getSessionBarberProfile();
  if (!profile) redirect("/search");

  return <QrClient barberId={profile.id} businessName={profile.businessName} />;
}
