"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  MapPin,
  Plus,
  Star,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Trouver un coiffeur", href: "/search" },
  { label: "Espace Barber", href: "/plans" },
];

type Service = {
  name: string;
  description: string;
  duration: string;
  price: string;
  selected?: boolean;
};

const services: Service[] = [
  {
    name: "Coupe + Barbe (VIP)",
    description:
      "Dégradé à blanc, taille de barbe avec serviette chaude, contours au rasoir, soin visage.",
    duration: "45 min",
    price: "30 DT",
  },
  {
    name: "Dégradé Américain",
    description:
      "Coupe aux ciseaux ou tondeuse, finition parfaite, coiffage avec produit premium.",
    duration: "30 min",
    price: "15 DT",
    selected: true,
  },
  {
    name: "Taille de Barbe Classique",
    description:
      "Taille à la tondeuse, contours propres, application d'huile nourrissante.",
    duration: "15 min",
    price: "10 DT",
  },
  {
    name: "Coloration / Mèches",
    description:
      "Coloration complète ou mèches personnalisées. Produit professionnel respectueux du cuir chevelu.",
    duration: "60 min",
    price: "45 DT",
  },
];

const serviceCategories = ["Populaire", "Coupes", "Barbe", "Soins"];

function ServiceItem({ service }: { service: Service }) {
  return (
    <Card className="group border-surface-variant p-stack-md hover:bg-surface-container-high relative flex-row items-center justify-between gap-0 rounded-xl border bg-[#1C1C1E] transition-colors">
      {service.selected && (
        <div className="bg-primary absolute top-0 bottom-0 left-0 w-1" />
      )}
      <div className={`flex-1 pr-4 ${service.selected ? "pl-2" : ""}`}>
        <h3 className="font-headline-md text-on-surface mb-1 text-[18px]">
          {service.name}
        </h3>
        <p className="font-body-md text-label-sm text-on-surface-variant line-clamp-2">
          {service.description}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Clock className="text-primary size-3.5" />
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            {service.duration}
          </span>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <span className="font-headline-md text-primary text-[20px]">
          {service.price}
        </span>
        {service.selected ? (
          <Button
            aria-label="Retirer service"
            size="icon"
            className="bg-primary text-background size-8 rounded-full"
          >
            <Check className="size-4" />
          </Button>
        ) : (
          <Button
            aria-label="Ajouter service"
            variant="secondary"
            size="icon"
            className="bg-surface-variant text-on-surface group-hover:bg-primary group-hover:text-background size-8 rounded-full"
          >
            <Plus className="size-4" />
          </Button>
        )}
      </div>
    </Card>
  );
}

export default function ProfilBarberPage() {
  const router = useRouter();

  return (
    <div className="bg-background text-on-background flex min-h-screen flex-col pb-24 antialiased md:pb-0">
      {/* Top Navigation (Web View - Hidden on Mobile to prioritize Hero) */}
      <header className="bg-surface px-container-margin sticky top-0 z-50 mx-auto hidden h-16 w-full max-w-7xl items-center justify-between shadow-sm md:flex">
        <div className="flex items-center gap-4">
          <Button
            aria-label="Retour"
            variant="ghost"
            size="icon"
            className="text-on-surface-variant hover:text-primary"
            onClick={() => router.back()}
          >
            <ArrowLeft className="size-5" />
          </Button>
          <span className="font-headline-lg text-headline-lg text-primary font-bold tracking-tighter">
            HAJJEM
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
        </div>
        <Avatar className="bg-surface-container-high focus-visible:ring-primary size-10 focus-visible:ring-2">
          <AvatarImage
            alt="Portrait d'Ahmed, barbier, coupe fondu nette et barbe soignée."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvZAHjelVw0NlTkX0cvlHwDy3cyY-vKWW1QS_JP5tTMOLNLvzcgpieDgitP8iB9Mc3NNsexf_PtNYw9QOuNxv4g7-SbDr0AH3Ur_P0OdAqccmorYq3CZyDFrcGozOoKKNiWbD5eyUlerThHkKoEItiJDaScSlLvXPQguTk-BG94b_wHkN8YubJ7e5If4jkf2wnqywLNVJRtjNuDSshngEv9vfzKXdOG3sHMRY9g2eW2UKWf9M2rbSK8Sv_E-vDnpM_gjjoXrsms-HO"
          />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </header>

      {/* Main Content */}
      <main className="md:gap-gutter md:pt-stack-lg relative mx-auto w-full max-w-md flex-1 md:grid md:max-w-4xl md:grid-cols-12">
        {/* Hero Section & Barber Info (Left Column on Desktop) */}
        <section className="md:sticky md:top-24 md:col-span-5 md:h-fit">
          {/* Mobile Back Button Overlay */}
          <div className="glass-panel absolute top-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full md:hidden">
            <Button
              aria-label="Retour"
              variant="ghost"
              size="icon"
              className="text-on-surface"
              onClick={() => router.back()}
            >
              <ArrowLeft className="size-5" />
            </Button>
          </div>

          {/* Hero Image */}
          <div className="shadow-ambient relative h-72 w-full overflow-hidden md:h-96 md:rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Ahmed, barbier, en plein travail de précision sur un dégradé, salon premium et sombre."
              className="absolute inset-0 h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8RnBDDOInkPBTpKHz20kPiDPiWAhtUZl1OfkKpupS9dQJ4OFvP6VbnoVMSCgQjdE8pDDFTi2i13A_2p8Ra3yX9ypb1v4ou5hxXE-KVlfahvJt1Kjs1VD61zwh986SCHrwx_zwwXGI_OphXP9IprhC1Pgxj7TTx0dDuTtE-AAVG5Atyurq91bmH-vrBcPAzqakLScgbmZ55IFjxZQgrkEql8OgEAWd090nyY3bFZ5pi14QxjAhqa_5m-Id06cVdgh2dy-oT6L3nydA"
            />
            {/* Gradient Overlay for Text Readability on Mobile */}
            <div className="from-background via-background/40 absolute inset-0 bg-linear-to-t to-transparent md:hidden" />
            {/* Barber Name & Specialty Overlay (Mobile Only) */}
            <div className="p-container-margin absolute bottom-0 left-0 w-full md:hidden">
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile mb-stack-sm text-on-surface drop-shadow-md">
                Ahmed
              </h1>
              <p className="font-body-md text-body-md text-primary drop-shadow-md">
                Expert Dégradé &amp; Barbe
              </p>
            </div>
          </div>

          {/* Barber Info (Desktop Only - Extracted from Image) */}
          <div className="mt-stack-md px-container-margin hidden md:block md:px-0">
            <h1 className="font-headline-lg text-headline-lg mb-stack-sm text-on-surface">
              Ahmed
            </h1>
            <p className="font-body-md text-body-md mb-stack-lg text-primary">
              Expert Dégradé &amp; Barbe
            </p>
            {/* Rating & Location Badges */}
            <div className="mb-stack-lg gap-stack-md flex">
              <Badge
                variant="outline"
                className="border-surface-variant bg-surface-container gap-2 rounded-full px-3 py-1"
              >
                <Star className="text-primary size-4 fill-current" />
                <span className="font-label-sm text-label-sm text-on-surface">
                  4.9 (128 avis)
                </span>
              </Badge>
              <Badge
                variant="outline"
                className="border-surface-variant bg-surface-container gap-2 rounded-full px-3 py-1"
              >
                <MapPin className="text-on-surface-variant size-4" />
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Tunis, Centre Ville
                </span>
              </Badge>
            </div>
            {/* About Barber */}
            <p className="font-body-md text-body-md mb-stack-lg text-on-surface-variant leading-relaxed">
              Spécialiste de la coiffure masculine moderne avec plus de 5 ans
              d&apos;expérience. Reconnu pour sa précision méticuleuse dans les
              dégradés à blanc et le traçage de barbe.
            </p>
          </div>

          {/* Mobile Only Info block below image */}
          <div className="fade-in-up px-container-margin pt-stack-md md:hidden">
            {/* Rating & Location Badges */}
            <div className="mb-stack-md gap-stack-sm flex flex-wrap">
              <Badge
                variant="outline"
                className="border-surface-variant bg-surface-container gap-1 rounded-full px-3 py-1"
              >
                <Star className="text-primary size-3.5 fill-current" />
                <span className="font-label-sm text-label-sm text-on-surface">
                  4.9 (128)
                </span>
              </Badge>
              <Badge
                variant="outline"
                className="border-surface-variant bg-surface-container gap-1 rounded-full px-3 py-1"
              >
                <MapPin className="text-on-surface-variant size-3.5" />
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Tunis
                </span>
              </Badge>
              <Badge
                variant="outline"
                className="border-surface-variant bg-surface-container gap-1 rounded-full px-3 py-1"
              >
                <Clock className="text-on-surface-variant size-3.5" />
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Ouv.
                </span>
              </Badge>
            </div>
          </div>
        </section>

        {/* Services Section (Right Column on Desktop) */}
        <section className="fade-in-up mt-stack-lg px-container-margin pb-32 delay-100 md:col-span-7 md:mt-0 md:px-0 md:pb-0">
          <div className="mb-stack-md flex items-center justify-between">
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Services
            </h2>
            <Button
              variant="ghost"
              className="font-label-md text-label-md text-primary h-auto p-0 hover:underline"
            >
              Voir tout
            </Button>
          </div>

          {/* Service Categories (Chips) */}
          <div className="hide-scrollbar mb-stack-md gap-stack-sm pb-stack-sm flex overflow-x-auto">
            {serviceCategories.map((category, index) => (
              <Button
                key={category}
                variant={index === 0 ? "default" : "outline"}
                className={
                  index === 0
                    ? "font-label-md text-label-md bg-primary-container text-on-primary-container h-auto rounded-full px-4 py-2 whitespace-nowrap"
                    : "font-label-md text-label-md border-surface-variant bg-surface-container text-on-surface-variant hover:bg-surface-variant h-auto rounded-full px-4 py-2 whitespace-nowrap"
                }
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Service List */}
          <div className="gap-stack-sm flex flex-col">
            {services.map((service) => (
              <ServiceItem key={service.name} service={service} />
            ))}
          </div>

          {/* Spacer for mobile FAB */}
          <div className="h-24 md:hidden" />
        </section>
      </main>

      {/* Floating Action Button Area (Mobile Book Now) */}
      <div className="glass-panel pb-safe px-container-margin py-stack-md fixed bottom-0 left-0 z-40 w-full shadow-[0_-8px_16px_rgba(0,0,0,0.4)] md:hidden">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant">
            1 service sélectionné
          </span>
          <span className="font-headline-md text-primary text-[20px]">
            15 DT
          </span>
        </div>
        <Button className="shadow-ambient bg-primary font-headline-md text-background h-auto w-full gap-2 rounded-lg py-3 text-[18px]">
          Réserver maintenant
          <ArrowRight className="size-5" />
        </Button>
      </div>

      {/* Desktop Floating Action Area (Hidden on mobile) */}
      <div className="fixed right-8 bottom-8 z-50 hidden md:block">
        <Card className="fade-in-up shadow-ambient border-surface-variant bg-surface-container-high w-80 gap-0 rounded-xl border p-4 delay-200">
          <h3 className="font-headline-md border-surface-variant text-on-surface mb-2 border-b pb-2 text-[18px]">
            Votre Réservation
          </h3>
          <div className="mb-1 flex items-center justify-between">
            <span className="font-body-md text-label-sm text-on-surface-variant">
              Dégradé Américain
            </span>
            <span className="font-label-sm text-label-sm text-on-surface">
              15 DT
            </span>
          </div>
          <div className="border-surface-variant mt-3 flex items-center justify-between border-t pt-2">
            <span className="font-headline-md text-on-surface text-[16px]">
              Total
            </span>
            <span className="font-headline-md text-primary text-[20px]">
              15 DT
            </span>
          </div>
          <Button className="font-label-md text-label-md bg-primary text-background mt-4 h-auto w-full rounded-lg py-3 shadow-sm hover:opacity-90">
            Réserver maintenant
          </Button>
        </Card>
      </div>
    </div>
  );
}
