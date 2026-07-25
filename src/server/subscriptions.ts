"use server";

import { z } from "zod";
import { db } from "@/server/db";
import { PlanType, SubscriptionStatus } from "../../generated/prisma";

const createSubscriptionSchema = z.object({
  barberId: z.string().min(1),
  planType: z.nativeEnum(PlanType),
  status: z.nativeEnum(SubscriptionStatus).default(SubscriptionStatus.ACTIVE),
  startedAt: z.coerce.date().optional(),
  endsAt: z.coerce.date().optional(),
});

const updateSubscriptionSchema = z.object({
  planType: z.nativeEnum(PlanType).optional(),
  status: z.nativeEnum(SubscriptionStatus).optional(),
  endsAt: z.coerce.date().optional(),
});

export async function createSubscription(
  input: z.infer<typeof createSubscriptionSchema>,
) {
  const data = createSubscriptionSchema.parse(input);
  return db.subscription.create({ data });
}

export async function getSubscription(id: string) {
  return db.subscription.findUnique({ where: { id } });
}

export async function listSubscriptions(barberId: string) {
  return db.subscription.findMany({
    where: { barberId },
    orderBy: { startedAt: "desc" },
  });
}

export async function updateSubscription(
  id: string,
  input: z.infer<typeof updateSubscriptionSchema>,
) {
  const data = updateSubscriptionSchema.parse(input);
  return db.subscription.update({ where: { id }, data });
}

export async function deleteSubscription(id: string) {
  return db.subscription.delete({ where: { id } });
}
