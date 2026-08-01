"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { CURRENT_BARBER_PROFILE_ID } from "@/lib/current-barber";
import { createFlouciPayment, PAID_PLANS } from "@/server/flouci";

const planSchema = z.enum(["PRO", "SALON"]);

/// Kicks off Flouci checkout for a paid plan and redirects the barber to the
/// hosted payment page. The chosen plan rides in the success-link query and
/// is re-validated against the paid amount on return (see success/route.ts).
export async function startSubscription(formData: FormData) {
  const plan = planSchema.parse(formData.get("plan"));

  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const base = `${proto}://${host}`;

  const { link } = await createFlouciPayment({
    amountMillimes: PAID_PLANS[plan].amountMillimes,
    successLink: `${base}/plans/success?plan=${plan}`,
    failLink: `${base}/plans?payment=failed`,
    trackingId: `${CURRENT_BARBER_PROFILE_ID}:${plan}:${Date.now()}`,
  });

  redirect(link);
}
