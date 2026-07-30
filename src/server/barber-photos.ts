"use server";

import { db } from "@/server/db";
import { deleteObject, keyFromUrl } from "@/server/r2";

export async function listPhotosByBarber(barberId: string) {
  return db.barberPhoto.findMany({
    where: { barberId },
    orderBy: { createdAt: "asc" },
  });
}

export async function addPhoto(barberId: string, url: string) {
  return db.barberPhoto.create({ data: { barberId, url } });
}

export async function deletePhoto(id: string) {
  const photo = await db.barberPhoto.delete({ where: { id } });
  await deleteObject(keyFromUrl(photo.url));
  return photo;
}
