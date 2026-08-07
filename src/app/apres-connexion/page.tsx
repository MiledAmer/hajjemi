import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

// Post-login dispatcher: reads the role from Clerk public metadata
// (set in the Clerk dashboard: { "role": "barbier" }) and routes accordingly.
export default async function ApresConnexionPage() {
  const user = await currentUser();
  if (!user) redirect("/connexion");
  redirect(user.publicMetadata.role === "barbier" ? "/dashbord_barber" : "/search");
}
