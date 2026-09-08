// One-off: mirror each existing barber's planType into Clerk publicMetadata.plan.
// Run once after deploying plan-in-Clerk. Safe to re-run (idempotent).
//   node scripts/backfill-clerk-plan.mjs
import "dotenv/config";
import { createClerkClient } from "@clerk/backend";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/index.js";

const db = new PrismaClient({
  adapter: new PrismaPg(process.env.DIRECT_URL ?? process.env.DATABASE_URL),
});
const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

const barbers = await db.barberProfile.findMany({
  select: { planType: true, user: { select: { clerkId: true } } },
});

let ok = 0,
  skipped = 0,
  failed = 0;
for (const b of barbers) {
  if (!b.user.clerkId) {
    skipped++;
    continue;
  }
  try {
    await clerk.users.updateUserMetadata(b.user.clerkId, {
      publicMetadata: { plan: b.planType },
    });
    ok++;
  } catch (e) {
    failed++;
    console.error(`  ${b.user.clerkId}:`, e.message ?? e);
  }
}

console.log(`Backfilled ${ok}, skipped ${skipped} (no clerkId), failed ${failed}.`);
await db.$disconnect();
