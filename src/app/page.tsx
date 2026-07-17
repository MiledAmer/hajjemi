export default function HomePage() {
  return (
    <main className="relative flex min-h-[884px] w-full flex-1 flex-col md:h-[840px] md:min-h-0 md:max-w-md md:flex-none md:overflow-hidden md:rounded-2xl md:border md:border-surface-variant md:shadow-2xl lg:max-w-lg xl:max-w-xl">
      {/* Hero Image Background */}
      <div className="absolute inset-0 z-0 h-[574px] w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="h-full w-full object-cover object-top opacity-70"
          alt="Un barbier professionnel taillant la barbe d'un client dans un salon de coiffure haut de gamme, ambiance sombre et dorée."
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFiWM3UcL9KsuUkIFZXAr3-2318lC9Eh357Z3n-qOrBXXNf1LX5Ef67C1t4tPL_6qqaTmeWxRIblUdYY-HaDcvugCUcTHnuS80EeupunQDzLFzvJ4l8JYo_wNUGeyFA7lbLR6mmM60urJsvxVhxAhYUZXndRMlU-SWrrWOatj7F3_fj9N5i1KRookrIKRdeMsKpgme822_da1ea-4ZljSK-_RKHPfbIn0uoqIXkQ2h73iCBxzPj0bOHGdbiNW4q2skodzVK-y5PKVj"
        />
        <div className="hero-gradient absolute inset-0" />
      </div>

      {/* Top Navigation / Brand (Transparent Overlay) */}
      <header className="relative z-10 flex w-full items-center justify-center px-container-margin pt-8 pb-4">
        <h1 className="font-display-lg text-display-lg tracking-tighter text-primary uppercase">
          HAJJEM
        </h1>
      </header>

      {/* Content Container */}
      <div className="relative z-10 mt-auto mb-8 flex flex-1 flex-col justify-end px-container-margin">
        <div className="mb-section-gap text-center">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile mb-stack-sm text-on-surface">
            L&apos;Élite du Grooming.
          </h2>
          <p className="font-body-md text-body-md mx-auto max-w-xs text-on-surface-variant">
            Réservez votre coupe en un clic. Précision, style et excellence à
            portée de main.{" "}
            <span className="font-label-md text-label-md mt-1 block text-primary-container">
              احجز موعدك الآن
            </span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex w-full flex-col gap-stack-md">
          {/* Client Action */}
          <button className="group relative flex w-full items-center justify-between overflow-hidden rounded-xl bg-primary-container px-6 py-4 text-on-primary-container shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all active:scale-95">
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
          </button>

          {/* Professional Action */}
          <button className="group flex w-full items-center justify-between rounded-xl border border-outline-variant bg-surface-container px-6 py-4 text-on-surface transition-all active:scale-95 active:bg-surface-container-high">
            <div className="flex items-center gap-3">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                storefront
              </span>
              <div className="flex flex-col text-left">
                <span className="font-label-md text-label-md font-bold tracking-wider text-primary uppercase">
                  Espace Barber
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Pour les professionnels
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined transform text-primary transition-transform group-active:translate-x-1">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Footer Links */}
        <div className="mt-8 flex justify-center gap-6 text-center">
          <a
            className="font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-primary"
            href="#"
          >
            Connexion
          </a>
          <span className="text-surface-variant">•</span>
          <a
            className="font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-primary"
            href="#"
          >
            Explorer en invité
          </a>
        </div>
      </div>
    </main>
  );
}
