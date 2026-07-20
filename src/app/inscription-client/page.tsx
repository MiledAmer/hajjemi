"use client";

import Link from "next/link";
import { useState } from "react";

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
          className="h-full w-full bg-cover bg-center grayscale brightness-50"
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
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-stack-sm uppercase tracking-tighter">
            Hajjem
          </h1>
          <p className="font-body-md text-on-surface-variant opacity-80">
            Rejoignez l&apos;élite du grooming en Tunisie
          </p>
        </header>

        {/* Registration Form Card */}
        <section className="bg-surface-container p-stack-lg border-outline-variant/10 rounded-xl border shadow-lg">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-lg">
            Créer un compte
          </h2>
          <form className="space-y-gutter" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="space-y-stack-sm">
              <label
                className="font-label-md text-label-md text-on-surface-variant"
                htmlFor="fullname"
              >
                Nom complet
              </label>
              <div className="gold-glow group relative">
                <span className="material-symbols-outlined text-outline absolute top-1/2 left-3 -translate-y-1/2 text-lg">
                  person
                </span>
                <input
                  className="w-full rounded-lg border border-outline-variant bg-surface-container-low py-3 pr-4 pl-10 font-body-md text-on-surface outline-none transition-all placeholder:text-outline/50 focus:border-primary focus:ring-0"
                  id="fullname"
                  name="fullname"
                  placeholder="Ahmed Ben Salem"
                  required
                  type="text"
                />
              </div>
            </div>

            {/* Phone Number (Tunisia Context) */}
            <div className="space-y-stack-sm">
              <label
                className="font-label-md text-label-md text-on-surface-variant"
                htmlFor="phone"
              >
                Numéro de téléphone
              </label>
              <div className="gold-glow group flex">
                <div className="bg-surface-container-high border-outline-variant flex items-center rounded-l-lg border-y border-l px-3">
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    +216
                  </span>
                </div>
                <input
                  className="w-full rounded-r-lg border border-outline-variant bg-surface-container-low px-4 py-3 font-body-md text-on-surface outline-none transition-all placeholder:text-outline/50 focus:border-primary focus:ring-0"
                  id="phone"
                  name="phone"
                  pattern="[0-9]{8}"
                  placeholder="22 123 456"
                  required
                  type="tel"
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
            <button
              className="mt-base w-full rounded-lg bg-primary py-4 font-headline-md text-headline-md text-on-primary shadow-md transition-all btn-active hover:bg-primary-container disabled:opacity-70"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Traitement..." : "Créer mon compte"}
            </button>
          </form>
        </section>

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
      <div className="fixed bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
    </div>
  );
}
