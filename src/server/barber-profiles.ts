"use server";

import { z } from "zod";
import { env } from "@/env";
import { salonNameSchema } from "@/lib/name";
import { db } from "@/server/db";
import { deleteObject, keyFromUrl } from "@/server/r2";
import { getSessionBarberProfile } from "@/server/session";

const updateBarberProfileSchema = z.object({
  businessName: salonNameSchema,
  bio: z.string().trim().max(500, "500 caractères maximum."),
  address: z.string().trim().max(200, "200 caractères maximum."),
  avatarUrl: z.string().url().max(500).nullable(),
});

/// Updates the signed-in barber's own profile (never someone else's, never
/// the plan — that only changes through a verified payment).
export async function updateBarberProfile(
  input: z.infer<typeof updateBarberProfileSchema>,
): Promise<{ error: string | null }> {
  const parsed = updateBarberProfileSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }
  const data = parsed.data;

  const profile = await getSessionBarberProfile();
  if (!profile) return { error: "Non connecté." };

  // The avatar must be one of this barber's own uploads (or unchanged).
  if (
    data.avatarUrl &&
    data.avatarUrl !== profile.avatarUrl &&
    !data.avatarUrl.startsWith(`${env.R2_PUBLIC_URL}/avatars/${profile.id}/`)
  ) {
    return { error: "Photo invalide." };
  }

  try {
    await db.barberProfile.update({
      where: { id: profile.id },
      data: {
        businessName: data.businessName,
        bio: data.bio || null,
        address: data.address || null,
        avatarUrl: data.avatarUrl,
      },
    });
  } catch (e) {
    console.error("updateBarberProfile error:", e);
    return { error: "Échec de l'enregistrement du profil." };
  }

  const old = profile.avatarUrl;
  if (old && old !== data.avatarUrl && old.startsWith(`${env.R2_PUBLIC_URL}/`)) {
    // Best-effort: the DB is already the source of truth for the current
    // avatar, so a failed delete just leaves an orphaned R2 object.
    await deleteObject(keyFromUrl(old)).catch(() => undefined);
  }
  return { error: null };
}
