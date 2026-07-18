import Link from "next/link";

const navLinks = [
  { label: "Trouver un coiffeur", href: "/search" },
  { label: "Espace Barber", href: "/plans" },
];

const trustAvatars = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDTWDCkUKtW-7MxWuiE-b6tyOHlSB9EQ9XqoSQ7XMY1jbHUhbOUhYVu5X_SiWUVTEicg9T67UTvToJki7KKVEMWP8ZvAPBx3Grq_3xL2L8lZ4H1HkAszeI9pL6esdohlFQ5yqZXrtOMA8dBISwKrVhtlfoHN3z8q-honH_D79yPL8zulU1BZ8XevZ15NSS0lqkybu-7T49Hz7IUp1pknvb8N_LmgICAZRa-Z6vwCLL3kbHmHjaJSmYh16zoudZtulaCeFW6ZsboddpD",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDesfnmPXOCocgm8rd-lzrDR1aj5wy3JjlWPMyKU3c8D048g0vC4r903I2oRkMkfSpDDxnpVJsAmyFmBG0BatC06hzTY_8Qqmbx9ZedVWcvOgSzieT1pxyPfJ8DHAv9V3--VJ8-HayiqwV7-C3cQTfV2StevxfbqjtBlgkurZbbmM1h8lp1JfK1bP7CmsY9N8x2NICs7iWcw6Ufc1JrbwQKqiPIsur_IUh_k4YOnULgYdoxniEEnMk374l_YVMVlOAB0LyYtCy8lEHJ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDq1jreOXR32SR86t5E9RvYHDwy3sjRwfcJ_6jLlKerJhJoDD2WJ9F_BcF_6p9zldW-BJXAVgzcxIjwSPLmwx2YMk6MuCtsuJeu4aTWs37bzLYAngVCUtrTltANtSDBZlQMHmAu-KQidt1fM0bPsm1Jc3GnzhJVoeKjflmyf4JCYR-o9mjj0ZwvKMU9vbM1tcTnx_NNdE2_9q8z7ns-laV8oPNNmGE8xTze0SFXnkz6V-EHhZRz-jU7drv2bPdynTstHSC-0CdkRCr7",
];

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Desktop Nav */}
      <header className="bg-surface/80 sticky top-0 z-50 hidden w-full shadow-sm backdrop-blur-md md:block">
        <div className="px-container-margin mx-auto flex h-16 w-full max-w-7xl items-center justify-between">
          <span className="font-display-lg text-display-lg text-primary tracking-tighter uppercase">
            HAJJEM
          </span>
          <div className="gap-stack-lg flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              className="font-label-md text-label-md text-on-surface hover:text-primary font-semibold transition-colors"
              href="#"
            >
              Connexion
            </a>
          </div>
        </div>
      </header>

      <main className="relative flex min-h-[884px] w-full flex-1 flex-col md:min-h-0 md:flex-row md:items-center md:gap-12 md:px-container-margin md:mx-auto md:max-w-7xl md:py-16">
        {/* Hero Image Background */}
        <div className="absolute inset-0 z-0 h-[574px] w-full md:static md:h-[600px] md:w-1/2">
          {/* Decorative glow (desktop only) */}
          <div className="bg-primary/10 absolute -top-10 -right-10 hidden h-64 w-64 rounded-full blur-3xl md:block" />
          <div className="bg-secondary/10 absolute -bottom-10 -left-10 hidden h-40 w-40 rounded-full blur-2xl md:block" />

          <div className="relative h-full w-full md:overflow-hidden md:rounded-2xl md:shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-full w-full object-cover object-top opacity-70 md:opacity-100"
              alt="Un barbier professionnel taillant la barbe d'un client dans un salon de coiffure haut de gamme, ambiance sombre et dorée."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFiWM3UcL9KsuUkIFZXAr3-2318lC9Eh357Z3n-qOrBXXNf1LX5Ef67C1t4tPL_6qqaTmeWxRIblUdYY-HaDcvugCUcTHnuS80EeupunQDzLFzvJ4l8JYo_wNUGeyFA7lbLR6mmM60urJsvxVhxAhYUZXndRMlU-SWrrWOatj7F3_fj9N5i1KRookrIKRdeMsKpgme822_da1ea-4ZljSK-_RKHPfbIn0uoqIXkQ2h73iCBxzPj0bOHGdbiNW4q2skodzVK-y5PKVj"
            />
            <div className="hero-gradient absolute inset-0 md:hidden" />
          </div>

          {/* Floating rating card (desktop only) */}
          <div className="border-surface-variant bg-surface-container-high absolute -bottom-6 -left-6 z-10 hidden items-center gap-3 rounded-xl border px-5 py-4 shadow-2xl md:flex">
            <span
              className="material-symbols-outlined text-primary text-[28px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <div>
              <p className="font-headline-md text-headline-md text-on-surface">
                4.9/5
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                +2000 avis clients
              </p>
            </div>
          </div>
        </div>

        {/* Top Navigation / Brand (Mobile Only Overlay) */}
        <header className="px-container-margin relative z-10 flex w-full items-center justify-center pt-8 pb-4 md:hidden">
          <h1 className="font-display-lg text-display-lg text-primary tracking-tighter uppercase">
            HAJJEM
          </h1>
        </header>

        {/* Content Container */}
        <div className="px-container-margin relative z-10 mt-auto mb-8 flex flex-1 flex-col justify-end md:mt-0 md:mb-0 md:w-1/2 md:justify-center md:px-0">
          {/* Badge (desktop only) */}
          <div className="border-primary/30 bg-primary-container/10 mb-stack-md hidden w-fit items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-sm md:inline-flex">
            <span className="bg-primary h-2 w-2 animate-pulse rounded-full" />
            <span className="font-label-sm text-label-sm text-primary tracking-wider uppercase">
              Réservation instantanée
            </span>
          </div>

          <div className="mb-section-gap text-center md:text-left">
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile mb-stack-sm text-on-surface md:mb-stack-md md:max-w-lg md:text-[56px] md:leading-[1.1] md:font-extrabold md:tracking-tight">
              L&apos;Élite du Grooming.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mx-auto max-w-xs md:mx-0 md:max-w-md md:text-lg">
              Réservez votre coupe en un clic. Précision, style et excellence à
              portée de main.{" "}
              <span className="font-label-md text-label-md text-primary-container mt-1 block">
                احجز موعدك الآن
              </span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="gap-stack-md flex w-full flex-col md:max-w-md">
            {/* Client Action */}
            <Link
              href="/search"
              className="group bg-primary-container text-on-primary-container relative flex w-full items-center justify-between overflow-hidden rounded-xl px-6 py-4 shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all active:scale-95"
            >
              <div className="relative z-10 flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-on-primary-container"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  content_cut
                </span>
                <div className="flex flex-col text-left">
                  <span className="font-label-md text-label-md font-bold tracking-wider uppercase">
                    Trouver un coiffeur
                  </span>
                  <span className="font-label-sm text-label-sm opacity-80">
                    Pour les clients
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined relative z-10 transform transition-transform group-active:translate-x-1">
                arrow_forward
              </span>
              <div className="absolute inset-0 bg-black opacity-0 transition-opacity group-active:opacity-10" />
            </Link>

            {/* Professional Action */}
            <Link
              href="/plans"
              className="group border-outline-variant bg-surface-container text-on-surface active:bg-surface-container-high flex w-full items-center justify-between rounded-xl border px-6 py-4 transition-all active:scale-95"
            >
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  storefront
                </span>
                <div className="flex flex-col text-left">
                  <span className="font-label-md text-label-md text-primary font-bold tracking-wider uppercase">
                    Espace Barber
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Pour les professionnels
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary transform transition-transform group-active:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Trust row (desktop only) */}
          <div className="border-surface-container-highest/50 mt-10 hidden max-w-md items-center gap-4 border-t pt-6 md:flex">
            <div className="flex -space-x-3">
              {trustAvatars.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  alt="Client satisfait de Hajjem"
                  className="border-background h-10 w-10 rounded-full border-2 object-cover grayscale"
                  src={src}
                />
              ))}
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface font-bold">
                +2000 clients
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-normal">
                réservent déjà via Hajjem
              </span>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-8 flex justify-center gap-6 text-center md:hidden">
            <a
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Connexion
            </a>
            <span className="text-surface-variant">•</span>
            <a
              className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Explorer en invité
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
