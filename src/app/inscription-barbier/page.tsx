"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import {
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
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
import { signupUser } from "@/server/users";
import type { Governorate } from "../../../generated/prisma";

// value doubles as the Governorate enum value in the DB.
const cities = [
  { value: "TUNIS", label: "Tunis" },
  { value: "ARIANA", label: "Ariana" },
  { value: "SOUSSE", label: "Sousse" },
  { value: "SFAX", label: "Sfax" },
  { value: "MONASTIR", label: "Monastir" },
  { value: "BIZERTE", label: "Bizerte" },
  { value: "NABEUL", label: "Nabeul" },
] as const;

const specialities = [
  { value: "barbe", label: "Barbe", icon: User },
  { value: "coupe", label: "Coupe", icon: Scissors },
  { value: "soins", label: "Soins", icon: Sparkles },
];

// Client-side mirror of the server zod schema — validated per field on blur.
const validators: Record<string, (v: string) => string | null> = {
  salon_name: (v) => (v.trim() ? null : "Le nom du salon est requis."),
  manager_name: (v) =>
    /^[\p{L}\s'-]+$/u.test(v.trim())
      ? null
      : "Le nom ne doit contenir que des lettres.",
  city: (v) => (v ? null : "Choisissez votre ville."),
  phone: (v) =>
    /^\d{8}$/.test(v.trim()) ? null : "Le numéro doit contenir 8 chiffres.",
  email: (v) =>
    /^\S+@\S+\.\S+$/.test(v.trim()) ? null : "Adresse e-mail invalide.",
  password: (v) =>
    v.length >= 8
      ? null
      : "Le mot de passe doit contenir au moins 8 caractères.",
};

export default function InscriptionBarbierPage() {
  const router = useRouter();
  const { signIn } = useSignIn();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string | null>
  >({});

  function validateField(name: string, value: string) {
    setFieldErrors((cur) => ({ ...cur, [name]: validators[name]!(value) }));
  }
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.target as HTMLFormElement);
    const field = (name: string) => (form.get(name) as string) ?? "";
    const errors = Object.fromEntries(
      Object.entries(validators).map(([name, check]) => [
        name,
        check(field(name)),
      ]),
    );
    setFieldErrors(errors);
    if (Object.values(errors).some(Boolean)) return;
    setSubmitting(true);
    try {
      // Account creation happens fully server-side (Clerk + DB together).
      const { error: signupError } = await signupUser({
        role: "barbier",
        name: field("manager_name"),
        phone: field("phone"),
        email: field("email"),
        password: field("password"),
        businessName: field("salon_name"),
        governorate: field("city") as Governorate,
      });
      if (signupError) {
        setError(signupError);
        return;
      }
      // Then a normal sign-in to open the session.
      await signIn.reset();
      const { error } = await signIn.password({
        emailAddress: field("email"),
        password: field("password"),
      });
      if (error || signIn.status !== "complete") {
        setError("Compte créé — connectez-vous depuis la page de connexion.");
        return;
      }
      const { error: finalizeError } = await signIn.finalize();
      if (finalizeError) {
        setError("Compte créé — connectez-vous depuis la page de connexion.");
        return;
      }
      router.push("/dashbord_barber");
    } finally {
      setSubmitting(false);
    }
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
              Hajjemi
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
          <form className="space-y-gutter" onSubmit={handleSubmit} noValidate>
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
                  aria-invalid={!!fieldErrors.salon_name}
                  onBlur={(e) => validateField("salon_name", e.target.value)}
                  className="h-auto rounded-lg py-3 pl-11"
                />
              </div>
              {fieldErrors.salon_name && (
                <p className="font-label-sm text-sm text-red-400" role="alert">
                  {fieldErrors.salon_name}
                </p>
              )}
              <div className="gold-glow relative">
                <User className="text-on-surface-variant pointer-events-none absolute top-1/2 left-3 size-[20px] -translate-y-1/2" />
                <Input
                  name="manager_name"
                  placeholder="Nom du responsable"
                  required
                  type="text"
                  aria-invalid={!!fieldErrors.manager_name}
                  onBlur={(e) => validateField("manager_name", e.target.value)}
                  className="h-auto rounded-lg py-3 pl-11"
                />
              </div>
              {fieldErrors.manager_name && (
                <p className="font-label-sm text-sm text-red-400" role="alert">
                  {fieldErrors.manager_name}
                </p>
              )}
            </div>

            {/* Contact & Location Group */}
            <div className="space-y-stack-md">
              <Label className="mb-1 block">Localisation &amp; Contact</Label>
              <div className="gold-glow relative">
                <MapPin className="text-on-surface-variant pointer-events-none absolute top-1/2 left-3 z-10 size-[20px] -translate-y-1/2" />
                <Select
                  name="city"
                  required
                  onValueChange={(v) => validateField("city", String(v))}
                >
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
              {fieldErrors.city && (
                <p className="font-label-sm text-sm text-red-400" role="alert">
                  {fieldErrors.city}
                </p>
              )}
              <div className="gold-glow relative">
                <Phone className="text-on-surface-variant pointer-events-none absolute top-1/2 left-3 size-[20px] -translate-y-1/2" />
                <Input
                  name="phone"
                  placeholder="Numéro de téléphone"
                  required
                  type="tel"
                  aria-invalid={!!fieldErrors.phone}
                  onBlur={(e) => validateField("phone", e.target.value)}
                  className="h-auto rounded-lg py-3 pl-11"
                />
              </div>
              {fieldErrors.phone && (
                <p className="font-label-sm text-sm text-red-400" role="alert">
                  {fieldErrors.phone}
                </p>
              )}
              <div className="gold-glow relative">
                <Mail className="text-on-surface-variant pointer-events-none absolute top-1/2 left-3 size-[20px] -translate-y-1/2" />
                <Input
                  name="email"
                  placeholder="Adresse e-mail"
                  required
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!fieldErrors.email}
                  onBlur={(e) => validateField("email", e.target.value)}
                  className="h-auto rounded-lg py-3 pl-11"
                />
              </div>
              {fieldErrors.email && (
                <p className="font-label-sm text-sm text-red-400" role="alert">
                  {fieldErrors.email}
                </p>
              )}
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
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  aria-invalid={!!fieldErrors.password}
                  onBlur={(e) => validateField("password", e.target.value)}
                  className="h-auto rounded-lg py-3 pr-10 pl-11"
                />
                <button
                  className="text-on-surface-variant hover:text-primary absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
                  type="button"
                  aria-label={
                    showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"
                  }
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="font-label-sm text-sm text-red-400" role="alert">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {error && (
              <p className="font-body-md text-sm text-red-400" role="alert">
                {error}
              </p>
            )}

            {/* Action Button */}
            <div className="pt-stack-lg">
              <Button
                className="h-auto w-full gap-2 rounded-lg py-4 font-bold shadow-[0_4px_12px_rgba(242,202,80,0.3)]"
                type="submit"
                disabled={submitting}
              >
                {submitting ? (
                  <RefreshCw className="size-4 animate-spin" />
                ) : (
                  <span className="font-label-md text-label-md tracking-widest uppercase">
                    Créer mon compte
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer Privacy */}
      <footer className="z-10 mt-auto w-full py-8 text-center">
        <p className="font-label-sm text-label-sm text-on-surface-variant/40">
          © 2026 Hajjemi. Plateforme de gestion premium pour barbiers.
        </p>
      </footer>
    </div>
  );
}
