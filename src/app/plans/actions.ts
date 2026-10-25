"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createFlouciPayment, PAID_PLANS } from "@/server/flouci";
import { getSessionBarberProfile } from "@/server/session";

const planSchema = z.enum(["PRO", "SALON"]);

/// Kicks off Flouci checkout for a paid plan and redirects the barber to the
/// hosted payment page. The chosen plan rides in the success-link query and
/// is re-validated against the paid amount on return (see success/route.ts).
/// Any failure sends the barber back to /plans with an error banner instead
/// of crashing the page.
export async function startSubscription(formData: FormData) {
  const plan = planSchema.safeParse(formData.get("plan"));
  if (!plan.success) redirect("/plans?payment=failed");

  const profile = await getSessionBarberProfile();
  if (!profile) redirect("/connexion?redirect_url=%2Fplans");

  let link: string;
  try {
    const h = await headers();
    const host = h.get("host");
    const proto = h.get("x-forwarded-proto") ?? "http";
    const base = `${proto}://${host}`;

    ({ link } = await createFlouciPayment({
      amountMillimes: PAID_PLANS[plan.data].amountMillimes,
      successLink: `${base}/plans/success?plan=${plan.data}`,
      failLink: `${base}/plans?payment=failed`,
      trackingId: `${profile.id}:${plan.data}:${Date.now()}`,
    }));
  } catch (e) {
    console.error("startSubscription error:", e);
    redirect("/plans?payment=failed");
  }

  // redirect() throws, so it stays outside the try/catch above.
  redirect(link);
}
