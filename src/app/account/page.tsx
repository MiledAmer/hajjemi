import { notFound } from "next/navigation";
import { getSessionUser } from "@/server/users";
import { AccountClient } from "./_components/account-client";

export default async function AccountPage() {
  const user = await getSessionUser();
  if (!user) notFound();
  return <AccountClient user={user} />;
}
