"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useClerk, useSignIn } from "@clerk/nextjs";
import { Eye, EyeOff, Lock, Mail, MessageSquare, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSessionRole } from "@/server/users";

export default function ConnexionPage() {
  const router = useRouter();
  const { signIn } = useSignIn();
  const { signOut } = useClerk();
  const [role, setRole] = useState<"client" | "barbier">("client");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  // Set when Clerk asks to verify a new device; switches the form to the code step.
  const [needsEmailCode, setNeedsEmailCode] = useState(false);
  const [code, setCode] = useState("");
  // SMS OTP mode: enter phone → receive code → verify.
  const [method, setMethod] = useState<"password" | "sms">("password");
  const [phone, setPhone] = useState("");
  const [smsSent, setSmsSent] = useState(false);


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      if (method === "sms") {
        if (!smsSent) {
          await signIn.reset();
          // 8-digit local numbers get the Tunisian prefix; full E.164
          // (e.g. Clerk test numbers like +15555550100) passes through.
          const e164 = phone.startsWith("+")
            ? phone.replace(/\s/g, "")
            : `+216${phone.replace(/\s/g, "")}`;
          const { error } = await signIn.phoneCode.sendCode({
            phoneNumber: e164,
          });
          if (error) {
            console.error("phoneCode.sendCode error:", error);
            setError(error.message ?? "Échec de l'envoi du SMS. Réessayez.");
            return;
          }
          setSmsSent(true);
          return;
        }
        const { error } = await signIn.phoneCode.verifyCode({ code });
        if (error) {
          setError("Code invalide ou expiré.");
          return;
        }
      } else if (!needsEmailCode) {
        // Clear any sign-in attempt left over from a previous failed submit.
        await signIn.reset();
        const { error } = await signIn.password({
          emailAddress: email,
          password,
        });
        if (error) {
          console.error("signIn.password error:", error);
          setError(error.message ?? "Email ou mot de passe incorrect.");
          return;
        }
        if (signIn.status === "needs_client_trust") {
          // New device: Clerk wants an email code before opening the session.
          const { error: sendError } = await signIn.mfa.sendEmailCode();
          if (sendError) {
            console.error("sendEmailCode error:", sendError);
            setError("Échec de l'envoi du code. Réessayez.");
            return;
          }
          setNeedsEmailCode(true);
          return;
        }
      } else {
        const { error } = await signIn.mfa.verifyEmailCode({ code });
        if (error) {
          setError("Code invalide ou expiré.");
          return;
        }
      }
      if (signIn.status !== "complete") {
        console.error("Unhandled sign-in status:", signIn.status);
        setError(`Connexion incomplète (${signIn.status}). Réessayez.`);
        return;
      }
      const { error: finalizeError } = await signIn.finalize();
      if (finalizeError) {
        console.error("signIn.finalize error:", finalizeError);
        setError(finalizeError.message ?? "Connexion incomplète. Réessayez.");
        return;
      }
      // Real role comes from Clerk publicMetadata (server-side). If it
      // doesn't match the selected tab, end the session and stay here.
      const actualRole = await getSessionRole();
      if (actualRole !== role) {
        await signOut(() => {
          setError("Ce compte ne correspond pas au profil sélectionné.");
          setNeedsEmailCode(false);
          setSmsSent(false);
          setCode("");
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
              Connexion
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
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

            <form className="space-y-gutter" onSubmit={handleSubmit}>
              {needsEmailCode || smsSent ? (
                /* Verification code step (new-device email code or SMS OTP) */
                <div className="space-y-stack-sm">
                  <Label htmlFor="code">Code de vérification</Label>
                  <p className="font-body-md text-on-surface-variant text-sm">
                    {smsSent
                      ? `Un code a été envoyé par SMS au ${phone}.`
                      : `Un code a été envoyé par e-mail à ${email}.`}
                  </p>
                  <div className="gold-glow relative">
                    <MessageSquare className="text-outline pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <Input
                      id="code"
                      placeholder="••••••"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      className="h-auto rounded-lg py-3 pl-10 text-center text-2xl tracking-[0.5em]"
                      value={code}
                      onChange={(e) => {
                        // Keep digits only (ignores spaces from a pasted code).
                        const digits = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6);
                        setCode(digits);
                        // Auto-submit once all 6 digits are in.
                        if (digits.length === 6 && !pending)
                          e.target.form?.requestSubmit();
                      }}
                      required
                    />
                  </div>
                  <button
                    className="font-label-sm text-label-sm text-primary hover:opacity-80"
                    type="button"
                    onClick={() => {
                      setNeedsEmailCode(false);
                      setSmsSent(false);
                      setCode("");
                    }}
                  >
                    Retour
                  </button>
                </div>
              ) : method === "sms" ? (
                /* Phone field for SMS OTP */
                <div className="space-y-stack-sm">
                  <Label htmlFor="phone">Numéro de téléphone</Label>
                  <div className="gold-glow relative">
                    <Phone className="text-outline pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <Input
                      id="phone"
                      placeholder="22 123 456"
                      type="tel"
                      autoComplete="tel"
                      className="h-auto rounded-lg py-3 pl-10"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
              ) : (
                <>
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
                        className="h-auto rounded-lg py-3 pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Password Field */}
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
                </>
              )}

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
                {pending
                  ? "Veuillez patienter..."
                  : needsEmailCode || smsSent
                    ? "Vérifier le code"
                    : method === "sms"
                      ? "Recevoir le code"
                      : "Se connecter"}
              </Button>

              {!needsEmailCode && !smsSent && (
                <button
                  className="font-label-sm text-label-sm text-primary block w-full text-center hover:opacity-80"
                  type="button"
                  onClick={() => {
                    setMethod((m) => (m === "sms" ? "password" : "sms"));
                    setError(null);
                  }}
                >
                  {method === "sms"
                    ? "Se connecter avec un mot de passe"
                    : "Se connecter par SMS"}
                </button>
              )}
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
      <div className="via-primary fixed bottom-0 left-0 h-1 w-full bg-linear-to-r from-transparent to-transparent opacity-30" />
    </div>
  );
}
