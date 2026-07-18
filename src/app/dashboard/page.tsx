"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const drawerLinks = [
  { label: "Tableau de bord", icon: "dashboard", active: true },
  { label: "Planning", icon: "calendar_month", active: false },
  { label: "Services", icon: "content_cut", active: false },
  { label: "Portefeuille", icon: "account_balance_wallet", active: false },
  { label: "Paramètres", icon: "settings", active: false },
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
  { label: "Accueil", icon: "home", active: true, href: "/dashboard" },
  { label: "Explorer", icon: "search", active: false, href: null },
  { label: "Rendez-vous", icon: "event_upcoming", active: false, href: null },
  { label: "Compte", icon: "person", active: false, href: null },
];

export default function TableauDeBordBarberPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  return (
    <div className="bg-background text-on-background flex min-h-screen flex-col antialiased">
      {/* TopAppBar */}
      <header className="bg-surface sticky top-0 z-40 w-full shadow-sm">
        <div className="px-container-margin mx-auto flex h-16 w-full max-w-7xl items-center justify-between">
          <button
            aria-label="Menu"
            className="text-primary hover:bg-surface-container-high -ml-2 rounded-full p-2 transition-colors duration-150 active:scale-95 md:hidden"
            onClick={() => setIsDrawerOpen(true)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
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
          <div className="border-surface-container-highest hover:bg-surface-container-high h-10 w-10 cursor-pointer overflow-hidden rounded-full border-2 transition-colors duration-150 active:scale-95">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Portrait du barbier, tablier sombre sur chemise blanche, salon premium."
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0IfJqvnu0uuU9uh_dSAlic4-4ettsGx-FFX297uSF2b7dXURycZ7tmDofuORwSHJ1FlJwiRY86bOqcapvdDxzXDc9TcRnw3fhhCNFKPM1rL9bdBdUjBww9pXU3YiDseEa0KHKialRJ_wuLCrE5lOSegWRxyq6otdx_oJVh_AuCYpJ-v2fPkwU0BcAENVgrfe7xJ3YCpU6l6DdkJFAJRBTZwqVG1zlCnHhVhj4-0nRhSMEjswZ1Erocp0pOMnXIwgVJ6L6rpOV3CsK"
            />
          </div>
        </div>
      </header>

      {/* NavigationDrawer */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />
      <nav
        className={`gap-base bg-surface-container-low p-gutter fixed top-0 left-0 z-50 flex h-full w-80 flex-col shadow-lg transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mt-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="border-primary h-14 w-14 overflow-hidden rounded-full border-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Portrait du barbier, tablier sombre sur chemise blanche, salon premium."
                className="h-full w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA60nN-tCZtXUWC1fJ_-noOtwJtnz5L9DWzT4_EnCCBIF1UlXJE0wvnYivHqyNjNUIdYhR0rlEOWbbGGnUPxhNFuiK1Lq_b9Yat_rL_yIy1wRL_VQu_AcbT-1482peEJUGYYIPpuvs8h_F7DeG2jZIRuhWsJOO3dpJIdX72Kg7E6sLbfAyxG_AIZDVcziJkyftvQa_bxRBiFui8xdNpeb0KzU9Kl-nbhEzk7X_IZ8kXJ5yBwMGLkPP9pDB_42O8uR5cLBcMZYLdrPzC"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-headline-md text-headline-md text-primary">
                Hajjem Pro
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant">
                Gérer mon salon
              </span>
            </div>
          </div>
          <button
            aria-label="Fermer"
            className="text-on-surface-variant hover:bg-surface-container-highest rounded-full p-2 transition-colors"
            onClick={() => setIsDrawerOpen(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="flex flex-grow flex-col gap-2">
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
              <span
                className="material-symbols-outlined"
                style={
                  link.active
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                {link.icon}
              </span>
              <span className="font-body-md text-body-md">{link.label}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="gap-section-gap px-container-margin py-section-gap flex flex-grow flex-col pb-32">
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
          <div className="group bg-surface-container relative flex flex-col gap-2 overflow-hidden rounded-xl p-4">
            <div className="bg-primary/10 group-hover:bg-primary/20 absolute -top-4 -right-4 h-16 w-16 rounded-full blur-xl transition-all" />
            <span className="material-symbols-outlined text-primary">
              event_available
            </span>
            <div>
              <p className="font-display-lg text-display-lg text-on-surface">
                12
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant mt-1 tracking-wider uppercase">
                Rendez-vous
              </p>
            </div>
          </div>
          <div className="group bg-surface-container relative flex flex-col gap-2 overflow-hidden rounded-xl p-4">
            <div className="bg-tertiary-container/10 group-hover:bg-tertiary-container/20 absolute -top-4 -right-4 h-16 w-16 rounded-full blur-xl transition-all" />
            <span className="material-symbols-outlined text-secondary">
              payments
            </span>
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
          </div>
        </section>

        {/* Quick Actions */}
        <section className="hide-scrollbar -mx-container-margin gap-gutter px-container-margin flex overflow-x-auto pb-2">
          <button className="bg-primary text-on-primary hover:bg-primary-fixed flex flex-shrink-0 items-center gap-2 rounded-full px-6 py-3 font-bold whitespace-nowrap shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-colors active:scale-95">
            <span className="material-symbols-outlined text-[18px]">
              calendar_month
            </span>
            <span className="font-label-md text-label-md">
              Gérer mon planning
            </span>
          </button>
          <button className="border-outline text-on-surface hover:bg-surface-container-high flex flex-shrink-0 items-center gap-2 rounded-full border px-6 py-3 whitespace-nowrap transition-colors active:scale-95">
            <span className="material-symbols-outlined text-[18px]">
              content_cut
            </span>
            <span className="font-label-md text-label-md">Mes services</span>
          </button>
        </section>

        {/* Upcoming Appointments (Surface 1 Cards) */}
        <section className="gap-stack-md flex flex-col">
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
            À venir
          </h3>
          {appointments.map((appointment) => (
            <div
              key={appointment.time + appointment.client}
              className={
                appointment.past
                  ? "bg-surface-container relative flex items-center gap-4 overflow-hidden rounded-xl p-4 opacity-70"
                  : "bg-surface-container-high relative flex items-center gap-4 overflow-hidden rounded-xl p-4 transition-transform active:scale-[0.98]"
              }
            >
              <div
                className={`absolute top-0 bottom-0 left-0 w-1.5 ${appointment.past ? "bg-outline-variant" : "bg-primary"}`}
              />
              <div className="border-surface-container-highest flex min-w-[60px] flex-col items-center justify-center border-r pr-4">
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
              <div className="flex flex-grow flex-col justify-center">
                <p
                  className={`font-body-lg text-body-lg font-medium ${appointment.past ? "text-on-surface-variant" : "text-on-surface"}`}
                >
                  {appointment.client}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  <span
                    className={
                      appointment.past
                        ? "font-label-sm text-label-sm bg-surface-variant text-on-surface-variant rounded-sm px-2 py-0.5"
                        : "font-label-sm text-label-sm bg-primary/10 text-primary rounded-sm px-2 py-0.5"
                    }
                  >
                    {appointment.service}
                  </span>
                </div>
              </div>
              {!appointment.past && (
                <button className="border-surface-container-highest bg-surface text-on-surface-variant hover:text-primary flex h-10 w-10 items-center justify-center rounded-full border transition-colors">
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Plans (Abonnements) Section */}
        <section className="border-surface-container bg-surface-container-low relative mt-4 overflow-hidden rounded-xl border p-6">
          <div className="bg-primary/5 pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full blur-2xl" />
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  workspace_premium
                </span>
                Plan Actuel
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Vous êtes sur le plan Basic.
              </p>
            </div>
            <span className="font-label-sm text-label-sm bg-surface-variant text-on-surface rounded-full px-3 py-1 uppercase">
              Basic
            </span>
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
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    check_circle
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="font-label-md text-label-md bg-primary text-on-primary hover:bg-primary-fixed w-full rounded-lg py-3 font-bold shadow-sm transition-colors active:scale-95">
              Passer au plan Pro
            </button>
          </div>
        </section>
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
                <span
                  className="material-symbols-outlined"
                  style={
                    item.active
                      ? { fontVariationSettings: "'FILL' 1" }
                      : undefined
                  }
                >
                  {item.icon}
                </span>
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
                <span className="material-symbols-outlined">{item.icon}</span>
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
