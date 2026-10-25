import { clerkClient } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { type PlanType, SubscriptionStatus } from "../../generated/prisma";

// Plain server module (no "use server"): activating a plan must only happen
// from the verified payment route, never from a browser-callable action.

/// Records a paid subscription after Flouci confirms payment: one ACTIVE
/// 30-day row plus the denormalized planType mirror on BarberProfile. Any
/// previously ACTIVE subscription is marked EXPIRED so only one is live.
export async function activateSubscription(barberId: string, plan: PlanType) {
  const endsAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await db.$transaction([
    db.subscription.updateMany({
      where: { barberId, status: SubscriptionStatus.ACTIVE },
      data: { status: SubscriptionStatus.EXPIRED, endsAt: new Date() },
    }),
    db.subscription.create({
      data: { barberId, planType: plan, status: SubscriptionStatus.ACTIVE, endsAt },
    }),
    db.barberProfile.update({
      where: { id: barberId },
      data: { planType: plan },
    }),
  ]);

  // Mirror onto the barber's Clerk publicMetadata so plan is readable from
  // the session token (like role). DB stays source of truth; best-effort.
  const profile = await db.barberProfile.findUnique({
    where: { id: barberId },
    select: { user: { select: { clerkId: true } } },
  });
  if (profile?.user.clerkId) {
    const clerk = await clerkClient();
    await clerk.users
      .updateUserMetadata(profile.user.clerkId, { publicMetadata: { plan } })
      .catch((e) => console.error("activateSubscription clerk mirror:", e));
  }
}
