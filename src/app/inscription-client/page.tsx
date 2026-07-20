"use client";

import Link from "next/link";
import { useState } from "react";
import { Phone, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InscriptionClientPage() {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      alert("Compte créé avec succès ! Bienvenue chez Hajjem.");
      setSubmitting(false);
    }, 1500);
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
            Hajjem
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
            <form className="space-y-gutter" onSubmit={handleSubmit}>
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
                    className="h-auto rounded-lg py-3 pl-10"
                  />
                </div>
              </div>

              {/* Phone Number (Tunisia Context) */}
              <div className="space-y-stack-sm">
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <div className="gold-glow relative">
                  <Phone className="text-outline pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input
                    id="phone"
                    name="phone"
                    pattern="[0-9]{8}"
                    placeholder="22 123 456"
                    required
                    type="tel"
                    className="h-auto rounded-lg py-3 pl-10"
                  />
                </div>
              </div>

              {/* Terms and Conditions */}
              <p className="font-label-sm text-label-sm text-on-surface-variant px-4 text-center leading-relaxed">
                En créant un compte, vous acceptez nos{" "}
                <a
                  className="text-primary transition-all hover:underline"
                  href="#"
                >
                  Conditions d&apos;utilisation
                </a>{" "}
                et notre{" "}
                <a
                  className="text-primary transition-all hover:underline"
                  href="#"
                >
                  Politique de confidentialité
                </a>
                .
              </p>

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
