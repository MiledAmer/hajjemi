"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupUser } from "@/server/users";
import { isValidEmail } from "@/lib/email";
import { personNameError } from "@/lib/name";

// Client-side mirror of the server zod schema — validated per field on blur.
const validators: Record<string, (v: string) => string | null> = {
  fullname: personNameError,
  phone: (v) =>
    /^\d{8}$/.test(v.trim()) ? null : "Le numéro doit contenir 8 chiffres.",
  email: (v) => (isValidEmail(v) ? null : "Adresse e-mail invalide."),
  password: (v) =>
    v.length >= 8
      ? null
      : "Le mot de passe doit contenir au moins 8 caractères.",
};

export default function InscriptionClientPage() {
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.target as HTMLFormElement);
    const field = (name: string) => (form.get(name) as string) ?? "";
    const errors = Object.fromEntries(
      Object.entries(validators).map(([name, check]) => [name, check(field(name))]),
    );
    setFieldErrors(errors);
    if (Object.values(errors).some(Boolean)) return;
    setSubmitting(true);
    try {
      // Account creation happens fully server-side (Clerk + DB together).
      const { error: signupError } = await signupUser({
        role: "client",
        name: field("fullname"),
        phone: field("phone"),
        email: field("email"),
        password: field("password"),
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
      router.push("/search");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-background relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
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

      <main className="px-container-margin py-stack-lg z-10 w-full max-w-md">
        {/* Header Branding */}
        <header className="mb-section-gap flex flex-col items-center text-center">
          <div className="mb-gutter">
            <span
              className="material-symbols-outlined text-primary text-6xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              content_cut
            </span>
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-stack-sm tracking-tighter uppercase">
            Hajjemi
          </h1>
          <p className="font-body-md text-on-surface-variant opacity-80">
            Rejoignez l&apos;élite du grooming en Tunisie
          </p>
        </header>

        {/* Registration Form Card */}
        <Card className="p-stack-lg shadow-lg">
          <CardHeader className="px-0">
            <CardTitle className="font-headline-md text-headline-md text-on-surface">
              Créer un compte
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <form className="space-y-gutter" onSubmit={handleSubmit} noValidate>
              {/* Full Name */}
              <div className="space-y-stack-sm">
                <Label htmlFor="fullname">Nom complet</Label>
                <div className="gold-glow relative">
                  <User className="text-outline pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input
                    id="fullname"
                    name="fullname"
                    placeholder="Ahmed Ben Salem"
                    required
                    type="text"
                    aria-invalid={!!fieldErrors.fullname}
                    onBlur={(e) => validateField("fullname", e.target.value)}
                    className="h-auto rounded-lg py-3 pl-10"
                  />
                </div>
                {fieldErrors.fullname && (
                  <p className="font-label-sm text-sm text-red-400" role="alert">
                    {fieldErrors.fullname}
                  </p>
                )}
              </div>

              {/* Phone Number (Tunisia Context) */}
              <div className="space-y-stack-sm">
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <div className="gold-glow relative">
                  <Phone className="text-outline pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="22123456"
                    required
                    type="tel"
                    aria-invalid={!!fieldErrors.phone}
                    onBlur={(e) => validateField("phone", e.target.value)}
                    className="h-auto rounded-lg py-3 pl-10"
                  />
                </div>
                {fieldErrors.phone && (
                  <p className="font-label-sm text-sm text-red-400" role="alert">
                    {fieldErrors.phone}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-stack-sm">
                <Label htmlFor="email">Adresse e-mail</Label>
                <div className="gold-glow relative">
                  <Mail className="text-outline pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input
                    id="email"
                    name="email"
                    placeholder="vous@exemple.com"
                    required
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!fieldErrors.email}
                    onBlur={(e) => validateField("email", e.target.value)}
                    className="h-auto rounded-lg py-3 pl-10"
                  />
                </div>
                {fieldErrors.email && (
                  <p className="font-label-sm text-sm text-red-400" role="alert">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-stack-sm">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="gold-glow relative">
                  <Lock className="text-outline pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    aria-invalid={!!fieldErrors.password}
                    onBlur={(e) => validateField("password", e.target.value)}
                    className="h-auto rounded-lg py-3 pr-10 pl-10"
                  />
                  <button
                    className="text-outline hover:text-primary absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
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
              <Button
                className="mt-base font-headline-md text-headline-md h-auto w-full rounded-lg py-4"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Traitement..." : "Créer mon compte"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Login Link */}
        <footer className="mt-stack-lg text-center">
          <p className="font-body-md text-on-surface-variant">
            Vous avez déjà un compte ?{" "}
            <Link
              className="font-label-md ml-stack-sm text-primary hover:underline"
              href="/connexion"
            >
              Se connecter
            </Link>
          </p>
        </footer>
      </main>

      {/* Footer Decorative Line */}
      <div className="via-primary fixed bottom-0 left-0 h-1 w-full bg-linear-to-r from-transparent to-transparent opacity-30" />
    </div>
  );
}
