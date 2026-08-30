"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, LogOut, Phone, Search, User } from "lucide-react";
import { useClerk } from "@clerk/nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { clientAccount as content, useLang } from "@/lib/tounsi";
import type { User as DbUser } from "../../../../generated/prisma";

export function AccountClient({ user }: { user: DbUser }) {
  const router = useRouter();
  const { signOut } = useClerk();
  const { lang, toggleLang } = useLang();
  const t = content[lang];

  return (
    <div className="bg-background text-on-background min-h-screen pb-24">
      <header className="bg-surface sticky top-0 z-40 w-full shadow-sm">
        <div className="px-container-margin mx-auto flex h-16 w-full max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold tracking-tighter">
              {t.title}
            </h1>
          </div>
          <button
            type="button"
            onClick={toggleLang}
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary border-outline-variant rounded-full border px-3 py-1 transition-colors"
          >
            {t.switchTo}
          </button>
        </div>
      </header>

      <main className="px-container-margin pt-stack-lg mx-auto w-full max-w-xl">
        <Card className="p-gutter gap-stack-lg mb-section-gap relative overflow-hidden rounded-2xl">
          <div className="bg-primary/10 pointer-events-none absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full blur-3xl" />
          <div className="gap-stack-md relative z-10 flex flex-col items-center">
            <Avatar className="border-primary size-24 border-2 p-1">
              <AvatarImage
                alt={user.name}
                src={user.avatarUrl ?? undefined}
              />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="font-headline-lg text-headline-lg">
                {user.name}
              </h2>
              <p className="text-on-surface-variant font-label-md mt-1">
                {t.memberSince(
                  new Date(user.createdAt).toLocaleDateString("fr-FR", {
                    month: "long",
                    year: "numeric",
                  }),
                )}
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-surface-container p-gutter mb-gutter gap-stack-md rounded-xl">
          <div className="flex items-center gap-3">
            <Phone className="text-primary size-5" />
            <div>
              <p className="text-on-surface-variant font-label-sm">
                {t.phoneLabel}
              </p>
              <p className="font-body-md text-on-surface">
                {user.phone ?? t.noPhone}
              </p>
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
      </main>

      <nav className="bg-surface-container text-primary fixed bottom-0 z-50 w-full rounded-t-xl shadow-[0_-4px_12px_rgba(0,0,0,0.5)] md:hidden">
        <div className="pb-safe flex h-20 items-center justify-around px-4">
          <Link
            href="/search"
            className="text-on-surface-variant hover:text-primary flex w-16 flex-col items-center justify-center transition-all duration-200 active:translate-y-0.5"
          >
            <Search className="mb-1 size-5" />
            <span className="font-label-sm text-label-sm">{t.navExplore}</span>
          </Link>
          <Link
            href="/appointments"
            className="text-on-surface-variant hover:text-primary flex w-16 flex-col items-center justify-center transition-all duration-200 active:translate-y-0.5"
          >
            <Calendar className="mb-1 size-5" />
            <span className="font-label-sm text-label-sm">
              {t.navBookings}
            </span>
          </Link>
          <Link
            href="/account"
            className="bg-primary-container text-on-primary-container hover:text-primary flex min-w-16 flex-col items-center justify-center rounded-full px-4 py-1 transition-all duration-200 active:translate-y-0.5"
          >
            <User className="mb-1 size-5" />
            <span className="font-label-sm text-label-sm">{t.navAccount}</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
