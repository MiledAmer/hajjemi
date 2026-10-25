import { redirect } from "next/navigation";
import { getSessionUser } from "@/server/session";
import { AccountClient } from "./_components/account-client";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await getSessionUser();
  if (!user) redirect("/connexion?redirect_url=%2Faccount");
  if (user.role === "BARBER") redirect("/dashbord_barber");
  return <AccountClient user={user} />;
}
