"use client";

import Link from "next/link";
import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";

// Route-level error boundary: any render/data error below the root layout
// lands here instead of a blank page. `reset` alone only re-renders the
// client tree, so the retry also refreshes the server data in a transition.
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const [isRetrying, startRetry] = useTransition();

  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <main className="bg-background text-on-background flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
        Une erreur est survenue
      </h1>
      <p className="text-on-surface-variant font-body-md max-w-sm" role="alert">
        Quelque chose s&apos;est mal passé. Vos données n&apos;ont pas été
        perdues — réessayez dans un instant.
      </p>
      {error.digest && (
        <p className="text-on-surface-variant/60 font-label-sm">
          Réf. {error.digest}
        </p>
      )}
      <div className="flex gap-3">
        <Button
          disabled={isRetrying}
          onClick={() =>
            startRetry(() => {
              router.refresh();
              reset();
            })
          }
        >
          {isRetrying ? "Chargement..." : "Réessayer"}
        </Button>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Accueil
        </Link>
      </div>
    </main>
  );
}
