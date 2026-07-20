"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Banknote,
  BadgeCheck,
  Calendar,
  CalendarCheck,
  CheckCircle2,
  ChevronRight,
  Home,
  Menu,
  Scissors,
  ScissorsLineDashed,
  Search,
  Settings,
  User,
  Wallet,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const BARBER_PORTRAIT =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD0IfJqvnu0uuU9uh_dSAlic4-4ettsGx-FFX297uSF2b7dXURycZ7tmDofuORwSHJ1FlJwiRY86bOqcapvdDxzXDc9TcRnw3fhhCNFKPM1rL9bdBdUjBww9pXU3YiDseEa0KHKialRJ_wuLCrE5lOSegWRxyq6otdx_oJVh_AuCYpJ-v2fPkwU0BcAENVgrfe7xJ3YCpU6l6DdkJFAJRBTZwqVG1zlCnHhVhj4-0nRhSMEjswZ1Erocp0pOMnXIwgVJ6L6rpOV3CsK";

const drawerLinks = [
  { label: "Tableau de bord", icon: Home, active: true },
  { label: "Planning", icon: Calendar, active: false },
  { label: "Services", icon: Scissors, active: false },
  { label: "Portefeuille", icon: Wallet, active: false },
  { label: "Paramètres", icon: Settings, active: false },
];

type Appointment = {
  time: string;
  duration?: string;
  client: string;
  service: string;
  past?: boolean;
};

const appointments: Appointment[] = [
  {
    time: "14:30",
    duration: "45 MIN",
    client: "Ahmed B.",
    service: "Coupe + Barbe",
  },
  {
    time: "15:15",
    duration: "30 MIN",
    client: "Sami T.",
    service: "Coupe Simple",
  },
  { time: "13:00", client: "Karim L.", service: "Barbe", past: true },
];

const planFeatures = [
  "Rendez-vous illimités",
  "Statistiques avancées",
  "Visibilité boostée",
];

const bottomNavItems = [
  { label: "Accueil", icon: Home, active: true, href: "/dashboard" },
  { label: "Explorer", icon: Search, active: false, href: null },
  { label: "Rendez-vous", icon: Calendar, active: false, href: null },
  { label: "Compte", icon: User, active: false, href: null },
];

export default function TableauDeBordBarberPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="bg-background text-on-background flex min-h-screen flex-col antialiased">
      {/* TopAppBar */}
      <header className="bg-surface sticky top-0 z-40 w-full shadow-sm">
        <div className="px-container-margin mx-auto flex h-16 w-full max-w-7xl items-center justify-between">
          <Button
            aria-label="Menu"
            variant="ghost"
            size="icon"
            className="text-primary -ml-2 rounded-full md:hidden"
            onClick={() => setIsDrawerOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold tracking-tighter md:hidden">
            HAJJEM
          </h1>
          <div className="gap-stack-lg hidden items-center md:flex">
            <span className="font-headline-md text-headline-md text-primary font-bold tracking-tighter">
              HAJJEM
            </span>
            {drawerLinks.map((link) => (
              <a
                key={link.label}
                href="#"
                className={
                  link.active
                    ? "font-label-md text-label-md text-primary font-bold"
                    : "font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
                }
              >
                {link.label}
              </a>
            ))}
          </div>
          <Avatar className="border-surface-container-highest hover:bg-surface-container-high size-10 cursor-pointer border-2 transition-colors active:scale-95">
            <AvatarImage
              alt="Portrait du barbier, tablier sombre sur chemise blanche, salon premium."
              src={BARBER_PORTRAIT}
            />
            <AvatarFallback>H</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Navigation Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="bg-surface-container-low border-none p-gutter"
        >
          <SheetHeader className="mt-4 mb-4 flex-row items-center justify-between gap-4 p-0">
            <div className="flex items-center gap-4">
              <Avatar className="border-primary size-14 border-2">
                <AvatarImage
                  alt="Portrait du barbier, tablier sombre sur chemise blanche, salon premium."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA60nN-tCZtXUWC1fJ_-noOtwJtnz5L9DWzT4_EnCCBIF1UlXJE0wvnYivHqyNjNUIdYhR0rlEOWbbGGnUPxhNFuiK1Lq_b9Yat_rL_yIy1wRL_VQu_AcbT-1482peEJUGYYIPpuvs8h_F7DeG2jZIRuhWsJOO3dpJIdX72Kg7E6sLbfAyxG_AIZDVcziJkyftvQa_bxRBiFui8xdNpeb0KzU9Kl-nbhEzk7X_IZ8kXJ5yBwMGLkPP9pDB_42O8uR5cLBcMZYLdrPzC"
                />
                <AvatarFallback>H</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-left">
                <SheetTitle className="font-headline-md text-headline-md text-primary">
                  Hajjem Pro
                </SheetTitle>
                <span className="font-body-md text-body-md text-on-surface-variant">
                  Gérer mon salon
                </span>
              </div>
            </div>
            <Button
              aria-label="Fermer"
              variant="ghost"
              size="icon"
              className="text-on-surface-variant rounded-full"
              onClick={() => setIsDrawerOpen(false)}
            >
              <X className="size-5" />
            </Button>
          </SheetHeader>
          <div className="flex grow flex-col gap-2">
            {drawerLinks.map((link) => (
              <a
                key={link.label}
                href="#"
                className={
                  link.active
                    ? "bg-secondary-container text-on-secondary-container flex items-center gap-4 rounded-lg px-4 py-3 font-bold transition-opacity active:opacity-80"
                    : "text-on-surface-variant hover:bg-surface-container-highest flex items-center gap-4 rounded-lg px-4 py-3 transition-colors active:opacity-80"
                }
              >
                <link.icon className="size-5" />
                <span className="font-body-md text-body-md">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content Canvas */}
      <main className="gap-section-gap px-container-margin py-section-gap flex grow flex-col pb-32">
        {/* Header & Date */}
        <section>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-1">
            Aujourd&apos;hui
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Jeudi 24 Octobre
          </p>
        </section>

        {/* Summary Metric Cards (Bento style) */}
        <section className="gap-gutter grid grid-cols-2">
          <Card className="group relative gap-2 overflow-hidden p-4">
            <div className="bg-primary/10 group-hover:bg-primary/20 absolute -top-4 -right-4 h-16 w-16 rounded-full blur-xl transition-all" />
            <CalendarCheck className="text-primary size-6" />
            <div>
              <p className="font-display-lg text-display-lg text-on-surface">
                12
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1 tracking-wider uppercase">
                Rendez-vous
              </p>
            </div>
          </Card>
          <Card className="group relative gap-2 overflow-hidden p-4">
            <div className="bg-tertiary-container/10 group-hover:bg-tertiary-container/20 absolute -top-4 -right-4 h-16 w-16 rounded-full blur-xl transition-all" />
            <Banknote className="text-secondary size-6" />
            <div>
              <p className="font-display-lg text-display-lg text-on-surface">
                340
                <span className="font-headline-md text-headline-md text-on-surface-variant ml-1">
                  DT
                </span>
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1 tracking-wider uppercase">
                Revenus Est.
              </p>
            </div>
          </Card>
        </section>

        {/* Quick Actions */}
        <section className="hide-scrollbar -mx-container-margin gap-gutter px-container-margin flex overflow-x-auto pb-2">
          <Button className="h-auto shrink-0 gap-2 rounded-full px-6 py-3 font-bold whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
            <Calendar className="size-[18px]" />
            <span className="font-label-md text-label-md">
              Gérer mon planning
            </span>
          </Button>
          <Button
            variant="outline"
            className="border-outline h-auto shrink-0 gap-2 rounded-full px-6 py-3 whitespace-nowrap"
          >
            <ScissorsLineDashed className="size-[18px]" />
            <span className="font-label-md text-label-md">Mes services</span>
          </Button>
        </section>

        {/* Upcoming Appointments */}
        <section className="gap-stack-md flex flex-col">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
            À venir
          </h3>
          {appointments.map((appointment) => (
            <Card
              key={appointment.time + appointment.client}
              className={
                appointment.past
                  ? "relative flex-row items-center gap-4 overflow-hidden p-4 opacity-70"
                  : "relative flex-row items-center gap-4 overflow-hidden bg-surface-container-high p-4 transition-transform active:scale-[0.98]"
              }
            >
              <div
                className={`absolute top-0 bottom-0 left-0 w-1.5 ${appointment.past ? "bg-outline-variant" : "bg-primary"}`}
              />
              <div className="border-surface-container-highest flex min-w-15 flex-col items-center justify-center border-r pr-4">
                <span
                  className={`font-headline-md text-headline-md ${appointment.past ? "text-on-surface-variant line-through" : "text-on-surface"}`}
                >
                  {appointment.time}
                </span>
                {appointment.duration && (
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {appointment.duration}
                  </span>
                )}
              </div>
              <div className="flex grow flex-col justify-center">
                <p
                  className={`font-body-lg text-body-lg font-medium ${appointment.past ? "text-on-surface-variant" : "text-on-surface"}`}
                >
                  {appointment.client}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  <Badge
                    variant={appointment.past ? "secondary" : "default"}
                    className={
                      appointment.past
                        ? "bg-surface-variant text-on-surface-variant rounded-sm"
                        : "bg-primary/10 text-primary rounded-sm"
                    }
                  >
                    {appointment.service}
                  </Badge>
                </div>
              </div>
              {!appointment.past && (
                <Button
                  variant="outline"
                  size="icon"
                  className="border-surface-container-highest bg-surface text-on-surface-variant hover:text-primary size-10 rounded-full"
                >
                  <ChevronRight className="size-5" />
                </Button>
              )}
            </Card>
          ))}
        </section>

        {/* Plans (Abonnements) Section */}
        <Card className="border-surface-container bg-surface-container-low relative mt-4 overflow-hidden rounded-xl border p-6">
          <div className="bg-primary/5 pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full blur-2xl" />
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                <BadgeCheck className="text-primary size-5" />
                Plan Actuel
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Vous êtes sur le plan Basic.
              </p>
            </div>
            <Badge
              variant="secondary"
              className="bg-surface-variant text-on-surface rounded-full uppercase"
            >
              Basic
            </Badge>
          </div>
          <div className="border-primary/20 bg-surface-container-high rounded-lg border p-5">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-headline-md text-headline-md text-primary">
                Pro Plan
              </h4>
              <span className="font-headline-md text-headline-md text-on-surface">
                49
                <span className="font-body-md text-body-md text-on-surface-variant">
                  DT/mo
                </span>
              </span>
            </div>
            <ul className="mb-6 flex flex-col gap-3">
              {planFeatures.map((feature) => (
                <li
                  key={feature}
                  className="font-body-md text-body-md text-on-surface flex items-center gap-3"
                >
                  <CheckCircle2 className="text-primary size-5" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="font-label-md text-label-md h-auto w-full rounded-lg py-3 font-bold shadow-sm">
              Passer au plan Pro
            </Button>
          </div>
        </Card>
      </main>

      {/* BottomNavBar */}
      <nav className="bg-surface-container fixed bottom-0 z-50 w-full rounded-t-xl shadow-[0_-4px_12px_rgba(0,0,0,0.5)] md:hidden">
        <div className="pb-safe flex h-20 items-center justify-around px-4">
          {bottomNavItems.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                className={
                  item.active
                    ? "bg-primary-container text-on-primary-container hover:text-primary flex flex-col items-center justify-center rounded-full px-4 py-1 transition-all duration-200 active:translate-y-0.5"
                    : "text-on-surface-variant hover:text-primary flex flex-col items-center justify-center transition-all duration-200 active:translate-y-0.5"
                }
              >
                <item.icon className="size-5" />
                <span className="font-label-sm text-label-sm mt-1">
                  {item.label}
                </span>
              </Link>
            ) : (
              <button
                key={item.label}
                disabled
                aria-disabled="true"
                title="Bientôt disponible"
                className="text-on-surface-variant flex flex-col items-center justify-center opacity-40"
              >
                <item.icon className="size-5" />
                <span className="font-label-sm text-label-sm mt-1">
                  {item.label}
                </span>
              </button>
            ),
          )}
        </div>
      </nav>
    </div>
  );
}
