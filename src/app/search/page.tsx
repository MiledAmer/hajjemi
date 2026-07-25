import { searchBarberProfiles } from "@/server/barber-profiles";
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
  const barbers = await searchBarberProfiles({
    query: params.q,
    governorate,
  });

  return (
    <SearchClient barbers={barbers} q={params.q ?? ""} governorate={governorate} />
  );
}
