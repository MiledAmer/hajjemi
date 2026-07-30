import { notFound } from "next/navigation";
import { CURRENT_CLIENT_USER_ID } from "@/lib/current-client";
import { getUser } from "@/server/users";
import { AccountClient } from "./_components/account-client";

export default async function AccountPage() {
  const user = await getUser(CURRENT_CLIENT_USER_ID);
  if (!user) notFound();
  return <AccountClient user={user} />;
}
