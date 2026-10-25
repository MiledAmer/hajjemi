"use server";

import { uploadObject } from "@/server/r2";
import { getSessionBarberProfile } from "@/server/session";

const MAX_BYTES = 5 * 1024 * 1024;

// file.type is client-supplied, so the type is decided from the file's magic
// bytes instead.
function sniffImage(b: Uint8Array) {
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) {
    return { type: "image/jpeg", ext: "jpg" };
  }
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) {
    return { type: "image/png", ext: "png" };
  }
  // "RIFF" .... "WEBP"
  if (
    b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 &&
    b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50
  ) {
    return { type: "image/webp", ext: "webp" };
  }
  return null;
}

/// Uploads the signed-in barber's avatar. The destination folder comes from
/// the session, never from the form.
export async function uploadImage(
  formData: FormData,
): Promise<{ url: string; error?: undefined } | { error: string; url?: undefined }> {
  const profile = await getSessionBarberProfile();
  if (!profile) return { error: "Non connecté." };

  const file = formData.get("file");
  if (!(file instanceof File)) return { error: "Aucun fichier reçu." };
  if (file.size > MAX_BYTES) return { error: "Image trop lourde (5 Mo maximum)." };

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const kind = sniffImage(buffer);
    if (!kind) return { error: "Format non supporté (JPEG, PNG ou WebP)." };
    const key = `avatars/${profile.id}/${crypto.randomUUID()}.${kind.ext}`;
    return { url: await uploadObject(key, buffer, kind.type) };
  } catch (e) {
    console.error("uploadImage error:", e);
    return { error: "Échec de l'envoi de la photo. Réessayez." };
  }
}
