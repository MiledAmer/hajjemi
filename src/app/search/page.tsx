import { countUnseenAppointmentsForClient } from "@/server/appointments";
import { searchBarberProfiles } from "@/server/barber-profiles";
import { getSessionUser } from "@/server/users";
import { Governorate } from "../../../generated/prisma";
import { SearchClient } from "./_components/search-client";

function parseGovernorate(value: string | undefined) {
  if (!value) return undefined;
  return Object.values(Governorate).includes(value as Governorate)
    ? (value as Governorate)
    : undefined;
}

export default async function TrouverUnCoiffeurPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; gov?: string }>;
}) {
  const params = await searchParams;
  const governorate = parseGovernorate(params.gov);
  const [barbers, user] = await Promise.all([
    searchBarberProfiles({ query: params.q, governorate }),
    getSessionUser(),
  ]);
  const unseenAppointments = user
    ? await countUnseenAppointmentsForClient(user.id)
    : 0;

  return (
    <SearchClient
      barbers={barbers}
      q={params.q ?? ""}
      governorate={governorate}
      unseenAppointments={unseenAppointments}
    />
  );
}
