"use client";

import { useMemo, useOptimistic, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import {
  Bell,
  Calendar,
  Clock,
  LayoutDashboard,
  LogOut,
  Phone,
  Share2,
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
import { uploadImage } from "@/server/uploads";
import type {
  Appointment,
  BarberAvailability,
  BarberProfile,
  User as DbUser,
} from "../../../../generated/prisma";
import { EditProfileDialog } from "./edit-profile-dialog";

const BARBER_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAdrTXJGg8DazrU0p10zIpPYOPEaelASF8XNHGnzqCJrMws5gmTWuP4crJC3MJbz6CQ6y7rwO2LUzW4-l-X8Wkjr9kQ9lzIxNBpUx_iBgvBcGKv1cr4HPz2KXQ7cAau5NA5OV95ius9ruL7Pmo_GL-N54LY5NYrh7nDtkATP2XfiTF3vIyU3Dg-8K6p6lxFOQ8kP6P7TgsfWlklVaXKoXpHDfIWaWAVyTlWkszYSN-koPLGJ40ZVIfWdPMCaPeJ3c3cqqCCoUfVV04D";

const BARBER_PROFILE_PORTRAIT =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ1PSYFJcFErbgTa0UBXq-bgLu_ZCGgqoc9PWO0dlc367UVNuHC4oFdM5MGt2VIhxXkE2c2rKE2flwFbtaGvQ00mBC9r0OZlYDTSzUnqWyVwehQmYqXQU9jPB6U6s6vmb8owjEzXRbqAv24l_gGulYJ2fxGIsTwtCD7rBPV3U6G4t6u-6nCVTS6jPCGLKE3-90yC7uWOQ24AtjsgkIrPwJ3NbHz3qvycKSWKrszDxSQnaurTy3lQDUUT3VH2iW7BZ4aKNcjP_RaO1v";

type ViewId = "dashboard" | "requests" | "agenda" | "profile";

const navItems: { id: ViewId; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", icon: LayoutDashboard },
  { id: "requests", icon: Bell },
  { id: "agenda", icon: Calendar },
  { id: "profile", icon: User },
];

type AppointmentWithClient = Appointment & {
  client: DbUser;
  remainingThisWeek?: number | null;
};

function formatDay(date: Date) {
  return new Date(date).toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

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
  const { signOut } = useClerk();
  const [view, setView] = useState<ViewId>("dashboard");
  const { lang, toggleLang } = useLang("fr");
  const t = dashboardContent[lang];
  const [isPending, startTransition] = useTransition();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [limitError, setLimitError] = useState(false);

  const [optimisticAppointments, applyStatus] = useOptimistic(
    appointments,
    (state, { id, status }: { id: string; status: Appointment["status"] }) =>
      state.map((a) => (a.id === id ? { ...a, status } : a)),
  );
  const [optimisticProfile, applyProfilePatch] = useOptimistic(
    profile,
    (
      state,
      patch: Partial<Pick<BarberProfile, "businessName" | "bio" | "avatarUrl">>,
    ) => ({
      ...state,
      ...patch,
    }),
  );

  async function uploadAvatarFile(file: File) {
    const formData = new FormData();
    formData.set("file", file);
    formData.set("barberId", profile.id);
    formData.set("kind", "avatar");
    const { url } = await uploadImage(formData);
    return url;
  }

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

  const pendingRequests = useMemo(
    () => optimisticAppointments.filter((a) => a.status === "PENDING"),
    [optimisticAppointments],
  );
  const agendaAppointments = useMemo(
    () =>
      optimisticAppointments
        .filter((a) => a.status !== "PENDING")
        .sort(
          (a, b) =>
            new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
        ),
    [optimisticAppointments],
  );

  const agendaDays = useMemo(() => {
    const byDay = new Map<string, AppointmentWithClient[]>();
    for (const a of agendaAppointments) {
      const key = new Date(a.startAt).toDateString();
      (byDay.get(key) ?? byDay.set(key, []).get(key)!).push(a);
    }
    return [...byDay.entries()].map(([key, items]) => ({
      key,
      date: new Date(key),
      items,
    }));
  }, [agendaAppointments]);

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
    setLimitError(false);
    startTransition(async () => {
      applyStatus({ id, status });
      const result = await updateAppointment(id, { status });
      // router.refresh() below reverts the optimistic flip if it was refused.
      if ("limitReached" in result && result.limitReached) setLimitError(true);
      router.refresh();
      setPendingId(null);
    });
  }

  function saveProfile(updated: {
    name: string;
    bio: string;
    weekdaysHours: string;
    sundayHours: string;
    avatarUrl: string;
  }) {
    startTransition(async () => {
      applyProfilePatch({
        businessName: updated.name,
        bio: updated.bio,
        avatarUrl: updated.avatarUrl,
      });
      applyHoursPatch({
        weekdaysHours: updated.weekdaysHours,
        sundayHours: updated.sundayHours,
      });
      await updateBarberProfile(profile.id, {
        businessName: updated.name,
        bio: updated.bio,
        avatarUrl: updated.avatarUrl,
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
            <button
              type="button"
              aria-label={t.nav.profile}
              onClick={() => setView("profile")}
            >
              <Avatar className="border-primary/20 size-10 cursor-pointer border transition-opacity hover:opacity-80">
                <AvatarImage
                  alt="Portrait du barbier"
                  src={optimisticProfile.avatarUrl ?? BARBER_AVATAR}
                />
                <AvatarFallback>
                  {optimisticProfile.businessName[0]}
                </AvatarFallback>
              </Avatar>
            </button>
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
                <span className="relative">
                  {t.nav[item.id]}
                  {item.id === "requests" && pendingRequests.length > 0 && (
                    <span className="bg-primary absolute -top-1 -right-2.5 size-2 rounded-full" />
                  )}
                </span>
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
                onClick={() => setView("agenda")}
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

        {/* View: Requests (pending bookings to accept/decline) */}
        {view === "requests" && (
          <section>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile mb-stack-lg">
              {t.requestsTitle}
            </h1>
            {limitError && (
              <p className="text-destructive font-body-md mb-stack-md">
                {t.weeklyLimitReached}
              </p>
            )}
            {pendingRequests.length === 0 && (
              <p className="text-on-surface-variant font-body-md">
                {t.noRequests}
              </p>
            )}
            <div className="gap-stack-lg space-y-stack-lg md:grid md:grid-cols-2 md:space-y-0 lg:grid-cols-3">
              {pendingRequests.map((booking) => (
                <Card
                  key={booking.id}
                  className="bg-surface-container-high border-primary/30 p-gutter gap-stack-md rounded-xl border"
                >
                  <div className="mb-stack-md flex items-start justify-between">
                    <div>
                      <Badge className="bg-primary/20 text-primary mb-2 inline-block rounded-sm uppercase">
                        {t.pending}
                      </Badge>
                      <p className="font-headline-md text-headline-md">
                        {booking.client.name}
                      </p>
                      {booking.remainingThisWeek != null && (
                        <p className="text-on-surface-variant font-label-sm mt-1">
                          {t.remainingThisWeek(booking.remainingThisWeek)}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-headline-md text-primary">
                        {formatTime(booking.startAt)}
                      </p>
                      <p className="text-on-surface-variant font-label-sm capitalize">
                        {formatDay(booking.startAt)}
                      </p>
                    </div>
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
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* View: Agenda (confirmed/past bookings by date) */}
        {view === "agenda" && (
          <section>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile mb-stack-lg">
              {t.agendaTitle}
            </h1>
            {agendaDays.length === 0 && (
              <p className="text-on-surface-variant font-body-md">
                {t.emptyAgenda}
              </p>
            )}
            <div className="space-y-section-gap md:mx-auto md:max-w-2xl">
              {agendaDays.map(({ key, date, items }) => {
                const isToday = isSameDay(date, new Date());
                return (
                  <div key={key}>
                    {/* Day header */}
                    <div className="mb-stack-md flex items-baseline gap-3">
                      <span
                        className={`font-headline-md text-headline-md capitalize ${isToday ? "text-primary" : ""}`}
                      >
                        {isToday ? t.today : formatDay(date)}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        {t.dayCount(items.length)}
                      </span>
                      <span className="border-outline-variant/40 flex-1 border-t" />
                    </div>
                    {/* Timeline */}
                    <div className="border-outline-variant/40 ml-2 space-y-3 border-l pl-5">
                      {items.map((booking) => {
                        const confirmed = booking.status === "CONFIRMED";
                        return (
                          <div key={booking.id} className="relative">
                            <span
                              className={`absolute top-4 -left-[26.5px] size-3 rounded-full border-2 ${
                                confirmed
                                  ? "bg-primary border-primary shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                                  : "bg-surface border-outline-variant"
                              }`}
                            />
                            <Card
                              className={`p-gutter flex-row items-center gap-4 rounded-xl ${
                                confirmed
                                  ? "bg-surface-container border-primary/20 border"
                                  : "bg-surface-container gap-4 opacity-50"
                              }`}
                            >
                              <div className="min-w-14 text-center">
                                <p
                                  className={`font-headline-md leading-tight ${confirmed ? "text-primary" : "text-on-surface-variant"}`}
                                >
                                  {formatTime(booking.startAt)}
                                </p>
                              </div>
                              <div className="border-outline-variant/40 self-stretch border-l" />
                              <div className="min-w-0 flex-1">
                                <p
                                  className={`font-headline-md text-headline-md truncate ${confirmed ? "" : "text-on-surface-variant"}`}
                                >
                                  {booking.client.name}
                                </p>
                              </div>
                              <Badge
                                className={
                                  confirmed
                                    ? "bg-primary/15 text-primary rounded-sm"
                                    : "bg-surface-variant text-on-surface-variant rounded-sm"
                                }
                              >
                                {confirmed ? t.confirmed : t.done}
                              </Badge>
                            </Card>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
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
                    src={optimisticProfile.avatarUrl ?? BARBER_PROFILE_PORTRAIT}
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
                      avatarUrl:
                        optimisticProfile.avatarUrl ?? BARBER_PROFILE_PORTRAIT,
                    }}
                    onSave={saveProfile}
                    onUploadAvatar={uploadAvatarFile}
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
              onClick={() => signOut(() => router.push("/connexion"))}
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
            <span className="relative">
              <item.icon className="size-5" />
              {item.id === "requests" && pendingRequests.length > 0 && (
                <span className="bg-primary absolute -top-1 -right-1 size-2.5 rounded-full" />
              )}
            </span>
            <span className="font-label-sm text-label-sm">
              {t.nav[item.id]}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
