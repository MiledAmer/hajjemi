import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  CheckCircle2,
  LayoutDashboard,
  LineChart,
  Menu,
  TrendingUp,
  User,
  Users,
  X,
} from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const navLinks = ["Avantages", "Tarifs"];

const trustAvatars = [
  {
    alt: "Portrait d'un barbier professionnel à la barbe soignée, tablier sombre, éclairage studio dramatique.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTWDCkUKtW-7MxWuiE-b6tyOHlSB9EQ9XqoSQ7XMY1jbHUhbOUhYVu5X_SiWUVTEicg9T67UTvToJki7KKVEMWP8ZvAPBx3Grq_3xL2L8lZ4H1HkAszeI9pL6esdohlFQ5yqZXrtOMA8dBISwKrVhtlfoHN3z8q-honH_D79yPL8zulU1BZ8XevZ15NSS0lqkybu-7T49Hz7IUp1pknvb8N_LmgICAZRa-Z6vwCLL3kbHmHjaJSmYh16zoudZtulaCeFW6ZsboddpD",
  },
  {
    alt: "Portrait d'un maître barbier dans un salon haut de gamme, ciseaux premium en main.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDesfnmPXOCocgm8rd-lzrDR1aj5wy3JjlWPMyKU3c8D048g0vC4r903I2oRkMkfSpDDxnpVJsAmyFmBG0BatC06hzTY_8Qqmbx9ZedVWcvOgSzieT1pxyPfJ8DHAv9V3--VJ8-HayiqwV7-C3cQTfV2StevxfbqjtBlgkurZbbmM1h8lp1JfK1bP7CmsY9N8x2NICs7iWcw6Ufc1JrbwQKqiPIsur_IUh_k4YOnULgYdoxniEEnMk374l_YVMVlOAB0LyYtCy8lEHJ",
  },
  {
    alt: "Portrait d'un professionnel du grooming, mâchoire marquée, éclairage doré dramatique.",
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDq1jreOXR32SR86t5E9RvYHDwy3sjRwfcJ_6jLlKerJhJoDD2WJ9F_BcF_6p9zldW-BJXAVgzcxIjwSPLmwx2YMk6MuCtsuJeu4aTWs37bzLYAngVCUtrTltANtSDBZlQMHmAu-KQidt1fM0bPsm1Jc3GnzhJVoeKjflmyf4JCYR-o9mjj0ZwvKMU9vbM1tcTnx_NNdE2_9q8z7ns-laV8oPNNmGE8xTze0SFXnkz6V-EHhZRz-jU7drv2bPdynTstHSC-0CdkRCr7",
  },
];

const previewAppointments = [
  {
    initials: "AK",
    name: "Ahmed K.",
    service: "Coupe + Barbe",
    time: "10:00",
    duration: "45 min",
    tags: ["Premium", "Confirmé"],
    accent: true,
  },
  {
    initials: "SL",
    name: "Sami L.",
    service: "Taille Barbe",
    time: "11:00",
    duration: "20 min",
  },
  {
    initials: "MR",
    name: "Mehdi R.",
    service: "Coupe Classique",
    time: "11:30",
    faded: true,
  },
];

const basicFeatures = [
  { label: "Jusqu'à 10 rendez-vous/mois", included: true },
  { label: "Profil standard sur l'application", included: true },
  { label: "Gestion de 3 services de base", included: true },
  { label: "Statistiques avancées", included: false },
  { label: "Visibilité boostée (Top Recherche)", included: false },
];

const proFeatures = [
  { label: "Rendez-vous illimités", icon: CheckCircle2, emphasis: true },
  { label: "Profil Premium certifié", icon: CheckCircle2 },
  { label: "Catalogue de services illimité", icon: CheckCircle2 },
  {
    label: "Statistiques avancées & rapports",
    icon: LineChart,
    emphasis: true,
  },
  {
    label: "Visibilité boostée (Algorithme)",
    icon: TrendingUp,
    emphasis: true,
    accent: true,
  },
];

export default function PlansPage() {
  return (
    <div className="bg-background font-body-md text-on-background selection:bg-primary-container selection:text-on-primary-container min-h-screen overflow-x-hidden antialiased">
      {/* Navbar */}
      <header className="bg-surface/80 fixed top-0 z-50 w-full shadow-sm backdrop-blur-md transition-all duration-300">
        <div className="px-container-margin mx-auto flex h-16 w-full max-w-7xl items-center justify-between">
          <div className="gap-base flex items-center">
            <span className="font-headline-md text-headline-md text-primary font-bold tracking-tighter">
              HAJJEM
            </span>
            <span className="font-label-sm text-label-sm border-outline-variant/30 bg-surface-container text-on-surface-variant ml-2 rounded-sm border px-2 py-1 tracking-widest uppercase">
              Pro
            </span>
          </div>
          <div className="gap-stack-lg hidden items-center md:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
            <a
              href="#"
              className="font-label-md text-label-md text-on-surface hover:text-primary font-semibold transition-colors"
            >
              Se connecter
            </a>
            <Button className="font-label-md text-label-md bg-primary text-on-primary hover:bg-primary-fixed-dim h-auto rounded-lg px-6 py-2 font-bold shadow-[0_4px_12px_rgba(212,175,55,0.2)]">
              Rejoindre
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary md:hidden"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </header>

      <main className="pt-16 pb-32">
        {/* Hero Section */}
        <section className="relative flex min-h-198.75 items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <div className="from-background via-background/90 to-background/40 absolute inset-0 z-10 bg-linear-to-r" />
            <div className="from-background to-background/50 absolute inset-0 z-10 bg-linear-to-t via-transparent" />
            <div
              className="h-full w-full bg-cover bg-center bg-no-repeat opacity-40 grayscale-30"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC7sg4pEDXaVaV9wt3ByzFcXPcouzasNHEQ01z-4_i1XeyJuaNOHhopQRqm1P4P3oU4m1CiIU2fGnDm0A1njFZn9CGOMgXcsogk1mFNUbxW-BLJNp-MHRaBjCybdld-Woq_rn_YolZKALJwRCv9X-IJ1B3PGPJFdNZVmn3jiOU9B1utZAijs6Pmb1Yy8gCUJiSSb4C6Jx8ndqdu_zRqUPpaVi136q9JbzoPFDDp5VTiF-755UfQC6jl6eHj_cgDuPr_nWU_-2zo-Djw')",
              }}
            />
          </div>

          <div className="gap-section-gap px-container-margin relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 lg:grid-cols-2">
            <div className="gap-stack-lg flex flex-col pt-12 md:pt-0">
              <div className="border-primary/30 bg-primary-container/10 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-sm">
                <span className="bg-primary h-2 w-2 animate-pulse rounded-full" />
                <span className="font-label-sm text-label-sm text-primary tracking-wider uppercase">
                  Espace Professionnel
                </span>
              </div>
              <h1 className="font-display-lg text-display-lg text-on-surface font-extrabold tracking-tight md:text-[64px] md:leading-18">
                Rejoignez{" "}
                <span className="from-primary to-primary-fixed-dim bg-linear-to-r bg-clip-text text-transparent">
                  l&apos;élite du grooming
                </span>{" "}
                en Tunisie.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                Propulsez votre salon à un niveau supérieur. Gérez vos
                rendez-vous, développez votre clientèle et affirmez votre
                autorité avec la plateforme numéro un pour les barbiers premium.
              </p>
              <div className="gap-stack-md pt-stack-sm mt-4 flex flex-col sm:flex-row">
                <Button className="bg-primary text-on-primary hover:bg-primary-fixed-dim h-auto w-full gap-2 rounded-lg px-8 py-4 text-center font-bold shadow-[0_4px_12px_rgba(212,175,55,0.3)] sm:w-auto">
                  <span className="font-label-md text-label-md">
                    Créer mon compte professionnel
                  </span>
                  <ArrowRight className="size-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-outline-variant bg-surface-container text-on-surface hover:border-primary/50 hover:bg-surface-container-high h-auto w-full rounded-lg px-8 py-4 text-center font-bold sm:w-auto"
                >
                  <span className="font-label-md text-label-md">
                    Se connecter
                  </span>
                </Button>
              </div>
              <div className="border-surface-container-highest/50 mt-8 flex items-center gap-4 border-t pt-6">
                <div className="flex -space-x-3">
                  {trustAvatars.map((avatar) => (
                    <Avatar
                      key={avatar.src}
                      className="border-background size-10 border-2 grayscale"
                    >
                      <AvatarImage alt={avatar.alt} src={avatar.src} />
                    </Avatar>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface font-bold">
                    +500 Barbiers
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-normal">
                    nous font déjà confiance
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Visual / Dashboard Preview */}
            <div className="relative hidden items-center justify-center lg:flex">
              <div className="bg-primary/10 absolute -top-10 -right-10 h-64 w-64 rounded-full blur-3xl" />
              <div className="bg-secondary/10 absolute bottom-10 -left-10 h-40 w-40 rounded-full blur-2xl" />
              <div className="border-outline-variant/30 bg-surface-container-low relative w-full max-w-sm overflow-hidden rounded-[2rem] border p-2 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
                <div className="border-surface-container-high bg-surface relative flex h-150 w-full flex-col overflow-hidden rounded-[1.5rem] border">
                  {/* Status bar fake */}
                  <div className="flex h-6 w-full items-center justify-between px-4 pt-1">
                    <span className="text-on-surface text-[10px]">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="bg-on-surface h-2.5 w-4 rounded-sm" />
                    </div>
                  </div>
                  {/* Mock UI Header */}
                  <div className="border-surface-container bg-surface sticky top-0 z-10 flex items-center justify-between border-b px-4 py-4">
                    <div>
                      <p className="text-on-surface-variant text-[10px] tracking-wider uppercase">
                        Aujourd&apos;hui
                      </p>
                      <p className="text-on-surface text-sm font-bold">
                        Planning
                      </p>
                    </div>
                    <div className="bg-surface-container-high flex h-8 w-8 items-center justify-center rounded-full">
                      <Calendar className="text-primary size-[18px]" />
                    </div>
                  </div>
                  {/* Mock UI Content */}
                  <div className="bg-background flex flex-1 flex-col gap-3 overflow-y-auto p-4">
                    <div className="mb-2 grid grid-cols-2 gap-2">
                      <div className="border-surface-container-high bg-surface-container rounded-lg border p-3">
                        <p className="text-on-surface-variant text-[10px]">
                          Rendez-vous
                        </p>
                        <p className="text-primary text-lg font-bold">12</p>
                      </div>
                      <div className="border-surface-container-high bg-surface-container rounded-lg border p-3">
                        <p className="text-on-surface-variant text-[10px]">
                          Revenus
                        </p>
                        <p className="text-on-surface text-lg font-bold">
                          450 DT
                        </p>
                      </div>
                    </div>
                    <p className="text-on-surface-variant mt-2 text-xs font-bold">
                      Prochains clients
                    </p>
                    {previewAppointments.map((appointment) => (
                      <div
                        key={appointment.initials}
                        className={`bg-surface-container-low rounded-xl border-l-2 p-3 shadow-sm ${
                          appointment.accent
                            ? "border-primary"
                            : "border-surface-container-high"
                        } ${appointment.faded ? "opacity-70" : ""}`}
                      >
                        <div className="mb-2 flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <div className="bg-surface-container-high text-on-surface flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold">
                              {appointment.initials}
                            </div>
                            <div>
                              <p className="text-on-surface text-sm font-bold">
                                {appointment.name}
                              </p>
                              <p className="text-on-surface-variant text-[10px]">
                                {appointment.service}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p
                              className={`text-xs font-bold ${appointment.accent ? "text-primary" : "text-on-surface"}`}
                            >
                              {appointment.time}
                            </p>
                            {appointment.duration && (
                              <p className="text-on-surface-variant text-[10px]">
                                {appointment.duration}
                              </p>
                            )}
                          </div>
                        </div>
                        {appointment.tags && (
                          <div className="mt-2 flex gap-2">
                            {appointment.tags.map((tag, i) =>
                              i === 0 ? (
                                <span
                                  key={tag}
                                  className="bg-surface-container-highest text-on-surface rounded px-2 py-0.5 text-[9px]"
                                >
                                  {tag}
                                </span>
                              ) : (
                                <span
                                  key={tag}
                                  className="border-primary/20 bg-primary/10 text-primary rounded border px-2 py-0.5 text-[9px]"
                                >
                                  {tag}
                                </span>
                              ),
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Mock Bottom Nav */}
                  <div className="border-surface-container-high bg-surface-container flex h-16 items-center justify-around border-t px-4 pb-2">
                    <div className="text-primary flex flex-col items-center">
                      <LayoutDashboard className="size-5" />
                    </div>
                    <div className="text-on-surface-variant flex flex-col items-center">
                      <Calendar className="size-5" />
                    </div>
                    <div className="text-on-surface-variant flex flex-col items-center">
                      <Users className="size-5" />
                    </div>
                    <div className="text-on-surface-variant flex flex-col items-center">
                      <User className="size-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          className="bg-surface-container-lowest relative z-10 py-24"
          id="tarifs"
        >
          <div className="px-container-margin mx-auto max-w-7xl">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4 font-bold">
                Un investissement pour votre excellence
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Choisissez le plan qui correspond à l&apos;ambition de votre
                salon. Évoluez à votre rythme avec des outils conçus
                spécifiquement pour les professionnels du grooming.
              </p>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
              {/* Basic Plan */}
              <Card className="border-surface-container-high bg-surface-container-low hover:border-outline-variant relative gap-0 overflow-hidden rounded-2xl border-2 p-8 transition-all hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
                <div className="mb-8">
                  <Badge
                    variant="outline"
                    className="font-label-sm text-label-sm border-outline-variant/30 bg-surface-container text-on-surface-variant mb-4 inline-block rounded-sm tracking-wider uppercase"
                  >
                    Démarrage
                  </Badge>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold">
                    Basic
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display-lg text-display-lg text-on-surface font-bold">
                      0
                    </span>
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      DT / mois
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-4">
                    L&apos;essentiel pour digitaliser votre prise de rendez-vous
                    et découvrir la plateforme.
                  </p>
                </div>
                <div className="flex-1">
                  <ul className="mb-8 flex flex-col gap-4">
                    {basicFeatures.map((feature) => (
                      <li
                        key={feature.label}
                        className={`flex items-start gap-3 ${feature.included ? "" : "opacity-40"}`}
                      >
                        {feature.included ? (
                          <CheckCircle2 className="text-secondary mt-0.5 size-5" />
                        ) : (
                          <X className="text-on-surface-variant mt-0.5 size-5" />
                        )}
                        <span
                          className={`font-body-md text-body-md ${feature.included ? "text-on-surface" : "text-on-surface-variant line-through"}`}
                        >
                          {feature.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  variant="outline"
                  className="font-label-md text-label-md border-outline-variant bg-surface-container text-on-surface hover:bg-surface-container-high h-auto w-full rounded-lg px-6 py-4 font-bold"
                >
                  S&apos;inscrire gratuitement
                </Button>
              </Card>

              {/* Pro Plan */}
              <Card className="border-primary bg-surface relative transform gap-0 overflow-hidden rounded-2xl border-2 p-8 shadow-[0_8px_32px_rgba(212,175,55,0.15)]">
                <div className="font-label-sm text-label-sm bg-primary text-on-primary absolute top-0 right-0 rounded-bl-lg px-6 py-1.5 font-bold tracking-wider uppercase">
                  Recommandé
                </div>
                <div className="bg-primary/20 pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full blur-3xl" />
                <div className="relative z-10 mb-8">
                  <Badge
                    variant="outline"
                    className="font-label-sm text-label-sm border-primary/30 bg-primary-container/20 text-primary mb-4 inline-block rounded-sm tracking-wider uppercase"
                  >
                    Excellence
                  </Badge>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold">
                    Pro
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display-lg text-display-lg text-primary font-bold">
                      49
                    </span>
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      DT / mois
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-4">
                    L&apos;arsenal complet pour gérer, analyser et développer
                    votre activité de barbier.
                  </p>
                </div>
                <div className="relative z-10 flex-1">
                  <ul className="mb-8 flex flex-col gap-4">
                    {proFeatures.map((feature) => (
                      <li
                        key={feature.label}
                        className="flex items-start gap-3"
                      >
                        <feature.icon className="text-primary mt-0.5 size-5" />
                        <span
                          className={`font-body-md text-body-md text-on-surface ${feature.emphasis ? "font-semibold" : ""} ${feature.accent ? "text-primary" : ""}`}
                        >
                          {feature.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="font-label-md text-label-md bg-primary text-on-primary hover:bg-primary-fixed-dim relative z-10 h-auto w-full gap-2 rounded-lg px-6 py-4 font-bold shadow-[0_4px_12px_rgba(212,175,55,0.3)]">
                  Passer au niveau Pro
                  <BadgeCheck className="size-5" />
                </Button>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-surface-container-high bg-surface border-t py-8">
        <div className="px-container-margin mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-headline-md text-headline-md text-on-surface font-bold tracking-tighter opacity-50">
              HAJJEM
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
              Pro
            </span>
          </div>
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            © 2024 Hajjem. Réservé aux professionnels du grooming.
          </p>
        </div>
      </footer>
    </div>
  );
}
