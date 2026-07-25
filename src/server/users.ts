"use server";

import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { db } from "@/server/db";
import { Role } from "../../generated/prisma";

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export async function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return (
    candidate.length === expected.length &&
    timingSafeEqual(candidate, expected)
  );
}

const createUserSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1).optional(),
  password: z.string().min(8),
  role: z.nativeEnum(Role).default(Role.CLIENT),
  avatarUrl: z.string().url().optional(),
});

const updateUserSchema = createUserSchema
  .omit({ password: true })
  .partial()
  .extend({ password: z.string().min(8).optional() });

export async function createUser(input: z.infer<typeof createUserSchema>) {
  const data = createUserSchema.parse(input);
  return db.user.create({
    data: {
      name: data.name,
      phone: data.phone,
      role: data.role,
      avatarUrl: data.avatarUrl,
      passwordHash: hashPassword(data.password),
    },
  });
}

export async function getUser(id: string) {
  return db.user.findUnique({ where: { id } });
}

export async function listUsers() {
  return db.user.findMany({ orderBy: { createdAt: "desc" } });
}

export async function updateUser(
  id: string,
  input: z.infer<typeof updateUserSchema>,
) {
  const data = updateUserSchema.parse(input);
  const { password, ...rest } = data;
  return db.user.update({
    where: { id },
    data: {
      ...rest,
      ...(password ? { passwordHash: hashPassword(password) } : {}),
    },
  });
}

export async function deleteUser(id: string) {
  return db.user.delete({ where: { id } });
}
