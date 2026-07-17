import Link from "next/link";

const cityFilters = ["Sousse", "Sfax"];
const serviceFilters = ["Coiffure", "Barbe"];

type Barber = {
  name: string;
  distance: string;
  area: string;
  rating: string;
  tags: string[];
  image?: { src: string; alt: string };
  primaryCta?: boolean;
};

const barbers: Barber[] = [
  {
    name: "L'Atelier du Barbier",
    distance: "2.4 km",
    area: "Les Berges du Lac",
    rating: "4.9",
    tags: ["Coupe Classique", "Taille de Barbe", "Soin Visage"],
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkUFtEs2z-Ax9aiOjC_nFgG1dWnaQg1m-XAFEmNLBDFbgVU-_6-gUY1th1jMRosl3ZxHVXVxjlb-MmeW2UTfIdOH7bhz1hFkJyczUXzpP7_CQIsa3QxFgp62aVB_dkxXd1fRB8YYURIi9bBGoo1miEStxwWLWFbiOeh3HwbS6nv3Wp719sGa5uUCp0M9JlH2OaqPAvsRPtnT_Aa7YrgXsVz0KKQ5zagGkF3M9Tr8i62zcEwdItlofM7RxaWp-tv0qcrc9SvtwdPZ1j",
      alt: "Intérieur moderne et minimaliste d'un salon de barbier, chaises en cuir et éclairage doré tamisé.",
    },
    primaryCta: true,
  },
  {
    name: "Gentlemen's Corner",
    distance: "3.8 km",
    area: "La Marsa",
    rating: "4.7",
    tags: ["Coupe Premium", "Rasage à l'ancienne"],
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAepV25pqp6X8RojPCdB4Tb7dJkYH7XREkjfXwG1FrlkeyCXOIsvD4PuetpVi2FHOirr2f3zov-jE0cYmOG04DVYy1UdhLDIDzqawuPw_UCxNJJblWOViV_r0oknKerT2NllJYNOXgFiR_Upfa51srXu6j8-H6rBkjMyVk5NZZE1MMRbXDPQ43GkJ2x5UUEgcu1etVJA1quJvFA4sbFreCMt7RWOdUpBeNgl7QIwterSr_X26loPPMVdHMN_5vRdbWe5alFHWFZHcrQ",
      alt: "Gros plan sur des outils de barbier haut de gamme posés sur un plan de travail en bois sombre.",
    },
  },
  {
    name: "Barber Shop VIP",
    distance: "5.1 km",
    area: "Carthage",
    rating: "4.5",
    tags: ["Coupe & Barbe", "Coloration"],
  },
];

function BarberCard({ barber }: { barber: Barber }) {
  return (
    <article className="border-surface-container-high overflow-hidden rounded-xl border bg-[#1C1C1E] shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-transform active:scale-[0.98]">
      <div className="relative h-40 w-full">
        {barber.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="h-full w-full object-cover"
            alt={barber.image.alt}
            src={barber.image.src}
          />
        ) : (
          <div className="bg-surface-container-low flex h-full w-full items-center justify-center">
            <span className="material-symbols-outlined text-surface-container-highest text-[48px]">
              storefront
            </span>
          </div>
        )}
        <div className="border-outline-variant/50 bg-surface/80 absolute top-3 right-3 flex items-center gap-1 rounded-md border px-2 py-1 backdrop-blur-sm">
          <span
            className="material-symbols-outlined text-primary text-[16px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
          <span className="font-label-sm text-label-sm text-on-surface">
            {barber.rating}
          </span>
        </div>
      </div>
      <div className="gap-stack-md p-gutter flex flex-col">
        <div>
          <h3 className="font-headline-md text-headline-md text-on-surface leading-tight">
            {barber.name}
          </h3>
          <p className="font-label-md text-label-md text-on-surface-variant mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">
              near_me
            </span>
            {barber.distance} • {barber.area}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {barber.tags.map((tag) => (
            <span
              key={tag}
              className="border-outline-variant/30 font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant rounded-sm border px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
        {barber.primaryCta ? (
          <Link
            href="/profil-barber"
            className="font-label-md text-label-md bg-primary hover:bg-primary-fixed mt-2 block w-full rounded-lg py-3 text-center font-bold text-[#121212] shadow-[0_4px_12px_rgba(212,175,55,0.2)] transition-colors"
          >
            Voir profil
          </Link>
        ) : (
          <Link
            href="/profil-barber"
            className="font-label-md text-label-md border-outline text-on-surface hover:bg-surface-container-highest mt-2 block w-full rounded-lg border py-3 text-center transition-colors"
          >
            Voir profil
          </Link>
        )}
      </div>
    </article>
  );
}

export default function TrouverUnCoiffeurPage() {
  return (
    <div className="bg-surface font-body-lg text-on-surface min-h-screen pb-24">
      {/* TopAppBar */}
      <header className="bg-surface sticky top-0 z-40 w-full shadow-sm">
        <div className="px-container-margin mx-auto flex h-16 w-full max-w-7xl items-center justify-between">
          <button className="text-primary hover:bg-surface-container-high flex items-center justify-center rounded-full p-2 transition-colors duration-150 active:scale-95">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold tracking-tighter">
            HAJJEM
          </h1>
          <div className="border-outline-variant bg-surface-container-high h-10 w-10 flex-shrink-0 cursor-pointer overflow-hidden rounded-full border transition-opacity hover:opacity-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Portrait de profil de l'utilisateur"
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnsSXzu2i44E7vz6WoQBEjfmBXUf6HtCnlYAt1oW6buiuRYStu_8PluM1ytGZwzCQ6_5YKe4l2jXPfWgjdPOyPP5HJWGlv4jU7rVW82-0XZWpZ-hdJO9ewrUuwH4smLu0zHCmrPrY30zZQdXnraEkGOyIAoIkIRJSXFLnrDLOyYe8gvXejYLab6GdVL6AOgYc1p9wUYpe6Uljo-tFThiC8JCsooIxDBRSlFQVtmnKP8-B1r9sfzIEv3a6vXtnln5YszcPWSm3v98F_"
            />
          </div>
        </div>
      </header>

      <main className="gap-stack-lg px-container-margin pt-stack-md flex flex-col">
        {/* Search Bar */}
        <section className="w-full">
          <div className="group relative w-full">
            <span className="material-symbols-outlined text-on-surface-variant absolute top-1/2 left-4 z-10 -translate-y-1/2">
              search
            </span>
            <input
              type="text"
              placeholder="Rechercher par ville ou nom..."
              className="font-body-md border-outline-variant bg-surface-container-high text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:ring-primary w-full rounded-full border py-4 pr-4 pl-12 shadow-[0_4px_12px_rgba(0,0,0,0.2)] transition-all focus:ring-1 focus:outline-none"
            />
            <button className="bg-surface-variant text-on-surface-variant hover:text-primary absolute top-1/2 right-2 flex -translate-y-1/2 items-center justify-center rounded-full p-2 transition-colors">
              <span className="material-symbols-outlined text-sm">tune</span>
            </button>
          </div>
        </section>

        {/* Quick Filters */}
        <section className="hide-scrollbar -mx-container-margin px-container-margin w-full overflow-x-auto">
          <div className="gap-stack-sm flex min-w-max items-center pb-2">
            <button className="font-label-md text-label-md bg-primary-container/20 border-primary text-primary flex items-center rounded-full border px-4 py-2 whitespace-nowrap shadow-[0_2px_8px_rgba(212,175,55,0.15)] transition-transform active:scale-95">
              <span className="material-symbols-outlined mr-1 align-middle text-[18px]">
                location_on
              </span>
              Tunis
            </button>
            {cityFilters.map((filter) => (
              <button
                key={filter}
                className="font-label-md text-label-md border-outline-variant bg-surface-container-high text-on-surface-variant hover:bg-surface-variant rounded-full border px-4 py-2 whitespace-nowrap transition-colors active:scale-95"
              >
                {filter}
              </button>
            ))}
            <div className="bg-outline-variant mx-2 h-6 w-px" />
            {serviceFilters.map((filter) => (
              <button
                key={filter}
                className="font-label-md text-label-md border-outline-variant bg-surface-container-high text-on-surface-variant hover:bg-surface-variant rounded-full border px-4 py-2 whitespace-nowrap transition-colors active:scale-95"
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* Results Header */}
        <div className="mt-stack-sm flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Coiffeurs à proximité
          </h2>
          <span className="font-label-md text-label-md text-on-surface-variant">
            45 résultats
          </span>
        </div>

        {/* Barber Cards Grid */}
        <section className="gap-gutter grid grid-cols-1 md:grid-cols-2">
          {barbers.map((barber) => (
            <BarberCard key={barber.name} barber={barber} />
          ))}
        </section>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="bg-surface-container text-primary fixed bottom-0 z-50 w-full rounded-t-xl shadow-[0_-4px_12px_rgba(0,0,0,0.5)] md:hidden">
        <div className="pb-safe flex h-20 items-center justify-around px-4">
          <button className="text-on-surface-variant hover:text-primary flex w-16 flex-col items-center justify-center transition-all duration-200 active:translate-y-0.5">
            <span className="material-symbols-outlined mb-1">home</span>
            <span className="font-label-sm text-label-sm">Accueil</span>
          </button>
          <button className="bg-primary-container text-on-primary-container hover:text-primary flex min-w-16 flex-col items-center justify-center rounded-full px-4 py-1 transition-all duration-200 active:translate-y-0.5">
            <span
              className="material-symbols-outlined mb-1"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              search
            </span>
            <span className="font-label-sm text-label-sm">Explorer</span>
          </button>
          <button className="text-on-surface-variant hover:text-primary flex w-16 flex-col items-center justify-center transition-all duration-200 active:translate-y-0.5">
            <span className="material-symbols-outlined mb-1">
              event_upcoming
            </span>
            <span className="font-label-sm text-label-sm">Rendez-vous</span>
          </button>
          <button className="text-on-surface-variant hover:text-primary flex w-16 flex-col items-center justify-center transition-all duration-200 active:translate-y-0.5">
            <span className="material-symbols-outlined mb-1">person</span>
            <span className="font-label-sm text-label-sm">Compte</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
