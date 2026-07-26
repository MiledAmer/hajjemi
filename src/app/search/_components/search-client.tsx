"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Calendar,
  Home,
  MapPin,
  Navigation,
  Search,
  Store,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GOVERNORATE_LABELS } from "@/lib/governorate";
import { search as content, useLang } from "@/lib/tounsi";
import type {
  BarberProfile,
  Governorate,
  User as DbUser,
} from "../../../../generated/prisma";

const QUICK_GOVERNORATES: Governorate[] = ["TUNIS", "SOUSSE", "SFAX"];

type Barber = BarberProfile & { user: DbUser };

function BarberCard({
  barber,
  viewProfileLabel,
}: {
  barber: Barber;
  viewProfileLabel: string;
}) {
  return (
    <Card className="gap-0 overflow-hidden border-surface-container-high bg-[#1C1C1E] p-0 shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-transform active:scale-[0.98]">
      <div className="relative h-40 w-full">
        {barber.coverImageUrl ?? barber.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="h-full w-full object-cover"
            alt={barber.businessName}
            src={barber.coverImageUrl ?? barber.avatarUrl ?? undefined}
          />
        ) : (
          <div className="bg-surface-container-low flex h-full w-full items-center justify-center">
            <Store className="text-surface-container-highest size-12" />
          </div>
        )}
        {barber.planType === "PRO" && (
          <div className="border-outline-variant/50 bg-surface/80 absolute top-3 right-3 rounded-md border px-2 py-1 backdrop-blur-sm">
            <span className="font-label-sm text-label-sm text-primary">
              PRO
            </span>
          </div>
        )}
      </div>
      <div className="gap-stack-md p-gutter flex flex-col">
        <div>
          <h3 className="font-headline-md text-headline-md text-on-surface leading-tight">
            {barber.businessName}
          </h3>
          <p className="font-label-md text-label-md text-on-surface-variant mt-1 flex items-center gap-1">
            <Navigation className="size-4" />
            {barber.address
              ? `${barber.address} • ${GOVERNORATE_LABELS[barber.governorate]}`
              : GOVERNORATE_LABELS[barber.governorate]}
          </p>
        </div>
        {barber.bio && (
          <p className="font-body-md text-label-sm text-on-surface-variant line-clamp-2">
            {barber.bio}
          </p>
        )}
        <Link
          href={`/barber/${barber.id}`}
          className="font-label-md text-label-md bg-primary hover:bg-primary-fixed mt-2 block w-full rounded-lg py-3 text-center font-bold text-[#121212] shadow-[0_4px_12px_rgba(212,175,55,0.2)] transition-colors"
        >
          {viewProfileLabel}
        </Link>
      </div>
    </Card>
  );
}

export function SearchClient({
  barbers,
  q,
  governorate,
}: {
  barbers: Barber[];
  q: string;
  governorate: Governorate | undefined;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [queryInput, setQueryInput] = useState(q);
  const { lang, toggleLang } = useLang();
  const t = content[lang];
  const navLinks = [
    { label: t.navAccueil, href: "/", icon: Home },
    { label: t.navSearch, href: "/search", icon: Search },
    { label: t.navPlans, href: "/plans", icon: Store },
  ];

  function pushParams(next: { q?: string; gov?: string }) {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  // Debounced search-as-you-type, mirroring the URL so results stay
  // bookmarkable/shareable and the list is server-rendered.
  useEffect(() => {
    const handle = setTimeout(() => {
      if (queryInput !== q) pushParams({ q: queryInput });
    }, 300);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryInput]);

  function toggleGovernorate(gov: Governorate) {
    pushParams({ gov: governorate === gov ? undefined : gov });
  }

  return (
    <div className="bg-surface font-body-lg text-on-surface min-h-screen pb-24">
      {/* TopAppBar */}
      <header className="bg-surface sticky top-0 z-40 w-full shadow-sm">
        <div className="px-container-margin mx-auto flex h-16 w-full max-w-7xl items-center justify-between">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold tracking-tighter md:hidden">
            HAJJEM
          </h1>
          <div className="gap-stack-lg hidden items-center md:flex">
            <Link
              href="/"
              className="font-headline-md text-headline-md text-primary font-bold tracking-tighter"
            >
              HAJJEM
            </Link>
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
          <Avatar className="border-outline-variant bg-surface-container-high size-10 shrink-0 cursor-pointer border transition-opacity hover:opacity-80">
            <AvatarImage
              alt={t.avatarAlt}
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnsSXzu2i44E7vz6WoQBEjfmBXUf6HtCnlYAt1oW6buiuRYStu_8PluM1ytGZwzCQ6_5YKe4l2jXPfWgjdPOyPP5HJWGlv4jU7rVW82-0XZWpZ-hdJO9ewrUuwH4smLu0zHCmrPrY30zZQdXnraEkGOyIAoIkIRJSXFLnrDLOyYe8gvXejYLab6GdVL6AOgYc1p9wUYpe6Uljo-tFThiC8JCsooIxDBRSlFQVtmnKP8-B1r9sfzIEv3a6vXtnln5YszcPWSm3v98F_"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="gap-stack-lg px-container-margin pt-stack-md flex flex-col">
        {/* Search Bar */}
        <section className="w-full">
          <div className="group relative w-full">
            <Search className="text-on-surface-variant absolute top-1/2 left-4 z-10 size-5 -translate-y-1/2" />
            <Input
              type="text"
              value={queryInput}
              onChange={(event) => setQueryInput(event.target.value)}
              placeholder={t.searchPlaceholder}
              className="font-body-md border-outline-variant bg-surface-container-high text-on-surface placeholder:text-on-surface-variant focus-visible:border-primary focus-visible:ring-primary h-auto w-full rounded-full py-4 pr-4 pl-12 shadow-[0_4px_12px_rgba(0,0,0,0.2)]"
            />
          </div>
        </section>

        {/* Quick Filters */}
        <section className="hide-scrollbar -mx-container-margin px-container-margin w-full overflow-x-auto">
          <div className="gap-stack-sm flex min-w-max items-center pb-2">
            {QUICK_GOVERNORATES.map((gov) => (
              <Button
                key={gov}
                variant="outline"
                onClick={() => toggleGovernorate(gov)}
                className={
                  governorate === gov
                    ? "font-label-md text-label-md bg-primary-container/20 border-primary text-primary h-auto gap-1 rounded-full px-4 py-2 whitespace-nowrap shadow-[0_2px_8px_rgba(212,175,55,0.15)]"
                    : "font-label-md text-label-md border-outline-variant bg-surface-container-high text-on-surface-variant hover:bg-surface-variant h-auto rounded-full px-4 py-2 whitespace-nowrap"
                }
              >
                <MapPin className="size-4.5" />
                {GOVERNORATE_LABELS[gov]}
              </Button>
            ))}
          </div>
        </section>

        {/* Results Header */}
        <div className="mt-stack-sm flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            {governorate
              ? t.resultsTitleIn(GOVERNORATE_LABELS[governorate])
              : t.resultsTitleNear}
          </h2>
          <span className="font-label-md text-label-md text-on-surface-variant">
            {t.resultsCount(barbers.length)}
          </span>
        </div>

        {/* Barber Cards Grid */}
        {barbers.length > 0 ? (
          <section className="gap-gutter grid grid-cols-1 md:grid-cols-2">
            {barbers.map((barber) => (
              <BarberCard
                key={barber.id}
                barber={barber}
                viewProfileLabel={t.viewProfile}
              />
            ))}
          </section>
        ) : (
          <p className="text-on-surface-variant font-body-md py-stack-lg text-center">
            {t.noResults}
          </p>
        )}
      </main>

      {/* BottomNavBar (Mobile Only) */}
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
            className="bg-primary-container text-on-primary-container hover:text-primary flex min-w-16 flex-col items-center justify-center rounded-full px-4 py-1 transition-all duration-200 active:translate-y-0.5"
          >
            <Search className="mb-1 size-5" />
            <span className="font-label-sm text-label-sm">{t.navExplore}</span>
          </Link>
          <button
            disabled
            aria-disabled="true"
            title={t.comingSoon}
            className="text-on-surface-variant flex w-16 flex-col items-center justify-center opacity-40"
          >
            <Calendar className="mb-1 size-5" />
            <span className="font-label-sm text-label-sm">
              {t.navBookings}
            </span>
          </button>
          <button
            disabled
            aria-disabled="true"
            title={t.comingSoon}
            className="text-on-surface-variant flex w-16 flex-col items-center justify-center opacity-40"
          >
            <User className="mb-1 size-5" />
            <span className="font-label-sm text-label-sm">{t.navAccount}</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
