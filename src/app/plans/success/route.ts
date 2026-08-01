import { NextResponse, type NextRequest } from "next/server";
import { CURRENT_BARBER_PROFILE_ID } from "@/lib/current-barber";
import { PAID_PLANS, verifyFlouciPayment, type PaidPlan } from "@/server/flouci";
import { activateSubscription } from "@/server/subscriptions";

// Flouci redirects here after checkout with ?payment_id=... ; we appended the
// plan ourselves. Verify the payment really succeeded AND that its amount
// matches the claimed plan before granting it, then bounce to the dashboard.
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const plan = searchParams.get("plan") as PaidPlan | null;
  const paymentId = searchParams.get("payment_id");

  const failed = NextResponse.redirect(new URL("/plans?payment=failed", req.url));
  if (!paymentId || !plan || !(plan in PAID_PLANS)) return failed;

  const result = await verifyFlouciPayment(paymentId);
  if (result?.amountMillimes !== PAID_PLANS[plan].amountMillimes) {
    return failed;
  }

  await activateSubscription(CURRENT_BARBER_PROFILE_ID, plan);
  return NextResponse.redirect(new URL("/dashbord_barber?subscribed=1", req.url));
}
