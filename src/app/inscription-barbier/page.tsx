"use client";

import Link from "next/link";
import { useState } from "react";

type SubmitStage = "idle" | "loading" | "verifying";

export default function InscriptionBarbierPage() {
  const [stage, setStage] = useState<SubmitStage>("idle");

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
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDnt5CUbxq6udtmVCPLY81vJawCTf4XNJHWxZJ4qgVbZr1Ju1vNA-sNgCyq47HvHqv49JuKXjm6Nrf - F9hDyzI8Rzq5FrYC3Bk8OG9Dxiw3BtwkmBLNeASGNEjZt - 0W8o_4ySkMe41bT2HLtbNHseWJZwokMNXvWLyILd0QhT6J2yL6TOC5XVuqNegS_wtR_bEiHgArxO_Y2RPAaepUQJUPlkYUueOStQJBSL_7BdaQFQnnmI4C3EQANoSNKByYmugd4vl_psEhSs62')",
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
              <label className="font-label-md text-label-md text-on-surface-variant mb-1 block">
                Identité du Salon
              </label>
              <div className="gold-glow group relative">
                <span className="material-symbols-outlined text-on-surface-variant group-focus-within:text-primary absolute top-1/2 left-3 -translate-y-1/2 text-[20px] transition-colors">
                  storefront
                </span>
                <input
                  className="border-surface-variant font-body-md text-body-md text-on-surface bg-surface-container-low w-full rounded-lg py-3 pr-4 pl-11 transition-all outline-none placeholder:opacity-40"
                  name="salon_name"
                  placeholder="Nom du salon"
                  required
                  type="text"
                />
              </div>
              <div className="gold-glow group relative">
                <span className="material-symbols-outlined text-on-surface-variant group-focus-within:text-primary absolute top-1/2 left-3 -translate-y-1/2 text-[20px] transition-colors">
                  person
                </span>
                <input
                  className="border-surface-variant font-body-md text-body-md text-on-surface bg-surface-container-low w-full rounded-lg py-3 pr-4 pl-11 transition-all outline-none placeholder:opacity-40"
                  name="manager_name"
                  placeholder="Nom du responsable"
                  required
                  type="text"
                />
              </div>
            </div>

            {/* Contact & Location Group */}
            <div className="space-y-stack-md">
              <label className="font-label-md text-label-md text-on-surface-variant mb-1 block">
                Localisation &amp; Contact
              </label>
              <div className="gold-glow group relative">
                <span className="material-symbols-outlined text-on-surface-variant group-focus-within:text-primary absolute top-1/2 left-3 -translate-y-1/2 text-[20px] transition-colors">
                  location_on
                </span>
                <select
                  className="border-surface-variant font-body-md text-body-md text-on-surface bg-surface-container-low w-full cursor-pointer appearance-none rounded-lg py-3 pr-4 pl-11 transition-all outline-none"
                  name="city"
                  required
                  defaultValue=""
                >
                  <option disabled value="">
                    Ville (Tunisie)
                  </option>
                  <option value="tunis">Tunis</option>
                  <option value="ariana">Ariana</option>
                  <option value="sousse">Sousse</option>
                  <option value="sfax">Sfax</option>
                  <option value="monastir">Monastir</option>
                  <option value="bizerte">Bizerte</option>
                  <option value="nabeul">Nabeul</option>
                </select>
              </div>
              <div className="gold-glow group relative">
                <span className="material-symbols-outlined text-on-surface-variant group-focus-within:text-primary absolute top-1/2 left-3 -translate-y-1/2 text-[20px] transition-colors">
                  call
                </span>
                <input
                  className="border-surface-variant font-body-md text-body-md text-on-surface bg-surface-container-low w-full rounded-lg py-3 pr-4 pl-11 transition-all outline-none placeholder:opacity-40"
                  name="phone"
                  placeholder="Numéro de téléphone"
                  required
                  type="tel"
                />
              </div>
            </div>

            {/* Specialities Selection */}
            <div className="space-y-stack-md">
              <label className="font-label-md text-label-md text-on-surface-variant mb-1 block">
                Spécialités
              </label>
              <div className="flex flex-wrap gap-2">
                <label className="cursor-pointer">
                  <input
                    className="peer hidden"
                    name="speciality"
                    type="checkbox"
                    value="barbe"
                  />
                  <div className="border-surface-variant bg-surface-container-low text-label-sm font-label-sm text-on-surface-variant peer-checked:bg-primary/20 peer-checked:border-primary peer-checked:text-primary flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all">
                    <span className="material-symbols-outlined text-sm">
                      face
                    </span>{" "}
                    Barbe
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input
                    className="peer hidden"
                    name="speciality"
                    type="checkbox"
                    value="coupe"
                  />
                  <div className="border-surface-variant bg-surface-container-low text-label-sm font-label-sm text-on-surface-variant peer-checked:bg-primary/20 peer-checked:border-primary peer-checked:text-primary flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all">
                    <span className="material-symbols-outlined text-sm">
                      content_cut
                    </span>{" "}
                    Coupe
                  </div>
                </label>
                <label className="cursor-pointer">
                  <input
                    className="peer hidden"
                    name="speciality"
                    type="checkbox"
                    value="soins"
                  />
                  <div className="border-surface-variant bg-surface-container-low text-label-sm font-label-sm text-on-surface-variant peer-checked:bg-primary/20 peer-checked:border-primary peer-checked:text-primary flex items-center gap-1.5 rounded-full border px-4 py-2 transition-all">
                    <span className="material-symbols-outlined text-sm">
                      spa
                    </span>{" "}
                    Soins
                  </div>
                </label>
              </div>
            </div>

            {/* Security Group */}
            <div className="space-y-stack-md">
              <label className="font-label-md text-label-md text-on-surface-variant mb-1 block">
                Sécurité
              </label>
              <div className="gold-glow group relative">
                <span className="material-symbols-outlined text-on-surface-variant group-focus-within:text-primary absolute top-1/2 left-3 -translate-y-1/2 text-[20px] transition-colors">
                  lock
                </span>
                <input
                  className="border-surface-variant font-body-md text-body-md text-on-surface bg-surface-container-low w-full rounded-lg py-3 pr-4 pl-11 transition-all outline-none placeholder:opacity-40"
                  name="password"
                  placeholder="Mot de passe"
                  required
                  type="password"
                />
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-stack-lg">
              <button
                className="bg-primary hover:bg-primary-container text-on-primary btn-active flex w-full items-center justify-center gap-2 rounded-lg py-4 font-bold shadow-[0_4px_12px_rgba(242,202,80,0.3)] transition-all disabled:opacity-70"
                type="submit"
                disabled={stage !== "idle"}
              >
                {stage === "idle" && (
                  <>
                    <span className="font-label-md text-label-md tracking-widest uppercase">
                      Suivant
                    </span>
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                  </>
                )}
                {stage === "loading" && (
                  <span className="material-symbols-outlined animate-spin">
                    refresh
                  </span>
                )}
                {stage === "verifying" && (
                  <>
                    <span className="material-symbols-outlined">
                      check_circle
                    </span>
                    <span>Vérification...</span>
                  </>
                )}
              </button>
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
