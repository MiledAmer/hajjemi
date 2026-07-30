-- CreateTable
CREATE TABLE "barber_photos" (
    "id" TEXT NOT NULL,
    "barberId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "barber_photos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "barber_photos_barberId_idx" ON "barber_photos"("barberId");

-- AddForeignKey
ALTER TABLE "barber_photos" ADD CONSTRAINT "barber_photos_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "barber_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
