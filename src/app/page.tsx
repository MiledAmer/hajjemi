"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Scissors,
  Search,
  Star,
  Store,
} from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type Lang = "fr" | "tn";

const content = {
  fr: {
    switchTo: "TN",
    connexion: "Connexion",
    badge: "Réservation instantanée",
    headlineMobile: "L'Élite du Grooming.",
    headlineDesktop1: "L'Élite du ",
    headlineDesktop2: "Grooming.",
    subtitle:
      "Réservez votre coupe en un clic. Précision, style et excellence à portée de main.",
    subtitleAccent: "احجز موعدك الآن",
    ctaClientTitle: "Trouver un coiffeur",
    ctaClientSub: "Pour les clients",
    ctaProTitle: "Espace Barber",
    ctaProSub: "Pour les professionnels",
    trustCount: "+2000 clients",
    trustSub: "réservent déjà via Hajjem",
    guest: "Explorer en invité",
    ratingSub: "+2000 avis clients",
    howTitle: "Réserver n'a jamais été aussi simple",
    howSub:
      "Trois étapes pour votre prochaine coupe, où que vous soyez en Tunisie.",
    steps: [
      {
        icon: Search,
        title: "Trouvez",
        text: "Explorez les meilleurs barbiers près de chez vous, filtrés par ville et service.",
      },
      {
        icon: Calendar,
        title: "Réservez",
        text: "Choisissez un créneau disponible et confirmez votre rendez-vous en un clic.",
      },
      {
        icon: Scissors,
        title: "Profitez",
        text: "Présentez-vous à l'heure et profitez d'un service haut de gamme, sans attente.",
      },
    ],
    copyright: "© 2026 Hajjem. L'élite du grooming en Tunisie.",
  },
  tn: {
    switchTo: "FR",
    connexion: "Dkhol",
    badge: "Rzervation",
    headlineMobile: "L'Elite mta3 Grooming.",
    headlineDesktop1: "L'Elite mta3 ",
    headlineDesktop2: "Grooming.",
    subtitle:
      "Rzervi hjemtek b click wa7ed. Thi9a, style w excellence been yeddek.",
    subtitleAccent: "A7jez maw3dek tawa",
    ctaClientTitle: "Lawaj coiffeur",
    ctaClientSub: "Lel clients",
    ctaProTitle: "Espace Barber",
    ctaProSub: "Lel professionnels",
    trustCount: "+2000 client",
    trustSub: "rzerviw  Hajjem",
    guest: "Chouf men 8ir ma tsajjel",
    ratingSub: "+2000 avis mta3 clients",
    howTitle: "Rzervi hjjemtek 3ad sahla",
    howSub: "Thlatha khatawet lel hjjama lijeya mte3ek, win ma tkoun fi Tounes.",
    steps: [
      {
        icon: Search,
        title: "Lawej",
        text: "Chouf ahsen hajjem 9rib menek, filtration b belled w service.",
      },
      {
        icon: Calendar,
        title: "Rzervi",
        text: "Ekhtar wa9t disponible w confirmi maw3dek b click wa7ed.",
      },
      {
        icon: Scissors,
        title: "Tmatta3",
        text: "Ejri fel wa9t w tmatta3 b service top, bla ma testenna.",
      },
    ],
    copyright: "© 2026 Hajjem. L'elite mta3 grooming fi Tounes.",
  },
} as const satisfies Record<Lang, unknown>;

const trustAvatars = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDTWDCkUKtW-7MxWuiE-b6tyOHlSB9EQ9XqoSQ7XMY1jbHUhbOUhYVu5X_SiWUVTEicg9T67UTvToJki7KKVEMWP8ZvAPBx3Grq_3xL2L8lZ4H1HkAszeI9pL6esdohlFQ5yqZXrtOMA8dBISwKrVhtlfoHN3z8q-honH_D79yPL8zulU1BZ8XevZ15NSS0lqkybu-7T49Hz7IUp1pknvb8N_LmgICAZRa-Z6vwCLL3kbHmHjaJSmYh16zoudZtulaCeFW6ZsboddpD",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDesfnmPXOCocgm8rd-lzrDR1aj5wy3JjlWPMyKU3c8D048g0vC4r903I2oRkMkfSpDDxnpVJsAmyFmBG0BatC06hzTY_8Qqmbx9ZedVWcvOgSzieT1pxyPfJ8DHAv9V3--VJ8-HayiqwV7-C3cQTfV2StevxfbqjtBlgkurZbbmM1h8lp1JfK1bP7CmsY9N8x2NICs7iWcw6Ufc1JrbwQKqiPIsur_IUh_k4YOnULgYdoxniEEnMk374l_YVMVlOAB0LyYtCy8lEHJ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDq1jreOXR32SR86t5E9RvYHDwy3sjRwfcJ_6jLlKerJhJoDD2WJ9F_BcF_6p9zldW-BJXAVgzcxIjwSPLmwx2YMk6MuCtsuJeu4aTWs37bzLYAngVCUtrTltANtSDBZlQMHmAu-KQidt1fM0bPsm1Jc3GnzhJVoeKjflmyf4JCYR-o9mjj0ZwvKMU9vbM1tcTnx_NNdE2_9q8z7ns-laV8oPNNmGE8xTze0SFXnkz6V-EHhZRz-jU7drv2bPdynTstHSC-0CdkRCr7",
];

export default function HomePage() {
  const [lang, setLang] = useState<Lang>("fr");
  const t = content[lang];

  const langSwitch = (
    <button
      type="button"
      onClick={() => setLang(lang === "fr" ? "tn" : "fr")}
      className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary border-outline-variant rounded-full border px-3 py-1 transition-colors"
    >
      {t.switchTo}
    </button>
  );

  return (
    <div className="bg-background min-h-screen">
      {/* Desktop Nav */}
      <header className="bg-surface/80 sticky top-0 z-50 hidden w-full shadow-sm backdrop-blur-md md:block">
        <div className="px-container-margin mx-auto flex h-16 w-full max-w-7xl items-center justify-between">
          <span className="font-display-lg text-display-lg text-primary tracking-tighter uppercase">
            HAJJEM
          </span>
          <div className="gap-stack-lg flex items-center">
            <Link
              className="font-label-md text-label-md text-on-surface hover:text-primary font-semibold transition-colors"
              href="/connexion"
            >
              {t.connexion}
            </Link>
            {langSwitch}
          </div>
        </div>
      </header>

      <main className="md:px-container-margin relative flex min-h-221 w-full flex-1 flex-col md:mx-auto md:min-h-0 md:max-w-7xl md:flex-row md:items-center md:gap-12 md:py-16">
        {/* Hero Image Background */}
        <div className="absolute inset-0 z-0 h-143.5 w-full md:static md:h-150 md:w-1/2">
          {/* Decorative glow (desktop only) */}
          <div className="bg-primary/10 absolute -top-10 -right-10 hidden h-64 w-64 rounded-full blur-3xl md:block" />
          <div className="bg-secondary/10 absolute -bottom-10 -left-10 hidden h-40 w-40 rounded-full blur-2xl md:block" />

          <div className="relative h-full w-full md:overflow-hidden md:rounded-2xl md:shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-full w-full object-cover object-top opacity-70 md:opacity-100"
              alt="Un barbier professionnel taillant la barbe d'un client dans un salon de coiffure haut de gamme, ambiance sombre et dorée."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFiWM3UcL9KsuUkIFZXAr3-2318lC9Eh357Z3n-qOrBXXNf1LX5Ef67C1t4tPL_6qqaTmeWxRIblUdYY-HaDcvugCUcTHnuS80EeupunQDzLFzvJ4l8JYo_wNUGeyFA7lbLR6mmM60urJsvxVhxAhYUZXndRMlU-SWrrWOatj7F3_fj9N5i1KRookrIKRdeMsKpgme822_da1ea-4ZljSK-_RKHPfbIn0uoqIXkQ2h73iCBxzPj0bOHGdbiNW4q2skodzVK-y5PKVj"
            />
            <div className="hero-gradient absolute inset-0 md:hidden" />
          </div>

          {/* Floating rating card (desktop only) */}
          <Card className="border-surface-variant bg-surface-container-high absolute -bottom-6 -left-6 z-10 hidden flex-row items-center gap-3 rounded-xl border px-5 py-4 shadow-2xl md:flex">
            <Star className="text-primary size-7 fill-current" />
            <div>
              <p className="font-headline-md text-headline-md text-on-surface">
                4.9/5
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                {t.ratingSub}
              </p>
            </div>
          </Card>
        </div>

        {/* Top Navigation / Brand (Mobile Only Overlay) */}
        <header className="px-container-margin relative z-10 flex w-full items-center justify-between pt-8 pb-4 md:hidden">
          <span className="w-14" />
          <h1 className="font-display-lg text-display-lg text-primary tracking-tighter uppercase">
            HAJJEM
          </h1>
          {langSwitch}
        </header>

        {/* Content Container */}
        <div className="px-container-margin relative z-10 mt-auto mb-8 flex flex-1 flex-col justify-end md:mt-0 md:mb-0 md:w-1/2 md:justify-center md:px-0">
          {/* Badge (desktop only) */}
          <Badge
            variant="outline"
            className="border-primary/30 bg-primary-container/10 mb-stack-md hidden w-fit gap-2 rounded-full px-3 py-1.5 backdrop-blur-sm md:inline-flex"
          >
            <span className="bg-primary h-2 w-2 animate-pulse rounded-full" />
            <span className="font-label-sm text-label-sm text-primary tracking-wider uppercase">
              {t.badge}
            </span>
          </Badge>

          <div className="mb-section-gap text-center md:text-left">
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile mb-stack-sm text-on-surface md:mb-stack-md md:max-w-lg md:text-[56px] md:leading-[1.1] md:font-extrabold md:tracking-tight">
              <span className="md:hidden">{t.headlineMobile}</span>
              <span className="hidden md:inline">{t.headlineDesktop1}</span>
              <span className="from-primary to-primary-fixed-dim hidden bg-linear-to-r bg-clip-text text-transparent md:inline">
                {t.headlineDesktop2}
              </span>
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mx-auto max-w-xs md:mx-0 md:max-w-md md:text-lg">
              {t.subtitle}{" "}
              <span className="font-label-md text-label-md text-primary-container mt-1 block">
                {t.subtitleAccent}
              </span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="gap-stack-md flex w-full flex-col md:max-w-md">
            {/* Client Action */}
            <Link
              href="/search"
              className="group bg-primary-container text-on-primary-container relative flex w-full items-center justify-between overflow-hidden rounded-xl px-6 py-4 shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all active:scale-95 md:hover:-translate-y-0.5 md:hover:shadow-[0_8px_24px_rgba(212,175,55,0.35)]"
            >
              <div className="relative z-10 flex items-center gap-3">
                <Scissors className="text-on-primary-container size-5" />
                <div className="flex flex-col text-left">
                  <span className="font-label-md text-label-md font-bold tracking-wider uppercase">
                    {t.ctaClientTitle}
                  </span>
                  <span className="font-label-sm text-label-sm opacity-80">
                    {t.ctaClientSub}
                  </span>
                </div>
              </div>
              <ArrowRight className="relative z-10 size-5 transform transition-transform group-active:translate-x-1" />
              <div className="absolute inset-0 bg-black opacity-0 transition-opacity group-active:opacity-10" />
            </Link>

            {/* Professional Action */}
            <Link
              href="/plans"
              className="group border-outline-variant bg-surface-container text-on-surface active:bg-surface-container-high md:hover:border-primary/50 flex w-full items-center justify-between rounded-xl border px-6 py-4 transition-all active:scale-95 md:hover:-translate-y-0.5 md:hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <Store className="text-primary size-5" />
                <div className="flex flex-col text-left">
                  <span className="font-label-md text-label-md text-primary font-bold tracking-wider uppercase">
                    {t.ctaProTitle}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {t.ctaProSub}
                  </span>
                </div>
              </div>
              <ArrowRight className="text-primary size-5 transform transition-transform group-active:translate-x-1" />
            </Link>
          </div>

          {/* Trust row (desktop only) */}
          <div className="border-surface-container-highest/50 mt-10 hidden max-w-md items-center gap-4 border-t pt-6 md:flex">
            <div className="flex -space-x-3">
              {trustAvatars.map((src) => (
                <Avatar
                  key={src}
                  className="border-background size-10 border-2 grayscale"
                >
                  <AvatarImage alt="Client satisfait de Hajjem" src={src} />
                </Avatar>
              ))}
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface font-bold">
                {t.trustCount}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-normal">
                {t.trustSub}
              </span>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-8 flex justify-center gap-6 text-center md:hidden">
            <Link
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
              href="/connexion"
            >
              {t.connexion}
            </Link>
            <span className="text-surface-variant">•</span>
            <a
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              {t.guest}
            </a>
          </div>
        </div>
      </main>

      {/* How it works (desktop only) */}
      <section className="border-surface-container-high bg-surface-container-lowest hidden border-t py-20 md:block">
        <div className="px-container-margin mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-3 font-bold">
              {t.howTitle}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {t.howSub}
            </p>
          </div>
          <div className="gap-gutter grid grid-cols-3">
            {t.steps.map((step) => (
              <Card
                key={step.title}
                className="border-surface-container-high bg-surface relative gap-4 rounded-2xl border p-8 transition-all hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
              >
                <div className="bg-primary-container/20 flex h-12 w-12 items-center justify-center rounded-xl">
                  <step.icon className="text-primary size-6" />
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                  {step.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {step.text}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer (desktop only) */}
      <footer className="border-surface-container-high bg-surface hidden border-t py-8 md:block">
        <div className="px-container-margin mx-auto flex max-w-7xl items-center justify-between">
          <span className="font-headline-md text-headline-md text-on-surface font-bold tracking-tighter opacity-50">
            HAJJEM
          </span>
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            {t.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
}
