import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="bg-background text-on-background flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
        Page introuvable
      </h1>
      <p className="text-on-surface-variant font-body-md max-w-sm">
        Cette page n&apos;existe pas ou n&apos;est plus disponible.
      </p>
      <div className="flex gap-3">
        <Link href="/search" className={buttonVariants()}>
          Trouver un coiffeur
        </Link>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Accueil
        </Link>
      </div>
    </main>
  );
}
