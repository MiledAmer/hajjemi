"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth, useClerk, useSignIn } from "@clerk/nextjs";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSessionRole } from "@/server/users";

// Clerk errors come back in English; map the ones a login can hit to French.
function frClerkError(error: unknown): string {
  const code = (error as { code?: string } | null)?.code;
  switch (code) {
    case "form_identifier_not_found":
      return "Aucun compte ne correspond à cet e-mail.";
    case "form_password_incorrect":
    case "form_param_format_invalid":
      return "E-mail ou mot de passe incorrect.";
    case "form_identifier_exists":
      return "Cette adresse e-mail est déjà utilisée.";
    case "too_many_requests":
      return "Trop de tentatives. Réessayez dans un instant.";
    default:
      return "E-mail ou mot de passe incorrect.";
  }
}

export default function ConnexionPage() {
  const router = useRouter();
  const { signIn } = useSignIn();
  const { signOut } = useClerk();
  const { isSignedIn } = useAuth();

  // Already signed in when landing here — no reason to see the login form.
  // The ref keeps this from clobbering the redirect_url/role redirect that
  // handleSubmit performs right after a login made on this page.
  const signingIn = useRef(false);
  useEffect(() => {
    if (isSignedIn && !signingIn.current) router.replace("/search");
  }, [isSignedIn, router]);
  const [role, setRole] = useState<"client" | "barbier">("client");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Same email check as the signup pages: validated on blur.
  function validateEmail(value: string) {
    setEmailError(
      /^\S+@\S+\.\S+$/.test(value.trim()) ? null : "Adresse e-mail invalide.",
    );
  }

  // Password-reset flow (Clerk resetPasswordEmailCode): null = login form,
  // "email" = ask for the address, "code" = enter code + new password.
  const [resetStep, setResetStep] = useState<null | "email" | "code">(null);
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetNotice, setResetNotice] = useState<string | null>(null);

  async function sendResetCode(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setEmailError("Adresse e-mail invalide.");
      return;
    }
    setError(null);
    setResetNotice(null);
    setPending(true);
    try {
      await signIn.reset();
      const { error: createError } = await signIn.create({ identifier: email });
      if (createError) {
        setError(frClerkError(createError));
        return;
      }
      const { error: sendError } = await signIn.resetPasswordEmailCode.sendCode();
      if (sendError) {
        setError(frClerkError(sendError));
        return;
      }
      setResetStep("code");
      setResetNotice("Un code a été envoyé à votre adresse e-mail.");
    } finally {
      setPending(false);
    }
  }

  async function submitNewPassword(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResetNotice(null);
    setPending(true);
    signingIn.current = true;
    try {
      const { error: verifyError } =
        await signIn.resetPasswordEmailCode.verifyCode({ code: resetCode });
      if (verifyError) {
        setError(frClerkError(verifyError));
        return;
      }
      const { error: submitError } =
        await signIn.resetPasswordEmailCode.submitPassword({
          password: newPassword,
        });
      if (submitError) {
        setError(frClerkError(submitError));
        return;
      }
      const { error: finalizeError } = await signIn.finalize();
      if (finalizeError) {
        setError(frClerkError(finalizeError));
        return;
      }
      const actualRole = await getSessionRole();
      router.push(actualRole === "barbier" ? "/dashbord_barber" : "/search");
    } finally {
      setPending(false);
    }
  }

  function openReset() {
    setError(null);
    setResetNotice(null);
    setResetCode("");
    setNewPassword("");
    setResetStep("email");
  }

  function backToLogin() {
    setError(null);
    setResetNotice(null);
    setResetStep(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setEmailError("Adresse e-mail invalide.");
      return;
    }
    setError(null);
    setPending(true);
    signingIn.current = true;
    try {
      // Clear any sign-in attempt left over from a previous failed submit.
      await signIn.reset();
      const { error } = await signIn.password({
        emailAddress: email,
        password,
      });
      if (error) {
        console.error("signIn.password error:", error);
        setError(frClerkError(error));
        return;
      }
      if (signIn.status !== "complete") {
        console.error("Unhandled sign-in status:", signIn.status);
        setError(`Connexion incomplète (${signIn.status}). Réessayez.`);
        return;
      }
      const { error: finalizeError } = await signIn.finalize();
      if (finalizeError) {
        console.error("signIn.finalize error:", finalizeError);
        setError(frClerkError(finalizeError));
        return;
      }
      // Real role comes from Clerk publicMetadata (server-side). If it
      // doesn't match the selected tab, end the session and stay here.
      const actualRole = await getSessionRole();
      if (actualRole !== role) {
        await signOut(() => {
          setError("Ce compte ne correspond pas au profil sélectionné.");
        });
        return;
      }
      const redirectUrl = new URLSearchParams(window.location.search).get(
        "redirect_url",
      );
      if (redirectUrl?.startsWith(window.location.origin)) {
        router.push(redirectUrl.slice(window.location.origin.length));
        return;
      }
      router.push(role === "barbier" ? "/dashbord_barber" : "/search");
    } finally {
      setPending(false);
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
            L&apos;excellence du barbier tunisien
          </p>
        </header>

        {/* Login Form Card */}
        <Card className="p-stack-lg shadow-lg">
          <CardHeader className="px-0">
            <CardTitle className="font-headline-md text-headline-md text-on-surface">
              {resetStep === null
                ? "Connexion"
                : "Réinitialiser le mot de passe"}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            {resetStep === null ? (
              <>
            <div className="bg-muted mb-stack-lg grid w-full grid-cols-2 rounded-lg p-[3px]">
              {(["client", "barbier"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={
                    role === r
                      ? "bg-background text-foreground rounded-md py-1.5 text-sm font-medium shadow-sm"
                      : "text-foreground/60 hover:text-foreground rounded-md py-1.5 text-sm font-medium transition-colors"
                  }
                >
                  {r === "client" ? "Client" : "Barbier"}
                </button>
              ))}
            </div>

            <form className="space-y-gutter" onSubmit={handleSubmit} noValidate>
              {/* Email Field */}
              <div className="space-y-stack-sm">
                <Label htmlFor="email">Adresse e-mail</Label>
                <div className="gold-glow relative">
                  <Mail className="text-outline pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input
                    id="email"
                    placeholder="vous@exemple.com"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!emailError}
                    className="h-auto rounded-lg py-3 pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={(e) => validateEmail(e.target.value)}
                    required
                  />
                </div>
                {emailError && (
                  <p className="font-label-sm text-sm text-red-400" role="alert">
                    {emailError}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-stack-sm">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mot de passe</Label>
                  <button
                    type="button"
                    onClick={openReset}
                    className="font-label-sm text-label-sm text-primary transition-opacity hover:opacity-80"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
                <div className="gold-glow relative">
                  <Lock className="text-outline pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className="h-auto rounded-lg py-3 pr-10 pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {error && (
                <p className="font-body-md text-sm text-red-400" role="alert">
                  {error}
                </p>
              )}

              {/* Action Button */}
              <Button
                className="mt-base font-headline-md text-headline-md h-auto w-full rounded-lg py-4"
                type="submit"
                disabled={pending}
              >
                {pending ? "Veuillez patienter..." : "Se connecter"}
              </Button>
            </form>
              </>
            ) : (
              <form
                className="space-y-gutter"
                onSubmit={resetStep === "email" ? sendResetCode : submitNewPassword}
                noValidate
              >
                {/* Email (step 1) */}
                <div className="space-y-stack-sm">
                  <Label htmlFor="reset-email">Adresse e-mail</Label>
                  <div className="gold-glow relative">
                    <Mail className="text-outline pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <Input
                      id="reset-email"
                      placeholder="vous@exemple.com"
                      type="email"
                      autoComplete="email"
                      aria-invalid={!!emailError}
                      className="h-auto rounded-lg py-3 pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={(e) => validateEmail(e.target.value)}
                      disabled={resetStep === "code"}
                      required
                    />
                  </div>
                  {emailError && resetStep === "email" && (
                    <p
                      className="font-label-sm text-sm text-red-400"
                      role="alert"
                    >
                      {emailError}
                    </p>
                  )}
                </div>

                {resetStep === "code" && (
                  <>
                    {/* Verification code */}
                    <div className="space-y-stack-sm">
                      <Label htmlFor="reset-code">Code de vérification</Label>
                      <div className="gold-glow relative">
                        <Input
                          id="reset-code"
                          placeholder="123456"
                          inputMode="numeric"
                          className="h-auto rounded-lg py-3"
                          value={resetCode}
                          onChange={(e) => setResetCode(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* New password */}
                    <div className="space-y-stack-sm">
                      <Label htmlFor="new-password">Nouveau mot de passe</Label>
                      <div className="gold-glow relative">
                        <Lock className="text-outline pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                        <Input
                          id="new-password"
                          placeholder="••••••••"
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          className="h-auto rounded-lg py-3 pr-10 pl-10"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          minLength={8}
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
                  </>
                )}

                {resetNotice && (
                  <p
                    className="font-body-md text-sm text-green-400"
                    role="status"
                  >
                    {resetNotice}
                  </p>
                )}
                {error && (
                  <p className="font-body-md text-sm text-red-400" role="alert">
                    {error}
                  </p>
                )}

                <Button
                  className="mt-base font-headline-md text-headline-md h-auto w-full rounded-lg py-4"
                  type="submit"
                  disabled={pending}
                >
                  {pending
                    ? "Veuillez patienter..."
                    : resetStep === "email"
                      ? "Envoyer le code"
                      : "Réinitialiser"}
                </Button>
                <button
                  type="button"
                  onClick={backToLogin}
                  className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary w-full text-center transition-colors"
                >
                  Retour à la connexion
                </button>
              </form>
            )}
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
      <div className="via-primary fixed bottom-0 left-0 h-1 w-full bg-linear-to-r from-transparent to-transparent opacity-30" />
    </div>
  );
}
