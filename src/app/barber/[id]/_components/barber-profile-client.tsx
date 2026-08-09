"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useAuth } from "@clerk/nextjs";
import {
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Home,
  MapPin,
  Search,
  User,
} from "lucide-react";

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
import { CURRENT_CLIENT_USER_ID } from "@/lib/current-client";
import { GOVERNORATE_LABELS } from "@/lib/governorate";
import {
  barberProfile as content,
  search as searchContent,
  useLang,
} from "@/lib/tounsi";
import { cn } from "@/lib/utils";
import { createAppointment } from "@/server/appointments";
import type {
  Appointment,
  BarberAvailability,
  BarberProfile,
  User as DbUser,
} from "../../../../../generated/prisma";

// ponytail: no Service catalog in the schema yet, so a booking is just a
// day/hour with a fixed placeholder duration — price is set by the barber
// out of band once the appointment is confirmed.
const APPOINTMENT_DURATION_MINUTES = 30;

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

function isDayOff(rows: BarberAvailability[], date: Date) {
  const day = DAY_INDEX[date.getDay()];
  return !rows.some((r) => r.dayOfWeek === day);
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const SLOT_STEP_MINUTES = 30;

function formatSlotTime(minutes: number) {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

/// Available hour slots for a given day: the barber's opening ranges for
/// that weekday, minus anything already booked (active appointments) and
/// minus slots that have already passed if the day is today.
function getAvailableSlots(
  availability: BarberAvailability[],
  appointments: Pick<Appointment, "startAt" | "endAt" | "status">[],
  date: Date,
  durationMinutes: number,
) {
  const day = DAY_INDEX[date.getDay()];
  const dayRanges = availability.filter((r) => r.dayOfWeek === day);
  const duration = Math.max(durationMinutes, SLOT_STEP_MINUTES);
  const now = Date.now();
  const busy = appointments.filter(
    (a) =>
      a.status !== "CANCELLED" &&
      a.status !== "NO_SHOW" &&
      isSameDay(new Date(a.startAt), date),
  );

  const slots: number[] = [];
  for (const range of dayRanges) {
    for (
      let start = range.startMinute;
      start + duration <= range.endMinute;
      start += SLOT_STEP_MINUTES
    ) {
      const slotStart = new Date(date);
      slotStart.setHours(Math.floor(start / 60), start % 60, 0, 0);
      if (slotStart.getTime() < now) continue;
      const slotEndMs = slotStart.getTime() + duration * 60_000;
      const overlaps = busy.some((a) => {
        const busyStart = new Date(a.startAt).getTime();
        const busyEnd = new Date(a.endAt).getTime();
        return slotStart.getTime() < busyEnd && slotEndMs > busyStart;
      });
      if (!overlaps) slots.push(start);
    }
  }
  return slots;
}

function withDate(iso: string, date: Date) {
  const time = iso.slice(11, 16) || "09:00";
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${time}`;
}

function withTime(iso: string, time: string) {
  return `${iso.slice(0, 10)}T${time}`;
}

const WEEKDAY_LABELS = ["D", "L", "M", "M", "J", "V", "S"];

function DatePicker({
  availability,
  selected,
  onSelect,
  prevMonthAria,
  nextMonthAria,
}: {
  availability: BarberAvailability[];
  selected: Date;
  onSelect: (date: Date) => void;
  prevMonthAria: string;
  nextMonthAria: string;
}) {
  const [month, setMonth] = useState(
    () => new Date(selected.getFullYear(), selected.getMonth(), 1),
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstWeekday = month.getDay();
  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();
  const cells = Array.from(
    { length: daysInMonth },
    (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1),
  );

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={prevMonthAria}
          onClick={() =>
            setMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))
          }
        >
          <ChevronLeft className="size-4" />
        </Button>
        <span className="font-label-md text-label-md text-on-surface capitalize">
          {month.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={nextMonthAria}
          onClick={() =>
            setMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))
          }
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
      <div className="text-on-surface-variant grid grid-cols-7 gap-1 text-center text-xs">
        {WEEKDAY_LABELS.map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {Array.from({ length: firstWeekday }).map((_, i) => (
          <span key={`pad-${i}`} />
        ))}
        {cells.map((date) => {
          const closed = isDayOff(availability, date);
          const past = date < today;
          const isSelected = isSameDay(date, selected);
          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={past}
              onClick={() => onSelect(date)}
              className={cn(
                "h-9 rounded-md text-sm transition-colors",
                past && "text-on-surface-variant/40 cursor-not-allowed",
                !past && closed && !isSelected && "text-destructive",
                !past &&
                  !closed &&
                  !isSelected &&
                  "text-on-surface hover:bg-surface-variant",
                isSelected && "bg-primary text-background",
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function BarberProfileClient({
  profile,
  availability,
  appointments,
}: {
  profile: BarberProfile & { user: DbUser };
  availability: BarberAvailability[];
  appointments: Appointment[];
}) {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { lang, toggleLang } = useLang();
  const t = content[lang];
  const navLinks = [
    { label: t.navAccueil, href: "/" },
    { label: t.navSearch, href: "/search" },
    { label: t.navPlans, href: "/plans" },
  ];
  const open = isOpenNow(availability);
  const heroImage = profile.coverImageUrl ?? profile.avatarUrl;

  const [startAtInput, setStartAtInput] = useState(nowForInput);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [bookingResult, setBookingResult] = useState<
    | { status: "success"; startAt: string }
    | { status: "error" }
    | { status: "limit" }
    | { status: "duplicate" }
    | null
  >(null);

  const selectedDayOff =
    !!startAtInput && isDayOff(availability, new Date(startAtInput));
  const daySlots = startAtInput
    ? getAvailableSlots(
        availability,
        appointments,
        new Date(startAtInput),
        APPOINTMENT_DURATION_MINUTES,
      )
    : [];
  const selectedMinutes = (() => {
    const [h, m] = startAtInput.slice(11, 16).split(":").map(Number);
    return (h ?? 0) * 60 + (m ?? 0);
  })();

  function requestBooking() {
    if (!isSignedIn) {
      router.push(
        `/connexion?redirect_url=${encodeURIComponent(window.location.href)}`,
      );
      return;
    }
    if (!startAtInput || selectedDayOff || !daySlots.includes(selectedMinutes))
      return;
    setConfirmOpen(true);
  }

  function bookAppointment() {
    setConfirmOpen(false);
    if (!startAtInput || selectedDayOff || !daySlots.includes(selectedMinutes))
      return;
    const startAt = new Date(startAtInput);
    const endAt = new Date(
      startAt.getTime() + APPOINTMENT_DURATION_MINUTES * 60_000,
    );
    startTransition(async () => {
      try {
        const result = await createAppointment({
          clientId: CURRENT_CLIENT_USER_ID,
          barberId: profile.id,
          startAt,
          endAt,
          totalPriceMillimes: 0,
          status: "PENDING",
        });
        if (result.duplicate) {
          setBookingResult({ status: "duplicate" });
          return;
        }
        if (result.limitReached) {
          setBookingResult({ status: "limit" });
          return;
        }
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
            aria-label={t.backAria}
            variant="ghost"
            size="icon"
            className="text-on-surface-variant hover:text-primary"
            onClick={() => router.back()}
          >
            <ArrowLeft className="size-5" />
          </Button>
          <span className="font-headline-lg text-headline-lg text-primary font-bold tracking-tighter">
            HAJJEMI
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
          <button
            type="button"
            onClick={toggleLang}
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary border-outline-variant rounded-full border px-3 py-1 transition-colors"
          >
            {t.switchTo}
          </button>
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
              aria-label={t.backAria}
              variant="ghost"
              size="icon"
              className="text-on-surface"
              onClick={() => router.back()}
            >
              <ArrowLeft className="size-5" />
            </Button>
          </div>

          {/* Mobile Language Switch Overlay */}
          <button
            type="button"
            onClick={toggleLang}
            className="glass-panel font-label-sm text-label-sm text-on-surface absolute top-4 right-4 z-10 rounded-full px-3 py-2 md:hidden"
          >
            {t.switchTo}
          </button>

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
                  {open ? t.open : t.closedStatus}
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
                  {open ? t.openShort : t.closedStatus}
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

        {/* Booking Section (Right Column on Desktop) */}
        <section
          className={`fade-in-up mt-stack-lg px-container-margin delay-100 md:col-span-7 md:mt-0 md:px-0 md:pb-0 ${isSignedIn ? "pb-52" : "pb-28"}`}
        >
          {!isSignedIn && (
            <div className="glass-card border-primary/30 mb-stack-md rounded-lg border p-4">
              <p className="font-headline-md text-primary text-[16px] leading-snug">
                {t.loginPromptTitle}
              </p>
              <p className="font-body-md text-on-surface-variant mt-1 text-sm">
                {t.loginPromptText}
              </p>
              <Button
                type="button"
                onClick={() =>
                  router.push(
                    `/connexion?redirect_url=${encodeURIComponent(window.location.href)}`,
                  )
                }
                className="bg-primary text-background font-label-md mt-3 h-auto w-full rounded-lg py-3 hover:opacity-90"
              >
                {t.loginPromptCta}
              </Button>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <span className="font-label-md text-label-md text-on-surface-variant">
              {t.dateTimeLabel}
            </span>
            <Button
              type="button"
              variant="outline"
              onClick={() => setPickerOpen(true)}
              className={cn(
                "font-body-md h-auto w-full justify-start gap-2 py-3 text-[15px] font-normal",
                selectedDayOff && "border-destructive text-destructive",
              )}
            >
              <CalendarIcon className="size-4" />
              {new Date(startAtInput).toLocaleString("fr-FR", {
                dateStyle: "full",
                timeStyle: "short",
              })}
            </Button>
            {selectedDayOff && (
              <p className="text-destructive font-body-md">
                {t.dayOffWarning}
              </p>
            )}
          </div>

          <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t.pickDate}</DialogTitle>
              </DialogHeader>
              <DatePicker
                availability={availability}
                selected={new Date(startAtInput)}
                onSelect={(date) =>
                  setStartAtInput(withDate(startAtInput, date))
                }
                prevMonthAria={t.prevMonthAria}
                nextMonthAria={t.nextMonthAria}
              />
              <div className="mt-stack-md flex flex-col gap-2">
                <span className="font-label-md text-label-md text-on-surface-variant">
                  {t.timeLabel}
                </span>
                {daySlots.length > 0 ? (
                  <div className="grid grid-cols-4 gap-2">
                    {daySlots.map((minutes) => (
                      <button
                        key={minutes}
                        type="button"
                        onClick={() =>
                          setStartAtInput(
                            withTime(startAtInput, formatSlotTime(minutes)),
                          )
                        }
                        className={cn(
                          "font-label-sm text-label-sm rounded-md border px-2 py-2 transition-colors",
                          minutes === selectedMinutes
                            ? "bg-primary text-background border-primary"
                            : "border-surface-variant text-on-surface hover:bg-surface-variant",
                        )}
                      >
                        {formatSlotTime(minutes)}
                      </button>
                    ))}
                  </div>
                ) : (
                  !selectedDayOff && (
                    <p className="text-destructive font-body-md">
                      {t.noSlots}
                    </p>
                  )
                )}
              </div>
              {selectedDayOff && (
                <p className="text-destructive font-body-md">
                  {t.dayOffWarning}
                </p>
              )}
              <DialogFooter>
                <Button
                  onClick={() => setPickerOpen(false)}
                  className="bg-primary text-background"
                >
                  {t.confirmPick}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {bookingResult?.status === "error" && (
            <p className="text-destructive font-body-md mt-stack-md">
              {t.bookingError}
            </p>
          )}
          {bookingResult?.status === "limit" && (
            <p className="text-destructive font-body-md mt-stack-md">
              {t.weeklyLimitError}
            </p>
          )}
          {bookingResult?.status === "duplicate" && (
            <p className="text-destructive font-body-md mt-stack-md">
              {t.duplicateError}
            </p>
          )}

        </section>
      </main>

      {/* Floating Action Button Area (Mobile Book Now, above the nav bar) */}
      <div
        className={`glass-panel px-container-margin py-stack-md fixed left-0 z-40 w-full shadow-[0_-8px_16px_rgba(0,0,0,0.4)] md:hidden ${isSignedIn ? "bottom-20" : "pb-safe bottom-0"}`}
      >
        <Button
          disabled={
            isPending || selectedDayOff || !daySlots.includes(selectedMinutes)
          }
          onClick={requestBooking}
          className="shadow-ambient bg-primary font-headline-md text-background h-auto w-full gap-2 rounded-lg py-3 text-[18px]"
        >
          {isPending ? t.bookingInProgress : t.bookNow}
          <ArrowRight className="size-5" />
        </Button>
      </div>

      {/* BottomNavBar (Mobile Only, signed-in clients) */}
      {isSignedIn && (
        <nav className="bg-surface-container text-primary fixed bottom-0 z-50 w-full rounded-t-xl shadow-[0_-4px_12px_rgba(0,0,0,0.5)] md:hidden">
          <div className="pb-safe flex h-20 items-center justify-around px-4">
            <Link
              href="/"
              className="text-on-surface-variant hover:text-primary flex w-16 flex-col items-center justify-center transition-all duration-200 active:translate-y-0.5"
            >
              <Home className="mb-1 size-5" />
              <span className="font-label-sm text-label-sm">
                {searchContent[lang].navHome}
              </span>
            </Link>
            <Link
              href="/search"
              className="bg-primary-container text-on-primary-container hover:text-primary flex min-w-16 flex-col items-center justify-center rounded-full px-4 py-1 transition-all duration-200 active:translate-y-0.5"
            >
              <Search className="mb-1 size-5" />
              <span className="font-label-sm text-label-sm">
                {searchContent[lang].navExplore}
              </span>
            </Link>
            <Link
              href="/appointments"
              className="text-on-surface-variant hover:text-primary flex w-16 flex-col items-center justify-center transition-all duration-200 active:translate-y-0.5"
            >
              <CalendarIcon className="mb-1 size-5" />
              <span className="font-label-sm text-label-sm">
                {searchContent[lang].navBookings}
              </span>
            </Link>
            <Link
              href="/account"
              className="text-on-surface-variant hover:text-primary flex w-16 flex-col items-center justify-center transition-all duration-200 active:translate-y-0.5"
            >
              <User className="mb-1 size-5" />
              <span className="font-label-sm text-label-sm">
                {searchContent[lang].navAccount}
              </span>
            </Link>
          </div>
        </nav>
      )}

      {/* Desktop Floating Action Area (Hidden on mobile) */}
      <div className="fixed right-8 bottom-8 z-50 hidden md:block">
        <Card className="fade-in-up shadow-ambient border-surface-variant bg-surface-container-high w-80 gap-0 rounded-xl border p-4 delay-200">
          <Button
            disabled={
              isPending || selectedDayOff || !daySlots.includes(selectedMinutes)
            }
            onClick={requestBooking}
            className="font-label-md text-label-md bg-primary text-background h-auto w-full rounded-lg py-3 shadow-sm hover:opacity-90"
          >
            {isPending ? t.bookingInProgress : t.bookNow}
          </Button>
        </Card>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.confirmTitle}</DialogTitle>
            <DialogDescription>{t.confirmDescription}</DialogDescription>
          </DialogHeader>
          <div className="gap-stack-sm flex flex-col">
            <div className="flex items-center justify-between">
              <span className="font-body-md text-label-sm text-on-surface-variant">
                {t.confirmDateTime}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface">
                {startAtInput
                  ? new Date(startAtInput).toLocaleString("fr-FR")
                  : ""}
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              disabled={isPending}
            >
              {t.cancel}
            </Button>
            <Button
              onClick={bookAppointment}
              disabled={isPending}
              className="bg-primary text-background"
            >
              {isPending ? t.bookingInProgress : t.confirm}
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
            <DialogTitle>{t.sentTitle}</DialogTitle>
            <DialogDescription>
              {bookingResult?.status === "success" &&
                t.sentDescription(
                  new Date(bookingResult.startAt).toLocaleString("fr-FR"),
                )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setBookingResult(null)}
              className="bg-primary text-background"
            >
              {t.ok}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
