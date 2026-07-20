"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Lock, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ConnexionPage() {
  const [role, setRole] = useState<"client" | "barbier">("client");
  const [showPassword, setShowPassword] = useState(false);

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
            L&apos;excellence du barbier tunisien
          </p>
        </header>

        {/* Login Form Card */}
        <Card className="p-stack-lg shadow-lg">
          <CardHeader className="px-0">
            <CardTitle className="font-headline-md text-headline-md text-on-surface">
              Connexion
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <Tabs
              value={role}
              onValueChange={(value) => setRole(value as typeof role)}
            >
              <TabsList className="mb-stack-lg grid w-full grid-cols-2">
                <TabsTrigger value="client">Client</TabsTrigger>
                <TabsTrigger value="barbier">Barbier</TabsTrigger>
              </TabsList>
            </Tabs>

            <form className="space-y-gutter">
              {/* Phone Field */}
              <div className="space-y-stack-sm">
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <div className="gold-glow relative">
                  <Phone className="text-outline pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input
                    id="phone"
                    placeholder="22 123 456"
                    type="tel"
                    className="h-auto rounded-lg py-3 pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password Field (barbier only) */}
              {role === "barbier" && (
                <div className="space-y-stack-sm">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mot de passe</Label>
                    <a
                      className="font-label-sm text-label-sm text-primary transition-opacity hover:opacity-80"
                      href="#"
                    >
                      Mot de passe oublié ?
                    </a>
                  </div>
                  <div className="gold-glow relative">
                    <Lock className="text-outline pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      className="h-auto rounded-lg py-3 pr-10 pl-10"
                      required
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
                </div>
              )}

              {/* Action Button */}
              <Button
                className="mt-base font-headline-md text-headline-md h-auto w-full rounded-lg py-4"
                type="submit"
              >
                Se connecter
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <footer className="mt-stack-lg text-center">
          <p className="font-body-md text-on-surface-variant">
            Pas encore de compte ?{" "}
            <Link
              className="font-label-md ml-stack-sm text-primary hover:underline"
              href={
                role === "barbier"
                  ? "/inscription-barbier"
                  : "/inscription-client"
              }
            >
              S&apos;inscrire
            </Link>
          </p>
        </footer>
      </main>

      {/* Footer Decorative Line */}
      <div className="via-primary fixed bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent to-transparent opacity-30" />
    </div>
  );
}
