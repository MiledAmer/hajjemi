import { auth } from "@clerk/nextjs/server";
import { db } from "@/server/db";

// Plain server module on purpose (no "use server"): these helpers must never
// be callable from the browser as server actions.

// DB row of the signed-in Clerk user (null when signed out or not yet synced).
export async function getSessionUser() {
  const { userId } = await auth();
  if (!userId) return null;
  return db.user.findUnique({ where: { clerkId: userId } });
}

// BarberProfile of the signed-in Clerk user (null if not a barber).
export async function getSessionBarberProfile() {
  const { userId } = await auth();
  if (!userId) return null;
  return db.barberProfile.findFirst({
    where: { user: { clerkId: userId } },
    include: { user: true },
  });
}
