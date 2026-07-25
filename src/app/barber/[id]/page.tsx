import { notFound } from "next/navigation";
import { listAvailability } from "@/server/barber-availability";
import { getBarberProfile } from "@/server/barber-profiles";
import { BarberProfileClient } from "./_components/barber-profile-client";

export default async function ProfilBarberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [profile, availability] = await Promise.all([
    getBarberProfile(id),
    listAvailability(id),
  ]);

  if (!profile) notFound();

  return <BarberProfileClient profile={profile} availability={availability} />;
}
