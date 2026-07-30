"use server";

import { z } from "zod";
import { uploadObject } from "@/server/r2";

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const uploadInputSchema = z.object({
  barberId: z.string().min(1),
  kind: z.literal("avatar"),
});

export async function uploadImage(formData: FormData) {
  const { barberId } = uploadInputSchema.parse({
    barberId: formData.get("barberId"),
    kind: formData.get("kind"),
  });
  const file = formData.get("file");
  if (!(file instanceof File)) throw new Error("Missing file");
  if (!ALLOWED_TYPES.includes(file.type))
    throw new Error("Unsupported image type");
  if (file.size > MAX_BYTES) throw new Error("Image too large (max 5MB)");

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const key = `avatars/${barberId}/${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  return { url: await uploadObject(key, buffer, file.type) };
}
