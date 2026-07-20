"use client";

import Link from "next/link";
import { useState } from "react";

export default function ConnexionPage() {
  const [showPassword, setShowPassword] = useState(false);

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
            L&apos;excellence du barbier tunisien
          </p>
        </header>

        {/* Login Form Card */}
        <section className="bg-surface-container p-stack-lg border-outline-variant/10 rounded-xl border shadow-lg">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-lg">
            Connexion
          </h2>
          <form className="space-y-gutter">
            {/* Email Field */}
            <div className="space-y-stack-sm">
              <label
                className="font-label-md text-label-md text-on-surface-variant"
                htmlFor="email"
              >
                Email
              </label>
              <div className="gold-glow group relative">
                <span className="material-symbols-outlined text-outline absolute top-1/2 left-3 -translate-y-1/2 text-lg">
                  mail
                </span>
                <input
                  className="w-full rounded-lg border border-outline-variant bg-surface-container-low py-3 pr-4 pl-10 font-body-md text-on-surface outline-none transition-all placeholder:text-outline/50 focus:border-primary focus:ring-0"
                  id="email"
                  placeholder="votre@email.com"
                  type="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-stack-sm">
              <div className="flex items-center justify-between">
                <label
                  className="font-label-md text-label-md text-on-surface-variant"
                  htmlFor="password"
                >
                  Mot de passe
                </label>
                <a
                  className="font-label-sm text-label-sm text-primary transition-opacity hover:opacity-80"
                  href="#"
                >
                  Mot de passe oublié ?
                </a>
              </div>
              <div className="gold-glow group relative">
                <span className="material-symbols-outlined text-outline absolute top-1/2 left-3 -translate-y-1/2 text-lg">
                  lock
                </span>
                <input
                  className="w-full rounded-lg border border-outline-variant bg-surface-container-low py-3 pr-12 pl-10 font-body-md text-on-surface outline-none transition-all placeholder:text-outline/50 focus:border-primary focus:ring-0"
                  id="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
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
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Action Button */}
            <button
              className="mt-base w-full rounded-lg bg-primary py-4 font-headline-md text-headline-md text-on-primary shadow-md transition-all btn-active hover:bg-primary-container"
              type="submit"
            >
              Se connecter
            </button>
          </form>

          {/* Social Login Divider */}
          <div className="my-section-gap relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/30" />
            </div>
            <div className="relative flex justify-center text-label-sm tracking-widest uppercase">
              <span className="bg-surface-container text-outline font-label-md px-4">
                Ou continuer avec
              </span>
            </div>
          </div>

          {/* Social Media Buttons */}
          <div className="gap-gutter grid grid-cols-2">
            <button className="gap-stack-md flex items-center justify-center rounded-lg border border-outline-variant bg-surface-container-low py-3 transition-colors btn-active hover:bg-surface-container-high">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.896 4.136-1.248 1.248-3.224 2.184-6.224 2.184-5.032 0-9.144-4.056-9.144-9.04s4.112-9.04 9.144-9.04c2.728 0 4.712 1.072 6.16 2.448l2.304-2.304c-2.096-2.016-4.856-3.224-8.464-3.224-6.624 0-12 5.376-12 12s5.376 12 12 12c3.584 0 6.304-1.184 8.528-3.496 2.296-2.296 3.016-5.528 3.016-8.152 0-.624-.048-1.216-.136-1.792h-11.416z"
                  fill="#EA4335"
                />
              </svg>
              <span className="font-label-md text-on-surface">Google</span>
            </button>
            <button className="gap-stack-md flex items-center justify-center rounded-lg border border-outline-variant bg-surface-container-low py-3 transition-colors btn-active hover:bg-surface-container-high">
              <svg className="h-5 w-5 fill-on-surface" viewBox="0 0 24 24">
                <path d="M17.073 10.117c-.012-2.14 1.742-3.17 1.821-3.222-1.001-1.462-2.553-1.66-3.106-1.684-1.32-.134-2.576.779-3.245.779-.668 0-1.706-.763-2.805-.742-1.442.022-2.775.839-3.518 2.13-1.498 2.604-.383 6.455 1.066 8.547.712 1.026 1.554 2.176 2.664 2.135 1.071-.041 1.472-.692 2.766-.692 1.293 0 1.658.692 2.788.67 1.15-.022 1.884-1.042 2.587-2.072.812-1.19 1.147-2.34 1.166-2.4-.025-.011-2.24-.859-2.264-3.41zm-1.89-6.905c.594-.719.995-1.721.885-2.712-.85.034-1.88.567-2.49 1.282-.547.632-.958 1.656-.83 2.626.949.074 1.894-.521 2.435-1.196z" />
              </svg>
              <span className="font-label-md text-on-surface">Apple</span>
            </button>
          </div>
        </section>

        {/* Sign Up Link */}
        <footer className="mt-stack-lg text-center">
          <p className="font-body-md text-on-surface-variant">
            Pas encore de compte ?{" "}
            <Link
              className="font-label-md ml-stack-sm text-primary hover:underline"
              href="#"
            >
              S&apos;inscrire
            </Link>
          </p>
        </footer>
      </main>

      {/* Footer Decorative Line */}
      <div className="fixed bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />
    </div>
  );
}
