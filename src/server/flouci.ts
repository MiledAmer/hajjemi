// Flouci (Tunisian payment gateway) client. Two calls we use:
//   generate_payment → returns a hosted-checkout link + payment_id
//   verify_payment/{id} → confirms the payment actually succeeded
// Docs: https://developers.flouci.com/
import { env } from "@/env";

const API_BASE = "https://developers.flouci.com/api";

/// The paid tiers shown on /plans. amountMillimes is what Flouci charges
/// (1 DT = 1000 millimes); we also re-check it on verify so a tampered
/// success-link plan param can't claim a plan it didn't pay for.
export const PAID_PLANS = {
  PRO: { amountMillimes: 20_000, label: "Pro" },
  SALON: { amountMillimes: 55_000, label: "Salon" },
} as const;

export type PaidPlan = keyof typeof PAID_PLANS;

export async function createFlouciPayment(opts: {
  amountMillimes: number;
  successLink: string;
  failLink: string;
  trackingId: string;
}): Promise<{ link: string; paymentId: string }> {
  const res = await fetch(`${API_BASE}/generate_payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      app_token: env.FLOUCI_APP_TOKEN,
      app_secret: env.FLOUCI_APP_SECRET,
      amount: String(opts.amountMillimes),
      accept_card: "true",
      session_timeout_secs: 1200,
      success_link: opts.successLink,
      fail_link: opts.failLink,
      developer_tracking_id: opts.trackingId,
    }),
  });
  const data = (await res.json()) as {
    result?: { link?: string; payment_id?: string };
  };
  const link = data.result?.link;
  const paymentId = data.result?.payment_id;
  if (!res.ok || !link || !paymentId) {
    throw new Error("Flouci: échec de la création du paiement");
  }
  return { link, paymentId };
}

/// Returns the paid amount in millimes if the payment succeeded, else null.
export async function verifyFlouciPayment(
  paymentId: string,
): Promise<{ amountMillimes: number } | null> {
  const res = await fetch(`${API_BASE}/verify_payment/${paymentId}`, {
    headers: {
      apppublic: env.FLOUCI_APP_TOKEN ?? "",
      appsecret: env.FLOUCI_APP_SECRET ?? "",
    },
  });
  const data = (await res.json()) as {
    result?: { status?: string; amount?: number | string };
  };
  if (!res.ok || data.result?.status !== "SUCCESS") return null;
  return { amountMillimes: Number(data.result.amount) };
}
