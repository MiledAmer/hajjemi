"use client";

import { useState } from "react";
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
  SquarePen,
  Trash2,
  User,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AddServiceDialog } from "./_components/add-service-dialog";
import { EditServiceDialog } from "./_components/edit-service-dialog";

const BARBER_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAdrTXJGg8DazrU0p10zIpPYOPEaelASF8XNHGnzqCJrMws5gmTWuP4crJC3MJbz6CQ6y7rwO2LUzW4-l-X8Wkjr9kQ9lzIxNBpUx_iBgvBcGKv1cr4HPz2KXQ7cAau5NA5OV95ius9ruL7Pmo_GL-N54LY5NYrh7nDtkATP2XfiTF3vIyU3Dg-8K6p6lxFOQ8kP6P7TgsfWlklVaXKoXpHDfIWaWAVyTlWkszYSN-koPLGJ40ZVIfWdPMCaPeJ3c3cqqCCoUfVV04D";

const BARBER_PROFILE_PORTRAIT =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ1PSYFJcFErbgTa0UBXq-bgLu_ZCGgqoc9PWO0dlc367UVNuHC4oFdM5MGt2VIhxXkE2c2rKE2flwFbtaGvQ00mBC9r0OZlYDTSzUnqWyVwehQmYqXQU9jPB6U6s6vmb8owjEzXRbqAv24l_gGulYJ2fxGIsTwtCD7rBPV3U6G4t6u-6nCVTS6jPCGLKE3-90yC7uWOQ24AtjsgkIrPwJ3NbHz3qvycKSWKrszDxSQnaurTy3lQDUUT3VH2iW7BZ4aKNcjP_RaO1v";

type ViewId = "dashboard" | "bookings" | "services" | "profile";

const navItems: { id: ViewId; label: string; icon: typeof LayoutDashboard }[] =
  [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "bookings", label: "RDV", icon: Calendar },
    { id: "services", label: "Services", icon: Scissors },
    { id: "profile", label: "Profil", icon: User },
  ];

const upcomingAppointments = [
  { name: "Ahmed Z.", service: "Coupe Classique + Barbe", time: "09:30" },
  { name: "Sami B.", service: "Barbe VIP", time: "10:15" },
  { name: "Karim M.", service: "Coupe Signature", time: "11:00" },
];

type Booking = {
  name: string;
  service: string;
  time: string;
  status: "pending" | "confirmed" | "done";
};

const bookings: Booking[] = [
  { name: "Mehdi F.", service: "Coupe Classique", time: "14:00", status: "pending" },
  { name: "Walid R.", service: "Barbe VIP", time: "15:30", status: "confirmed" },
  { name: "Yassine K.", service: "Coupe Enfant", time: "08:30", status: "done" },
];

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

export default function TableauDeBordBarberMobilePage() {
  const [view, setView] = useState<ViewId>("dashboard");
  const [services, setServices] = useState<Service[]>(initialServices);

  return (
    <div className="bg-background text-on-background min-h-screen overflow-x-hidden">
      {/* Top App Bar */}
      <header className="bg-surface px-container-margin py-base sticky top-0 z-40 flex h-16 w-full items-center justify-between shadow-sm">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <div className="gap-base flex items-center">
            <Avatar className="border-primary/20 size-10 border">
              <AvatarImage alt="Portrait du barbier" src={BARBER_AVATAR} />
              <AvatarFallback>K</AvatarFallback>
            </Avatar>
            <span className="font-headline-md text-headline-md text-primary font-bold">
              Elite Grooming
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
                {item.label}
              </button>
            ))}
          </nav>
          <Button
            aria-label="Notifications"
            variant="ghost"
            size="icon"
            className="text-on-surface-variant"
          >
            <Bell className="size-5" />
          </Button>
        </div>
      </header>

      <main className="px-container-margin pt-stack-lg mx-auto min-h-screen w-full max-w-7xl pb-20 md:pb-12">
        {/* View: Dashboard */}
        {view === "dashboard" && (
          <section>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile mb-stack-lg">
              Bonjour, Khalil
            </h1>

            <div className="gap-gutter mb-section-gap grid grid-cols-2">
              <Card className="border-primary/10 bg-surface-container/80 gap-base p-stack-lg rounded-xl border backdrop-blur-sm">
                <span className="text-on-surface-variant font-label-sm tracking-wider uppercase">
                  RDV Aujourd&apos;hui
                </span>
                <span className="text-display-lg font-display-lg text-primary">
                  12
                </span>
              </Card>
            </div>

            <div className="mb-stack-md flex items-center justify-between">
              <h2 className="font-headline-md text-headline-md">
                Prochains Rendez-vous
              </h2>
              <Button
                variant="ghost"
                className="text-primary font-label-md h-auto p-0"
                onClick={() => setView("bookings")}
              >
                Voir tout
              </Button>
            </div>

            <div className="gap-gutter space-y-gutter md:grid md:grid-cols-2 md:space-y-0 lg:grid-cols-3">
              {upcomingAppointments.map((appointment) => (
                <Card
                  key={appointment.name}
                  className="bg-surface-container p-stack-lg border-primary flex-row items-center justify-between gap-0 rounded-lg border-l-4 transition-all active:scale-[0.98]"
                >
                  <div>
                    <p className="font-headline-md text-headline-md">
                      {appointment.name}
                    </p>
                    <p className="text-on-surface-variant font-body-md">
                      {appointment.service}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-headline-md text-primary">
                      {appointment.time}
                    </p>
                    <p className="text-on-surface-variant font-label-sm">
                      Confirmé
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
              Rendez-vous
            </h1>
            <div className="gap-stack-lg space-y-stack-lg md:grid md:grid-cols-2 md:space-y-0 lg:grid-cols-3">
              {bookings.map((booking) => (
                <Card
                  key={booking.name}
                  className={
                    booking.status === "pending"
                      ? "bg-surface-container-high border-primary/30 p-gutter gap-stack-md rounded-xl border"
                      : booking.status === "done"
                        ? "bg-surface-container p-gutter gap-0 rounded-xl opacity-60"
                        : "bg-surface-container p-gutter gap-0 rounded-xl"
                  }
                >
                  {booking.status === "pending" ? (
                    <>
                      <div className="mb-stack-md flex items-start justify-between">
                        <div>
                          <Badge className="bg-primary/20 text-primary mb-2 inline-block rounded-sm uppercase">
                            En attente
                          </Badge>
                          <p className="font-headline-md text-headline-md">
                            {booking.name}
                          </p>
                          <p className="text-on-surface-variant font-body-md">
                            {booking.service}
                          </p>
                        </div>
                        <p className="font-headline-md text-primary">
                          {booking.time}
                        </p>
                      </div>
                      <div className="gap-gutter flex">
                        <Button className="bg-primary text-on-primary h-auto flex-1 rounded-lg py-3 font-bold">
                          Accepter
                        </Button>
                        <Button
                          variant="outline"
                          className="border-outline text-on-surface h-auto flex-1 rounded-lg py-3 font-bold"
                        >
                          Décliner
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className={`font-headline-md text-headline-md ${booking.status === "done" ? "text-on-surface-variant" : ""}`}
                        >
                          {booking.name}
                        </p>
                        <p className="text-on-surface-variant font-body-md">
                          {booking.service}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-headline-md ${booking.status === "done" ? "text-on-surface-variant" : "text-primary"}`}
                        >
                          {booking.time}
                        </p>
                        <span
                          className={`text-label-sm ${booking.status === "done" ? "" : "text-secondary"}`}
                        >
                          {booking.status === "done" ? "Terminé" : "Confirmé"}
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
                Mes Services
              </h1>
              <AddServiceDialog
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
                      aria-label="Supprimer"
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
              Mon Profil
            </h1>
            <Card className="p-gutter gap-stack-lg mb-section-gap relative overflow-hidden rounded-2xl">
              <div className="bg-primary/10 pointer-events-none absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full blur-3xl" />
              <div className="gap-stack-md mb-stack-lg relative z-10 flex flex-col items-center">
                <Avatar className="border-primary size-24 border-2 p-1">
                  <AvatarImage
                    alt="Portrait de Khalil, maître barbier"
                    src={BARBER_PROFILE_PORTRAIT}
                  />
                  <AvatarFallback>K</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <h2 className="font-headline-lg text-headline-lg">
                    Khalil B.
                  </h2>
                  <p className="text-primary font-label-md tracking-widest uppercase">
                    Maître Barbier
                  </p>
                </div>
              </div>
              <div className="space-y-stack-md relative z-10">
                <p className="text-on-surface-variant font-body-md px-4 text-center">
                  Spécialiste en coupes classiques et entretien de barbe
                  premium. Plus de 10 ans d&apos;expérience au service de
                  l&apos;élégance masculine à Tunis.
                </p>
                <div className="gap-gutter mt-stack-lg flex justify-center">
                  <Button
                    aria-label="Appeler"
                    variant="secondary"
                    size="icon"
                    className="bg-surface-variant text-primary size-11 rounded-full"
                  >
                    <Phone className="size-5" />
                  </Button>
                  <Button
                    aria-label="Partager"
                    variant="secondary"
                    size="icon"
                    className="bg-surface-variant text-primary size-11 rounded-full"
                  >
                    <Share2 className="size-5" />
                  </Button>
                  <Button
                    aria-label="Modifier le profil"
                    variant="secondary"
                    size="icon"
                    className="bg-surface-variant text-primary size-11 rounded-full"
                  >
                    <SquarePen className="size-5" />
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="bg-surface-container p-gutter mb-gutter gap-stack-md rounded-xl">
              <h3 className="font-headline-md text-headline-md flex items-center gap-2">
                <Clock className="text-primary size-5" />
                Horaires d&apos;ouverture
              </h3>
              <div className="space-y-2">
                <div className="text-body-md flex justify-between">
                  <span className="text-on-surface-variant">
                    Lundi - Samedi
                  </span>
                  <span className="font-bold">09:00 - 19:00</span>
                </div>
                <div className="text-body-md flex justify-between">
                  <span className="text-on-surface-variant">Dimanche</span>
                  <span className="text-destructive">Fermé</span>
                </div>
              </div>
            </Card>

            <Button
              variant="ghost"
              className="text-destructive bg-destructive/10 mt-stack-lg h-auto w-full gap-2 rounded-xl py-4 font-bold"
            >
              <LogOut className="size-5" />
              Déconnexion
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
            <span className="font-label-sm text-label-sm">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
