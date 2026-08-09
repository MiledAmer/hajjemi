"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import {
  ArrowLeft,
  Bell,
  Calendar,
  Home,
  Scissors,
  Search,
  User,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GOVERNORATE_LABELS } from "@/lib/governorate";
import { clientAppointments as content, useLang } from "@/lib/tounsi";
import { cn } from "@/lib/utils";
import { markAppointmentsSeenByClient } from "@/server/appointments";
import type {
  Appointment,
  AppointmentStatus,
  BarberProfile,
} from "../../../../generated/prisma";

type AppointmentWithBarber = Appointment & { barber: BarberProfile };

const STATUS_ORDER: AppointmentStatus[] = [
  "PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
  "NO_SHOW",
];

const STATUS_BORDER: Record<AppointmentStatus, string> = {
  PENDING: "border-primary",
  CONFIRMED: "border-secondary",
  COMPLETED: "border-secondary",
  CANCELLED: "border-destructive opacity-60",
  NO_SHOW: "border-destructive opacity-60",
};

function formatDateTime(date: Date) {
  return new Date(date).toLocaleString("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function AppointmentsClient({
  appointments,
}: {
  appointments: AppointmentWithBarber[];
}) {
  const router = useRouter();
  const { lang, toggleLang } = useLang();
  const t = content[lang];
  const [notifOpen, setNotifOpen] = useState(false);
  const [, startTransition] = useTransition();

  const notifications = useMemo(
    () =>
      appointments
        .filter(
          (a) =>
            a.clientSeenAt === null &&
            (a.status === "CONFIRMED" || a.status === "CANCELLED"),
        )
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()),
    [appointments],
  );

  // Reading the notifications (closing the dialog) is what clears the
  // badge — merely opening the page shouldn't silently dismiss them.
  function handleNotifOpenChange(open: boolean) {
    setNotifOpen(open);
    if (!open && notifications.length > 0) {
      startTransition(async () => {
        await markAppointmentsSeenByClient();
        router.refresh();
      });
    }
  }

  const groups = useMemo(() => {
    const byStatus = new Map<AppointmentStatus, AppointmentWithBarber[]>();
    for (const status of STATUS_ORDER) byStatus.set(status, []);
    for (const appointment of appointments) {
      byStatus.get(appointment.status)?.push(appointment);
    }
    // Upcoming groups: next appointment first. Past groups (completed,
    // cancelled, no-show): most recent first, oldest at the bottom.
    for (const [status, list] of byStatus) {
      if (status === "PENDING" || status === "CONFIRMED") {
        list.sort((a, b) => a.startAt.getTime() - b.startAt.getTime());
      } else {
        list.sort((a, b) => b.startAt.getTime() - a.startAt.getTime());
      }
    }
    return byStatus;
  }, [appointments]);

  const statusLabel: Record<AppointmentStatus, string> = {
    PENDING: t.statusPending,
    CONFIRMED: t.statusConfirmed,
    CANCELLED: t.statusCancelled,
    COMPLETED: t.statusCompleted,
    NO_SHOW: t.statusNoShow,
  };
  const groupLabel: Partial<Record<AppointmentStatus, string>> = {
    PENDING: t.pending,
    CONFIRMED: t.confirmed,
    CANCELLED: t.cancelled,
    COMPLETED: t.completed,
  };

  return (
    <div className="bg-background text-on-background min-h-screen pb-24">
      <header className="bg-surface sticky top-0 z-40 w-full shadow-sm">
        <div className="px-container-margin mx-auto flex h-16 w-full max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label={t.backAria}
              onClick={() => router.back()}
              className="text-primary hover:bg-surface-container-high rounded-full p-2 transition-colors active:scale-95"
            >
              <ArrowLeft className="size-5" />
            </button>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold tracking-tighter">
              {t.title}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleLang}
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary border-outline-variant rounded-full border px-3 py-1 transition-colors"
            >
              {t.switchTo}
            </button>
            <button
              type="button"
              aria-label={t.bellAria}
              onClick={() => handleNotifOpenChange(true)}
              className="text-on-surface-variant hover:text-primary relative rounded-full p-2 transition-colors active:scale-95"
            >
              <Bell className="size-5" />
              {notifications.length > 0 && (
                <span className="bg-primary text-background absolute top-0 right-0 flex size-4 items-center justify-center rounded-full text-[10px] font-bold">
                  {notifications.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <Dialog open={notifOpen} onOpenChange={handleNotifOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.notifTitle}</DialogTitle>
          </DialogHeader>
          {notifications.length === 0 ? (
            <p className="text-on-surface-variant font-body-md py-stack-md text-center">
              {t.notifEmpty}
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {notifications.map((appointment) => (
                <p
                  key={appointment.id}
                  className="font-body-md text-on-surface bg-surface-container-high rounded-lg p-3"
                >
                  {appointment.status === "CONFIRMED"
                    ? t.notifConfirmed(
                        appointment.barber.businessName,
                        formatDateTime(appointment.startAt),
                      )
                    : t.notifCancelled(
                        appointment.barber.businessName,
                        formatDateTime(appointment.startAt),
                      )}
                </p>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button
              onClick={() => handleNotifOpenChange(false)}
              className="bg-primary text-background"
            >
              {t.notifClose}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <main className="px-container-margin pt-stack-lg mx-auto w-full max-w-4xl">
        <p className="text-on-surface-variant font-body-md mb-section-gap">
          {t.subtitle}
        </p>

        {appointments.length === 0 ? (
          <p className="text-on-surface-variant font-body-md py-stack-lg text-center">
            {t.noAppointments}
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {STATUS_ORDER.filter((status) => groupLabel[status]).map(
              (status) => {
                const rows = groups.get(status) ?? [];
                if (rows.length === 0) return null;
                return (
                  <section key={status} className="mt-2">
                    <h3 className="font-label-md text-label-md text-primary mb-stack-md tracking-widest uppercase">
                      {groupLabel[status]} ({rows.length})
                    </h3>
                    <div className="flex flex-col gap-4">
                      {rows.map((appointment) => (
                        <Card
                          key={appointment.id}
                          className={cn(
                            "bg-surface-container p-gutter gap-0 rounded-xl border-l-4 shadow-sm",
                            STATUS_BORDER[appointment.status],
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              <h4 className="font-headline-md text-body-lg text-on-surface">
                                {appointment.barber.businessName}
                              </h4>
                              <div className="text-primary flex items-center gap-1">
                                <Scissors className="size-3.5" />
                                <span className="font-label-sm text-label-sm">
                                  {GOVERNORATE_LABELS[
                                    appointment.barber.governorate
                                  ]}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="font-headline-md text-on-surface">
                                {formatDateTime(appointment.startAt)}
                              </span>
                              <span className="font-label-sm text-label-sm text-on-surface-variant">
                                {statusLabel[appointment.status]}
                              </span>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </section>
                );
              },
            )}
          </div>
        )}
      </main>

      <nav className="bg-surface-container text-primary fixed bottom-0 z-50 w-full rounded-t-xl shadow-[0_-4px_12px_rgba(0,0,0,0.5)] md:hidden">
        <div className="pb-safe flex h-20 items-center justify-around px-4">
          <Link
            href="/"
            className="text-on-surface-variant hover:text-primary flex w-16 flex-col items-center justify-center transition-all duration-200 active:translate-y-0.5"
          >
            <Home className="mb-1 size-5" />
            <span className="font-label-sm text-label-sm">{t.navHome}</span>
          </Link>
          <Link
            href="/search"
            className="text-on-surface-variant hover:text-primary flex w-16 flex-col items-center justify-center transition-all duration-200 active:translate-y-0.5"
          >
            <Search className="mb-1 size-5" />
            <span className="font-label-sm text-label-sm">{t.navExplore}</span>
          </Link>
          <Link
            href="/appointments"
            className="bg-primary-container text-on-primary-container hover:text-primary flex min-w-16 flex-col items-center justify-center rounded-full px-4 py-1 transition-all duration-200 active:translate-y-0.5"
          >
            <Calendar className="mb-1 size-5" />
            <span className="font-label-sm text-label-sm">
              {t.navBookings}
            </span>
          </Link>
          <Link
            href="/account"
            className="text-on-surface-variant hover:text-primary flex w-16 flex-col items-center justify-center transition-all duration-200 active:translate-y-0.5"
          >
            <User className="mb-1 size-5" />
            <span className="font-label-sm text-label-sm">{t.navAccount}</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
