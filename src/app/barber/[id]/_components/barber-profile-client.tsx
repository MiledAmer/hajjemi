"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ArrowLeft, ArrowRight, Check, Clock, MapPin, Plus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CURRENT_CLIENT_USER_ID } from "@/lib/current-client";
import { GOVERNORATE_LABELS } from "@/lib/governorate";
import { createAppointment } from "@/server/appointments";
import type {
  BarberAvailability,
  BarberProfile,
  User as DbUser,
} from "../../../../../generated/prisma";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Trouver un coiffeur", href: "/search" },
  { label: "Espace Barber", href: "/plans" },
];

// ponytail: no Service model in the schema yet — the bookable service list
// stays client-only mock data until Catalog is modeled and gets its own CRUD.
// Price/duration are parsed below to build the real Appointment though.
type Service = {
  name: string;
  description: string;
  duration: string;
  price: string;
};

const services: Service[] = [
  {
    name: "Coupe + Barbe (VIP)",
    description:
      "Dégradé à blanc, taille de barbe avec serviette chaude, contours au rasoir, soin visage.",
    duration: "45 min",
    price: "30 DT",
  },
  {
    name: "Dégradé Américain",
    description:
      "Coupe aux ciseaux ou tondeuse, finition parfaite, coiffage avec produit premium.",
    duration: "30 min",
    price: "15 DT",
  },
  {
    name: "Taille de Barbe Classique",
    description:
      "Taille à la tondeuse, contours propres, application d'huile nourrissante.",
    duration: "15 min",
    price: "10 DT",
  },
  {
    name: "Coloration / Mèches",
    description:
      "Coloration complète ou mèches personnalisées. Produit professionnel respectueux du cuir chevelu.",
    duration: "60 min",
    price: "45 DT",
  },
];

const serviceCategories = ["Populaire", "Coupes", "Barbe", "Soins"];

function parsePriceMillimes(price: string) {
  return Math.round(parseFloat(price) * 1000);
}

function parseDurationMinutes(duration: string) {
  return parseInt(duration, 10);
}

function formatMillimes(millimes: number) {
  return `${(millimes / 1000).toFixed(3)} DT`;
}

function nowForInput() {
  const d = new Date(Date.now() + 60 * 60 * 1000);
  d.setMinutes(0, 0, 0);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const DAY_INDEX = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
] as const;

function isOpenNow(rows: BarberAvailability[]) {
  const now = new Date();
  const today = DAY_INDEX[now.getDay()];
  const minutes = now.getHours() * 60 + now.getMinutes();
  return rows.some(
    (r) =>
      r.dayOfWeek === today &&
      minutes >= r.startMinute &&
      minutes < r.endMinute,
  );
}

function ServiceItem({
  service,
  selected,
  onToggle,
}: {
  service: Service;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <Card className="group border-surface-variant p-stack-md hover:bg-surface-container-high relative flex-row items-center justify-between gap-0 rounded-xl border bg-[#1C1C1E] transition-colors">
      {selected && (
        <div className="bg-primary absolute top-0 bottom-0 left-0 w-1" />
      )}
      <div className={`flex-1 pr-4 ${selected ? "pl-2" : ""}`}>
        <h3 className="font-headline-md text-on-surface mb-1 text-[18px]">
          {service.name}
        </h3>
        <p className="font-body-md text-label-sm text-on-surface-variant line-clamp-2">
          {service.description}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Clock className="text-primary size-3.5" />
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {service.duration}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <span className="font-headline-md text-primary text-[20px]">
          {service.price}
        </span>
        {selected ? (
          <Button
            aria-label="Retirer service"
            size="icon"
            onClick={onToggle}
            className="bg-primary text-background size-8 rounded-full"
          >
            <Check className="size-4" />
          </Button>
        ) : (
          <Button
            aria-label="Ajouter service"
            variant="secondary"
            size="icon"
            onClick={onToggle}
            className="bg-surface-variant text-on-surface group-hover:bg-primary group-hover:text-background size-8 rounded-full"
          >
            <Plus className="size-4" />
          </Button>
        )}
      </div>
    </Card>
  );
}

export function BarberProfileClient({
  profile,
  availability,
}: {
  profile: BarberProfile & { user: DbUser };
  availability: BarberAvailability[];
}) {
  const router = useRouter();
  const open = isOpenNow(availability);
  const heroImage = profile.coverImageUrl ?? profile.avatarUrl;

  const [selectedNames, setSelectedNames] = useState<Set<string>>(
    () => new Set([services[1]!.name]),
  );
  const [startAtInput, setStartAtInput] = useState(nowForInput);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [bookingResult, setBookingResult] = useState<
    { status: "success"; startAt: string } | { status: "error" } | null
  >(null);

  const selectedServices = services.filter((s) => selectedNames.has(s.name));
  const totalPriceMillimes = selectedServices.reduce(
    (sum, s) => sum + parsePriceMillimes(s.price),
    0,
  );
  const totalDurationMinutes = selectedServices.reduce(
    (sum, s) => sum + parseDurationMinutes(s.duration),
    0,
  );

  function toggleService(name: string) {
    setSelectedNames((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  function requestBooking() {
    if (selectedServices.length === 0 || !startAtInput) return;
    setConfirmOpen(true);
  }

  function bookAppointment() {
    setConfirmOpen(false);
    const startAt = new Date(startAtInput);
    const endAt = new Date(startAt.getTime() + totalDurationMinutes * 60_000);
    startTransition(async () => {
      try {
        await createAppointment({
          clientId: CURRENT_CLIENT_USER_ID,
          barberId: profile.id,
          startAt,
          endAt,
          totalPriceMillimes,
          status: "PENDING",
        });
        setBookingResult({ status: "success", startAt: startAtInput });
      } catch {
        setBookingResult({ status: "error" });
      }
    });
  }

  return (
    <div className="bg-background text-on-background flex min-h-screen flex-col antialiased">
      {/* Top Navigation (Web View - Hidden on Mobile to prioritize Hero) */}
      <header className="bg-surface px-container-margin sticky top-0 z-50 mx-auto hidden h-16 w-full max-w-7xl items-center justify-between shadow-sm md:flex">
        <div className="flex items-center gap-4">
          <Button
            aria-label="Retour"
            variant="ghost"
            size="icon"
            className="text-on-surface-variant hover:text-primary"
            onClick={() => router.back()}
          >
            <ArrowLeft className="size-5" />
          </Button>
          <span className="font-headline-lg text-headline-lg text-primary font-bold tracking-tighter">
            HAJJEM
          </span>
        </div>
        <div className="gap-stack-lg flex items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Avatar className="bg-surface-container-high focus-visible:ring-primary size-10 focus-visible:ring-2">
          <AvatarImage
            alt={`Portrait de ${profile.user.name}`}
            src={profile.avatarUrl ?? undefined}
          />
          <AvatarFallback>{profile.user.name[0]}</AvatarFallback>
        </Avatar>
      </header>

      {/* Main Content */}
      <main className="md:gap-gutter md:pt-stack-lg relative mx-auto w-full max-w-md flex-1 md:grid md:max-w-4xl md:grid-cols-12">
        {/* Hero Section & Barber Info (Left Column on Desktop) */}
        <section className="md:sticky md:top-24 md:col-span-5 md:h-fit">
          {/* Mobile Back Button Overlay */}
          <div className="glass-panel absolute top-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full md:hidden">
            <Button
              aria-label="Retour"
              variant="ghost"
              size="icon"
              className="text-on-surface"
              onClick={() => router.back()}
            >
              <ArrowLeft className="size-5" />
            </Button>
          </div>

          {/* Hero Image */}
          <div className="shadow-ambient relative h-72 w-full overflow-hidden md:h-96 md:rounded-xl">
            {heroImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                alt={profile.businessName}
                className="absolute inset-0 h-full w-full object-cover"
                src={heroImage}
              />
            ) : (
              <div className="bg-surface-container-low absolute inset-0 flex items-center justify-center">
                <span className="font-headline-lg text-primary text-4xl">
                  {profile.businessName[0]}
                </span>
              </div>
            )}
            {/* Gradient Overlay for Text Readability on Mobile */}
            <div className="from-background via-background/40 absolute inset-0 bg-linear-to-t to-transparent md:hidden" />
            {/* Barber Name & Specialty Overlay (Mobile Only) */}
            <div className="p-container-margin absolute bottom-0 left-0 w-full md:hidden">
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile mb-stack-sm text-on-surface drop-shadow-md">
                {profile.businessName}
              </h1>
              <p className="font-body-md text-body-md text-primary drop-shadow-md">
                {profile.user.name}
              </p>
            </div>
          </div>

          {/* Barber Info (Desktop Only - Extracted from Image) */}
          <div className="mt-stack-md px-container-margin hidden md:block md:px-0">
            <h1 className="font-headline-lg text-headline-lg mb-stack-sm text-on-surface">
              {profile.businessName}
            </h1>
            <p className="font-body-md text-body-md mb-stack-lg text-primary">
              {profile.user.name}
            </p>
            {/* Location & Open Status Badges */}
            <div className="mb-stack-lg gap-stack-md flex">
              <Badge
                variant="outline"
                className="border-surface-variant bg-surface-container gap-2 rounded-full px-3 py-1"
              >
                <Clock
                  className={`size-4 ${open ? "text-primary" : "text-destructive"}`}
                />
                <span className="font-label-sm text-label-sm text-on-surface">
                  {open ? "Ouvert" : "Fermé"}
                </span>
              </Badge>
              <Badge
                variant="outline"
                className="border-surface-variant bg-surface-container gap-2 rounded-full px-3 py-1"
              >
                <MapPin className="text-on-surface-variant size-4" />
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {profile.address
                    ? `${profile.address}, ${GOVERNORATE_LABELS[profile.governorate]}`
                    : GOVERNORATE_LABELS[profile.governorate]}
                </span>
              </Badge>
            </div>
            {/* About Barber */}
            {profile.bio && (
              <p className="font-body-md text-body-md mb-stack-lg text-on-surface-variant leading-relaxed">
                {profile.bio}
              </p>
            )}
          </div>

          {/* Mobile Only Info block below image */}
          <div className="fade-in-up px-container-margin pt-stack-md md:hidden">
            <div className="mb-stack-md gap-stack-sm flex flex-wrap">
              <Badge
                variant="outline"
                className="border-surface-variant bg-surface-container gap-1 rounded-full px-3 py-1"
              >
                <MapPin className="text-on-surface-variant size-3.5" />
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {GOVERNORATE_LABELS[profile.governorate]}
                </span>
              </Badge>
              <Badge
                variant="outline"
                className="border-surface-variant bg-surface-container gap-1 rounded-full px-3 py-1"
              >
                <Clock
                  className={`size-3.5 ${open ? "text-primary" : "text-destructive"}`}
                />
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {open ? "Ouv." : "Fermé"}
                </span>
              </Badge>
            </div>
            {profile.bio && (
              <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md leading-relaxed">
                {profile.bio}
              </p>
            )}
          </div>
        </section>

        {/* Services Section (Right Column on Desktop) */}
        <section className="fade-in-up mt-stack-lg px-container-margin pb-28 delay-100 md:col-span-7 md:mt-0 md:px-0 md:pb-0">
          <div className="mb-stack-md flex items-center justify-between">
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Services
            </h2>
          </div>

          {/* Service Categories (Chips) */}
          <div className="hide-scrollbar mb-stack-md gap-stack-sm pb-stack-sm flex overflow-x-auto">
            {serviceCategories.map((category, index) => (
              <Button
                key={category}
                variant={index === 0 ? "default" : "outline"}
                className={
                  index === 0
                    ? "font-label-md text-label-md bg-primary-container text-on-primary-container h-auto rounded-full px-4 py-2 whitespace-nowrap"
                    : "font-label-md text-label-md border-surface-variant bg-surface-container text-on-surface-variant hover:bg-surface-variant h-auto rounded-full px-4 py-2 whitespace-nowrap"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Service List */}
          <div className="gap-stack-sm flex flex-col">
            {services.map((service) => (
              <ServiceItem
                key={service.name}
                service={service}
                selected={selectedNames.has(service.name)}
                onToggle={() => toggleService(service.name)}
              />
            ))}
          </div>

          <div className="mt-stack-lg flex flex-col gap-2">
            <label
              htmlFor="appointment-start"
              className="font-label-md text-label-md text-on-surface-variant"
            >
              Date et heure du rendez-vous
            </label>
            <Input
              id="appointment-start"
              type="datetime-local"
              value={startAtInput}
              min={nowForInput()}
              onChange={(event) => setStartAtInput(event.target.value)}
            />
          </div>

          {bookingResult?.status === "error" && (
            <p className="text-destructive font-body-md mt-stack-md">
              Échec de la réservation. Réessayez.
            </p>
          )}

        </section>
      </main>

      {/* Floating Action Button Area (Mobile Book Now) */}
      <div className="glass-panel pb-safe px-container-margin py-stack-md fixed bottom-0 left-0 z-40 w-full shadow-[0_-8px_16px_rgba(0,0,0,0.4)] md:hidden">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant">
            {selectedServices.length} service
            {selectedServices.length > 1 ? "s" : ""} sélectionné
            {selectedServices.length > 1 ? "s" : ""}
          </span>
          <span className="font-headline-md text-primary text-[20px]">
            {formatMillimes(totalPriceMillimes)}
          </span>
        </div>
        <Button
          disabled={selectedServices.length === 0 || isPending}
          onClick={requestBooking}
          className="shadow-ambient bg-primary font-headline-md text-background h-auto w-full gap-2 rounded-lg py-3 text-[18px]"
        >
          {isPending ? "Réservation..." : "Réserver maintenant"}
          <ArrowRight className="size-5" />
        </Button>
      </div>

      {/* Desktop Floating Action Area (Hidden on mobile) */}
      <div className="fixed right-8 bottom-8 z-50 hidden md:block">
        <Card className="fade-in-up shadow-ambient border-surface-variant bg-surface-container-high w-80 gap-0 rounded-xl border p-4 delay-200">
          <h3 className="font-headline-md border-surface-variant text-on-surface mb-2 border-b pb-2 text-[18px]">
            Votre Réservation
          </h3>
          {selectedServices.map((s) => (
            <div key={s.name} className="mb-1 flex items-center justify-between">
              <span className="font-body-md text-label-sm text-on-surface-variant">
                {s.name}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface">
                {s.price}
              </span>
            </div>
          ))}
          <div className="border-surface-variant mt-3 flex items-center justify-between border-t pt-2">
            <span className="font-headline-md text-on-surface text-[16px]">
              Total
            </span>
            <span className="font-headline-md text-primary text-[20px]">
              {formatMillimes(totalPriceMillimes)}
            </span>
          </div>
          <Button
            disabled={selectedServices.length === 0 || isPending}
            onClick={requestBooking}
            className="font-label-md text-label-md bg-primary text-background mt-4 h-auto w-full rounded-lg py-3 shadow-sm hover:opacity-90"
          >
            {isPending ? "Réservation..." : "Réserver maintenant"}
          </Button>
        </Card>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la réservation</DialogTitle>
            <DialogDescription>
              Vérifiez les détails avant d&apos;envoyer la demande au
              barbier.
            </DialogDescription>
          </DialogHeader>
          <div className="gap-stack-sm flex flex-col">
            {selectedServices.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <span className="font-body-md text-label-sm text-on-surface-variant">
                  {s.name}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface">
                  {s.price}
                </span>
              </div>
            ))}
            <div className="border-surface-variant mt-2 flex items-center justify-between border-t pt-2">
              <span className="font-body-md text-label-sm text-on-surface-variant">
                Date et heure
              </span>
              <span className="font-label-sm text-label-sm text-on-surface">
                {startAtInput
                  ? new Date(startAtInput).toLocaleString("fr-FR")
                  : ""}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-body-md text-label-sm text-on-surface-variant">
                Total
              </span>
              <span className="font-headline-md text-primary text-[18px]">
                {formatMillimes(totalPriceMillimes)}
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              disabled={isPending}
            >
              Annuler
            </Button>
            <Button
              onClick={bookAppointment}
              disabled={isPending}
              className="bg-primary text-background"
            >
              {isPending ? "Réservation..." : "Confirmer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={bookingResult?.status === "success"}
        onOpenChange={(o) => !o && setBookingResult(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Demande envoyée au barbier</DialogTitle>
            <DialogDescription>
              {bookingResult?.status === "success" &&
                `Rendez-vous demandé pour le ${new Date(bookingResult.startAt).toLocaleString("fr-FR")}. En attente de confirmation du barbier.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setBookingResult(null)}
              className="bg-primary text-background"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
