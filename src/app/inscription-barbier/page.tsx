"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Check,
  CheckCircle2,
  Lock,
  MapPin,
  Phone,
  RefreshCw,
  Scissors,
  Sparkles,
  Store,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SubmitStage = "idle" | "loading" | "verifying";

const cities = [
  { value: "tunis", label: "Tunis" },
  { value: "ariana", label: "Ariana" },
  { value: "sousse", label: "Sousse" },
  { value: "sfax", label: "Sfax" },
  { value: "monastir", label: "Monastir" },
  { value: "bizerte", label: "Bizerte" },
  { value: "nabeul", label: "Nabeul" },
];

const specialities = [
  { value: "barbe", label: "Barbe", icon: User },
  { value: "coupe", label: "Coupe", icon: Scissors },
  { value: "soins", label: "Soins", icon: Sparkles },
];

export default function InscriptionBarbierPage() {
  const [stage, setStage] = useState<SubmitStage>("idle");
  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>(
    [],
  );

  function toggleSpeciality(value: string) {
    setSelectedSpecialities((current) =>
      current.includes(value)
        ? current.filter((s) => s !== value)
        : [...current, value],
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStage("loading");
    setTimeout(() => {
      setStage("verifying");
      setTimeout(() => {
        alert(
          "Informations enregistrées. Passons à la configuration de vos services.",
        );
        setStage("idle");
      }, 1000);
    }, 800);
  }

  return (
    <div className="bg-background relative flex min-h-screen flex-col items-center justify-start overflow-hidden pb-10">
      {/* Background Decorative Element */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">
        <div
          className="h-full w-full bg-cover bg-center brightness-50 grayscale"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDnt5CUbxq6udtmVCPLY81vJawCTf4XNJHWxZJ4qgVbZr1Ju1vNA-sNgCyq47HvHqv49JuKXjm6Nrf-F9hDyzI8Rzq5FrYC3Bk8OG9Dxiw3BtwkmBLNeASGNEjZt-0W8o_4ySkMe41bT2HLtbNHseWJZwokMNXvWLyILd0QhT6J2yL6TOC5XVuqNegS_wtR_bEiHgArxO_Y2RPAaepUQJUPlkYUueOStQJBSL_7BdaQFQnnmI4C3EQANoSNKByYmugd4vl_psEhSs62')",
          }}
        />
      </div>
      {/* Header Section */}
      <header className="bg-background/80 fixed top-0 z-50 w-full backdrop-blur-md">
        <div className="px-container-margin mx-auto flex h-16 w-full max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">
              content_cut
            </span>
            <span className="font-headline-lg text-headline-lg text-primary tracking-tighter uppercase">
              Hajjem
            </span>
          </div>
          <Link
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
            href="/connexion"
          >
            Connexion
          </Link>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="px-container-margin z-10 mx-auto mt-24 w-full max-w-lg">
        {/* Welcome Hero */}
        <div className="mb-section-gap text-center">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-background mb-stack-sm">
            Devenez partenaire
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mx-auto max-w-xs">
            Rejoignez l&apos;élite des barbiers en Tunisie et gérez votre salon
            avec précision.
          </p>
        </div>

        {/* Registration Form Card */}
        <div className="glass-card p-stack-lg focus-within:border-primary/40 rounded-xl shadow-lg transition-colors">
          <form className="space-y-gutter" onSubmit={handleSubmit}>
            {/* Salon Identity Group */}
            <div className="space-y-stack-md">
              <Label className="mb-1 block">Identité du Salon</Label>
              <div className="gold-glow relative">
                <Store className="text-on-surface-variant pointer-events-none absolute top-1/2 left-3 size-[20px] -translate-y-1/2" />
                <Input
                  name="salon_name"
                  placeholder="Nom du salon"
                  required
                  type="text"
                  className="h-auto rounded-lg py-3 pl-11"
                />
              </div>
              <div className="gold-glow relative">
                <User className="text-on-surface-variant pointer-events-none absolute top-1/2 left-3 size-[20px] -translate-y-1/2" />
                <Input
                  name="manager_name"
                  placeholder="Nom du responsable"
                  required
                  type="text"
                  className="h-auto rounded-lg py-3 pl-11"
                />
              </div>
            </div>

            {/* Contact & Location Group */}
            <div className="space-y-stack-md">
              <Label className="mb-1 block">Localisation &amp; Contact</Label>
              <div className="gold-glow relative">
                <MapPin className="text-on-surface-variant pointer-events-none absolute top-1/2 left-3 z-10 size-[20px] -translate-y-1/2" />
                <Select name="city" required>
                  <SelectTrigger className="h-auto w-full rounded-lg py-3 pl-11">
                    <SelectValue placeholder="Ville (Tunisie)" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.value} value={city.value}>
                        {city.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="gold-glow relative">
                <Phone className="text-on-surface-variant pointer-events-none absolute top-1/2 left-3 size-[20px] -translate-y-1/2" />
                <Input
                  name="phone"
                  placeholder="Numéro de téléphone"
                  required
                  type="tel"
                  className="h-auto rounded-lg py-3 pl-11"
                />
              </div>
            </div>

            {/* Specialities Selection */}
            <div className="space-y-stack-md">
              <Label className="mb-1 block">Spécialités</Label>
              <div className="flex flex-wrap gap-2">
                {specialities.map(({ value, label, icon: Icon }) => {
                  const active = selectedSpecialities.includes(value);
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => toggleSpeciality(value)}
                      aria-pressed={active}
                      className={`text-label-sm font-label-sm flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all ${
                        active
                          ? "border-primary bg-primary/20 text-primary"
                          : "border-surface-variant bg-surface-container-low text-on-surface-variant"
                      }`}
                    >
                      <Icon className="size-3.5" />
                      {label}
                      {active && <Check className="size-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Security Group */}
            <div className="space-y-stack-md">
              <Label className="mb-1 block">Sécurité</Label>
              <div className="gold-glow relative">
                <Lock className="text-on-surface-variant pointer-events-none absolute top-1/2 left-3 size-[20px] -translate-y-1/2" />
                <Input
                  name="password"
                  placeholder="Mot de passe"
                  required
                  type="password"
                  className="h-auto rounded-lg py-3 pl-11"
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-stack-lg">
              <Button
                className="h-auto w-full gap-2 rounded-lg py-4 font-bold shadow-[0_4px_12px_rgba(242,202,80,0.3)]"
                type="submit"
                disabled={stage !== "idle"}
              >
                {stage === "idle" && (
                  <>
                    <span className="font-label-md text-label-md tracking-widest uppercase">
                      Suivant
                    </span>
                    <span aria-hidden>›</span>
                  </>
                )}
                {stage === "loading" && (
                  <RefreshCw className="size-4 animate-spin" />
                )}
                {stage === "verifying" && (
                  <>
                    <CheckCircle2 className="size-4" />
                    <span>Vérification...</span>
                  </>
                )}
              </Button>
            </div>
            <p className="font-label-sm text-label-sm text-on-surface-variant/60 mt-stack-md text-center">
              Étape 1 sur 3 — Informations de base
            </p>
          </form>
        </div>
      </main>

      {/* Footer Privacy */}
      <footer className="z-10 mt-auto w-full py-8 text-center">
        <p className="font-label-sm text-label-sm text-on-surface-variant/40">
          © 2024 Hajjem. Plateforme de gestion premium pour barbiers.
        </p>
      </footer>
    </div>
  );
}
