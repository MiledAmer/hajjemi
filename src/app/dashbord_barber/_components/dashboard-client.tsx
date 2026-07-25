"use client";

import { useMemo, useOptimistic, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  Calendar,
  Clock,
  Eraser,
  LayoutDashboard,
  LogOut,
  Phone,
  Scissors,
  Share2,
  Smile,
  Trash2,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { dashboard as dashboardContent, useLang } from "@/lib/tounsi";
import { updateAppointment } from "@/server/appointments";
import { setWeeklyHours } from "@/server/barber-availability";
import { updateBarberProfile } from "@/server/barber-profiles";
import type {
  Appointment,
  BarberAvailability,
  BarberProfile,
  User as DbUser,
} from "../../../../generated/prisma";
import { AddServiceDialog } from "./add-service-dialog";
import { EditProfileDialog } from "./edit-profile-dialog";
import { EditServiceDialog } from "./edit-service-dialog";

const BARBER_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAdrTXJGg8DazrU0p10zIpPYOPEaelASF8XNHGnzqCJrMws5gmTWuP4crJC3MJbz6CQ6y7rwO2LUzW4-l-X8Wkjr9kQ9lzIxNBpUx_iBgvBcGKv1cr4HPz2KXQ7cAau5NA5OV95ius9ruL7Pmo_GL-N54LY5NYrh7nDtkATP2XfiTF3vIyU3Dg-8K6p6lxFOQ8kP6P7TgsfWlklVaXKoXpHDfIWaWAVyTlWkszYSN-koPLGJ40ZVIfWdPMCaPeJ3c3cqqCCoUfVV04D";

const BARBER_PROFILE_PORTRAIT =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ1PSYFJcFErbgTa0UBXq-bgLu_ZCGgqoc9PWO0dlc367UVNuHC4oFdM5MGt2VIhxXkE2c2rKE2flwFbtaGvQ00mBC9r0OZlYDTSzUnqWyVwehQmYqXQU9jPB6U6s6vmb8owjEzXRbqAv24l_gGulYJ2fxGIsTwtCD7rBPV3U6G4t6u-6nCVTS6jPCGLKE3-90yC7uWOQ24AtjsgkIrPwJ3NbHz3qvycKSWKrszDxSQnaurTy3lQDUUT3VH2iW7BZ4aKNcjP_RaO1v";

type ViewId = "dashboard" | "bookings" | "services" | "profile";

const navItems: { id: ViewId; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", icon: LayoutDashboard },
  { id: "bookings", icon: Calendar },
  { id: "services", icon: Scissors },
  { id: "profile", icon: User },
];

// ponytail: no Service model in the schema yet — services stay client-only
// mock data until Catalog is modeled and gets its own CRUD.
type Service = {
  name: string;
  duration: string;
  price: string;
  icon: typeof Scissors;
};

const initialServices: Service[] = [
  { name: "Coupe Classique", duration: "30 min", price: "25 DT", icon: Scissors },
  { name: "Barbe VIP", duration: "20 min", price: "15 DT", icon: Smile },
  { name: "Teinture Barbe", duration: "45 min", price: "40 DT", icon: Eraser },
];

type AppointmentWithClient = Appointment & { client: DbUser };

function formatTime(date: Date) {
  return new Date(date).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatMinutes(minutes: number) {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

const WEEKDAYS_RANGE_RE = /^\d{2}:\d{2} - \d{2}:\d{2}$/;

export function DashboardClient({
  profile,
  appointments,
  availability,
}: {
  profile: BarberProfile & { user: DbUser };
  appointments: AppointmentWithClient[];
  availability: BarberAvailability[];
}) {
  const router = useRouter();
  const [view, setView] = useState<ViewId>("dashboard");
  const [services, setServices] = useState<Service[]>(initialServices);
  const { lang, toggleLang } = useLang();
  const t = dashboardContent[lang];
  const [isPending, startTransition] = useTransition();
  const [pendingId, setPendingId] = useState<string | null>(null);

  const [optimisticAppointments, applyStatus] = useOptimistic(
    appointments,
    (state, { id, status }: { id: string; status: Appointment["status"] }) =>
      state.map((a) => (a.id === id ? { ...a, status } : a)),
  );
  const [optimisticProfile, applyProfilePatch] = useOptimistic(
    profile,
    (state, patch: Partial<Pick<BarberProfile, "businessName" | "bio">>) => ({
      ...state,
      ...patch,
    }),
  );

  const mondayRow = availability.find((a) => a.dayOfWeek === "MONDAY");
  const sundayRow = availability.find((a) => a.dayOfWeek === "SUNDAY");
  const [optimisticHours, applyHoursPatch] = useOptimistic(
    {
      weekdaysHours: mondayRow
        ? `${formatMinutes(mondayRow.startMinute)} - ${formatMinutes(mondayRow.endMinute)}`
        : "09:00 - 19:00",
      sundayHours: sundayRow
        ? `${formatMinutes(sundayRow.startMinute)} - ${formatMinutes(sundayRow.endMinute)}`
        : t.closed,
    },
    (state, patch: { weekdaysHours: string; sundayHours: string }) => patch,
  );

  const todayCount = useMemo(() => {
    const today = new Date();
    return optimisticAppointments.filter((a) =>
      isSameDay(new Date(a.startAt), today),
    ).length;
  }, [optimisticAppointments]);
  const upcomingAppointments = useMemo(() => {
    const now = new Date();
    return optimisticAppointments
      .filter(
        (a) =>
          new Date(a.startAt) >= now &&
          a.status !== "CANCELLED" &&
          a.status !== "NO_SHOW",
      )
      .slice(0, 3);
  }, [optimisticAppointments]);

  function setStatus(id: string, status: "CONFIRMED" | "CANCELLED") {
    setPendingId(id);
    startTransition(async () => {
      applyStatus({ id, status });
      await updateAppointment(id, { status });
      router.refresh();
      setPendingId(null);
    });
  }

  function saveProfile(updated: {
    name: string;
    bio: string;
    weekdaysHours: string;
    sundayHours: string;
  }) {
    startTransition(async () => {
      applyProfilePatch({ businessName: updated.name, bio: updated.bio });
      applyHoursPatch({
        weekdaysHours: updated.weekdaysHours,
        sundayHours: updated.sundayHours,
      });
      await updateBarberProfile(profile.id, {
        businessName: updated.name,
        bio: updated.bio,
      });
      // ponytail: a "Fermé"/free-text Sunday value is treated as closed
      // rather than validated — only an exact "HH:MM - HH:MM" range persists.
      if (WEEKDAYS_RANGE_RE.test(updated.weekdaysHours)) {
        await setWeeklyHours(profile.id, {
          weekdaysRange: updated.weekdaysHours,
          sundayRange: WEEKDAYS_RANGE_RE.test(updated.sundayHours)
            ? updated.sundayHours
            : null,
        });
      }
      router.refresh();
    });
  }

  return (
    <div className="bg-background text-on-background min-h-screen overflow-x-hidden">
      {/* Top App Bar */}
      <header className="bg-surface px-container-margin py-base sticky top-0 z-40 flex h-16 w-full items-center justify-between shadow-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <div className="gap-base flex items-center">
            <Avatar className="border-primary/20 size-10 border">
              <AvatarImage
                alt="Portrait du barbier"
                src={profile.avatarUrl ?? BARBER_AVATAR}
              />
              <AvatarFallback>{optimisticProfile.businessName[0]}</AvatarFallback>
            </Avatar>
            <span className="font-headline-md text-headline-md text-primary font-bold">
              {optimisticProfile.businessName}
            </span>
          </div>
          <nav className="gap-stack-lg hidden items-center md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={
                  view === item.id
                    ? "font-label-md text-label-md text-primary font-bold"
                    : "font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                }
              >
                {t.nav[item.id]}
              </button>
            ))}
          </nav>
          <div className="gap-stack-md flex items-center">
            <button
              type="button"
              onClick={toggleLang}
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary border-outline-variant rounded-full border px-3 py-1 transition-colors"
            >
              {t.switchTo}
            </button>
            <Button
              aria-label="Notifications"
              variant="ghost"
              size="icon"
              className="text-on-surface-variant"
            >
              <Bell className="size-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="px-container-margin pt-stack-lg mx-auto min-h-screen w-full max-w-7xl pb-20 md:pb-12">
        {/* View: Dashboard */}
        {view === "dashboard" && (
          <section>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile mb-stack-lg">
              {t.greetingPrefix}, {profile.user.name}
            </h1>

            <div className="gap-gutter mb-section-gap grid grid-cols-2">
              <Card className="border-primary/10 bg-surface-container/80 gap-base p-stack-lg rounded-xl border backdrop-blur-sm">
                <span className="text-on-surface-variant font-label-sm tracking-wider uppercase">
                  {t.todayCount}
                </span>
                <span className="text-display-lg font-display-lg text-primary">
                  {todayCount}
                </span>
              </Card>
            </div>

            <div className="mb-stack-md flex items-center justify-between">
              <h2 className="font-headline-md text-headline-md">
                {t.upcomingTitle}
              </h2>
              <Button
                variant="ghost"
                className="text-primary font-label-md h-auto p-0"
                onClick={() => setView("bookings")}
              >
                {t.seeAll}
              </Button>
            </div>

            <div className="gap-gutter space-y-gutter md:grid md:grid-cols-2 md:space-y-0 lg:grid-cols-3">
              {upcomingAppointments.map((appointment) => (
                <Card
                  key={appointment.id}
                  className="bg-surface-container p-stack-lg border-primary flex-row items-center justify-between gap-0 rounded-lg border-l-4 transition-all active:scale-[0.98]"
                >
                  <div>
                    <p className="font-headline-md text-headline-md">
                      {appointment.client.name}
                    </p>
                    <p className="text-on-surface-variant font-body-md">
                      {(appointment.totalPriceMillimes / 1000).toFixed(3)} DT
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-headline-md text-primary">
                      {formatTime(appointment.startAt)}
                    </p>
                    <p className="text-on-surface-variant font-label-sm">
                      {t.confirmed}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* View: Bookings */}
        {view === "bookings" && (
          <section>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile mb-stack-lg">
              {t.bookingsTitle}
            </h1>
            <div className="gap-stack-lg space-y-stack-lg md:grid md:grid-cols-2 md:space-y-0 lg:grid-cols-3">
              {optimisticAppointments.map((booking) => (
                <Card
                  key={booking.id}
                  className={
                    booking.status === "PENDING"
                      ? "bg-surface-container-high border-primary/30 p-gutter gap-stack-md rounded-xl border"
                      : booking.status === "COMPLETED" ||
                          booking.status === "CANCELLED" ||
                          booking.status === "NO_SHOW"
                        ? "bg-surface-container p-gutter gap-0 rounded-xl opacity-60"
                        : "bg-surface-container p-gutter gap-0 rounded-xl"
                  }
                >
                  {booking.status === "PENDING" ? (
                    <>
                      <div className="mb-stack-md flex items-start justify-between">
                        <div>
                          <Badge className="bg-primary/20 text-primary mb-2 inline-block rounded-sm uppercase">
                            {t.pending}
                          </Badge>
                          <p className="font-headline-md text-headline-md">
                            {booking.client.name}
                          </p>
                          <p className="text-on-surface-variant font-body-md">
                            {(booking.totalPriceMillimes / 1000).toFixed(3)} DT
                          </p>
                        </div>
                        <p className="font-headline-md text-primary">
                          {formatTime(booking.startAt)}
                        </p>
                      </div>
                      <div className="gap-gutter flex">
                        <Button
                          disabled={isPending && pendingId === booking.id}
                          onClick={() => setStatus(booking.id, "CONFIRMED")}
                          className="bg-primary text-on-primary h-auto flex-1 rounded-lg py-3 font-bold"
                        >
                          {t.accept}
                        </Button>
                        <Button
                          disabled={isPending && pendingId === booking.id}
                          onClick={() => setStatus(booking.id, "CANCELLED")}
                          variant="outline"
                          className="border-outline text-on-surface h-auto flex-1 rounded-lg py-3 font-bold"
                        >
                          {t.decline}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className={`font-headline-md text-headline-md ${booking.status !== "CONFIRMED" ? "text-on-surface-variant" : ""}`}
                        >
                          {booking.client.name}
                        </p>
                        <p className="text-on-surface-variant font-body-md">
                          {(booking.totalPriceMillimes / 1000).toFixed(3)} DT
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-headline-md ${booking.status !== "CONFIRMED" ? "text-on-surface-variant" : "text-primary"}`}
                        >
                          {formatTime(booking.startAt)}
                        </p>
                        <span
                          className={`text-label-sm ${booking.status !== "CONFIRMED" ? "" : "text-secondary"}`}
                        >
                          {booking.status === "CONFIRMED" ? t.confirmed : t.done}
                        </span>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* View: Services */}
        {view === "services" && (
          <section>
            <div className="mb-stack-lg flex items-center justify-between">
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile">
                {t.myServices}
              </h1>
              <AddServiceDialog
                lang={lang}
                onAdd={(newService) =>
                  setServices((prev) => [
                    ...prev,
                    { ...newService, icon: Scissors },
                  ])
                }
              />
            </div>
            <div className="gap-gutter space-y-gutter md:grid md:grid-cols-2 md:space-y-0 lg:grid-cols-3">
              {services.map((service) => (
                <Card
                  key={service.name}
                  className="bg-surface-container p-gutter flex-row items-center justify-between gap-0 rounded-xl"
                >
                  <div className="gap-gutter flex items-center">
                    <div className="bg-surface-variant text-primary flex size-12 items-center justify-center rounded-lg">
                      <service.icon className="size-5" />
                    </div>
                    <div>
                      <p className="font-headline-md text-headline-md">
                        {service.name}
                      </p>
                      <p className="text-on-surface-variant font-body-md">
                        {service.duration} • {service.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <EditServiceDialog
                      lang={lang}
                      service={service}
                      onSave={(updated) =>
                        setServices((prev) =>
                          prev.map((s) =>
                            s.name === service.name
                              ? { ...s, ...updated }
                              : s,
                          ),
                        )
                      }
                    />
                    <Button
                      aria-label={t.deleteAria}
                      variant="ghost"
                      size="icon"
                      className="text-on-surface-variant hover:text-destructive size-10"
                    >
                      <Trash2 className="size-5" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* View: Profile */}
        {view === "profile" && (
          <section className="md:mx-auto md:max-w-xl">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile mb-stack-lg">
              {t.myProfile}
            </h1>
            <Card className="p-gutter gap-stack-lg mb-section-gap relative overflow-hidden rounded-2xl">
              <div className="bg-primary/10 pointer-events-none absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full blur-3xl" />
              <div className="gap-stack-md mb-stack-lg relative z-10 flex flex-col items-center">
                <Avatar className="border-primary size-24 border-2 p-1">
                  <AvatarImage
                    alt={`Portrait de ${profile.user.name}`}
                    src={profile.avatarUrl ?? BARBER_PROFILE_PORTRAIT}
                  />
                  <AvatarFallback>{optimisticProfile.businessName[0]}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="font-headline-lg text-headline-lg">
                    {optimisticProfile.businessName}
                  </h2>
                  <p className="text-primary font-label-md tracking-widest uppercase">
                    {t.masterBarber}
                  </p>
                </div>
              </div>
              <div className="space-y-stack-md relative z-10">
                <p className="text-on-surface-variant font-body-md px-4 text-center">
                  {optimisticProfile.bio ?? t.bio}
                </p>
                <div className="gap-gutter mt-stack-lg flex justify-center">
                  <Button
                    aria-label={t.callAria}
                    variant="secondary"
                    size="icon"
                    className="bg-surface-variant text-primary size-11 rounded-full"
                  >
                    <Phone className="size-5" />
                  </Button>
                  <Button
                    aria-label={t.shareAria}
                    variant="secondary"
                    size="icon"
                    className="bg-surface-variant text-primary size-11 rounded-full"
                  >
                    <Share2 className="size-5" />
                  </Button>
                  <EditProfileDialog
                    lang={lang}
                    profile={{
                      name: optimisticProfile.businessName,
                      bio: optimisticProfile.bio ?? t.bio,
                      weekdaysHours: optimisticHours.weekdaysHours,
                      sundayHours: optimisticHours.sundayHours,
                    }}
                    onSave={saveProfile}
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-surface-container p-gutter mb-gutter gap-stack-md rounded-xl">
              <h3 className="font-headline-md text-headline-md flex items-center gap-2">
                <Clock className="text-primary size-5" />
                {t.hours}
              </h3>
              <div className="space-y-2">
                <div className="text-body-md flex justify-between">
                  <span className="text-on-surface-variant">
                    {t.weekdays}
                  </span>
                  <span className="font-bold">
                    {optimisticHours.weekdaysHours}
                  </span>
                </div>
                <div className="text-body-md flex justify-between">
                  <span className="text-on-surface-variant">{t.sunday}</span>
                  <span className="text-destructive">
                    {optimisticHours.sundayHours}
                  </span>
                </div>
              </div>
            </Card>

            <Button
              variant="ghost"
              className="text-destructive bg-destructive/10 mt-stack-lg h-auto w-full gap-2 rounded-xl py-4 font-bold"
            >
              <LogOut className="size-5" />
              {t.logout}
            </Button>
          </section>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="bg-surface-container fixed bottom-0 z-50 flex h-16 w-full items-center justify-around px-4 shadow-[0_-4px_12px_rgba(0,0,0,0.5)] md:hidden">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={
              view === item.id
                ? "bg-primary-container text-on-primary-container flex flex-col items-center justify-center rounded-full px-4 py-1 transition-all duration-200 active:scale-90"
                : "text-on-surface-variant hover:text-primary flex flex-col items-center justify-center transition-all duration-200 active:scale-90"
            }
          >
            <item.icon className="size-5" />
            <span className="font-label-sm text-label-sm">
              {t.nav[item.id]}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
