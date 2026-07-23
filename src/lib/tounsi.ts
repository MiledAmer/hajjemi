"use client";

import { useState } from "react";
import { Calendar, Scissors, Search } from "lucide-react";

export type Lang = "fr" | "tn";

export function useLang(initial: Lang = "tn") {
  const [lang, setLang] = useState<Lang>(initial);
  const toggleLang = () => setLang((l) => (l === "fr" ? "tn" : "fr"));
  return { lang, toggleLang };
}

export const home = {
  fr: {
    switchTo: "TN",
    connexion: "Connexion",
    badge: "Réservation instantanée",
    headlineMobile: "L'Élite du Grooming.",
    headlineDesktop1: "L'Élite du ",
    headlineDesktop2: "Grooming.",
    subtitle:
      "Réservez votre coupe en un clic. Précision, style et excellence à portée de main.",
    subtitleAccent: "احجز موعدك الآن",
    ctaClientTitle: "Trouver un coiffeur",
    ctaClientSub: "Pour les clients",
    ctaProTitle: "Espace Barber",
    ctaProSub: "Pour les professionnels",
    trustCount: "+2000 clients",
    trustSub: "réservent déjà via Hajjem",
    guest: "Explorer en invité",
    ratingSub: "+2000 avis clients",
    howTitle: "Réserver n'a jamais été aussi simple",
    howSub:
      "Trois étapes pour votre prochaine coupe, où que vous soyez en Tunisie.",
    steps: [
      {
        icon: Search,
        title: "Trouvez",
        text: "Explorez les meilleurs barbiers près de chez vous, filtrés par ville et service.",
      },
      {
        icon: Calendar,
        title: "Réservez",
        text: "Choisissez un créneau disponible et confirmez votre rendez-vous en un clic.",
      },
      {
        icon: Scissors,
        title: "Profitez",
        text: "Présentez-vous à l'heure et profitez d'un service haut de gamme, sans attente.",
      },
    ],
    copyright: "© 2026 Hajjem. L'élite du grooming en Tunisie.",
  },
  tn: {
    switchTo: "FR",
    connexion: "Dkhol",
    badge: "Rzervation",
    headlineMobile: "L'Elite mta3 Grooming.",
    headlineDesktop1: "L'Elite mta3 ",
    headlineDesktop2: "Grooming.",
    subtitle:
      "Rzervi hjemtek b click wa7ed. Thi9a, style w excellence been yeddek.",
    subtitleAccent: "A7jez maw3dek tawa",
    ctaClientTitle: "Lawaj coiffeur",
    ctaClientSub: "Lel clients",
    ctaProTitle: "Espace Barber",
    ctaProSub: "Lel professionnels",
    trustCount: "+2000 client",
    trustSub: "rzerviw  Hajjem",
    guest: "Chouf men 8ir ma tsajjel",
    ratingSub: "+2000 avis mta3 clients",
    howTitle: "Rzervi hjjemtek 3ad sahla",
    howSub: "Thlatha khatawet lel hjjama lijeya mte3ek, win ma tkoun fi Tounes.",
    steps: [
      {
        icon: Search,
        title: "Lawej",
        text: "Chouf ahsen hajjem 9rib menek, filtration b belled w service.",
      },
      {
        icon: Calendar,
        title: "Rzervi",
        text: "Ekhtar wa9t disponible w confirmi maw3dek b click wa7ed.",
      },
      {
        icon: Scissors,
        title: "Tmatta3",
        text: "Ejri fel wa9t w tmatta3 b service top, bla ma testenna.",
      },
    ],
    copyright: "© 2026 Hajjem. L'elite mta3 grooming fi Tounes.",
  },
} as const satisfies Record<Lang, unknown>;

export const dashboard = {
  fr: {
    switchTo: "TN",
    nav: {
      dashboard: "Dashboard",
      bookings: "RDV",
      services: "Services",
      profile: "Profil",
    },
    greeting: "Bonjour, Khalil",
    todayCount: "RDV Aujourd'hui",
    upcomingTitle: "Prochains Rendez-vous",
    seeAll: "Voir tout",
    confirmed: "Confirmé",
    bookingsTitle: "Rendez-vous",
    pending: "En attente",
    accept: "Accepter",
    decline: "Décliner",
    done: "Terminé",
    myServices: "Mes Services",
    myProfile: "Mon Profil",
    masterBarber: "Maître Barbier",
    bio: "Spécialiste en coupes classiques et entretien de barbe premium. Plus de 10 ans d'expérience au service de l'élégance masculine à Tunis.",
    callAria: "Appeler",
    shareAria: "Partager",
    editProfileAria: "Modifier le profil",
    editServiceAria: "Modifier",
    deleteAria: "Supprimer",
    hours: "Horaires d'ouverture",
    weekdays: "Lundi - Samedi",
    sunday: "Dimanche",
    closed: "Fermé",
    logout: "Déconnexion",
  },
  tn: {
    switchTo: "FR",
    nav: {
      dashboard: "Dashboard",
      bookings: "RDV",
      services: "Services",
      profile: "Profil",
    },
    greeting: "Ahla, Khalil",
    todayCount: "RDV Lyoum",
    upcomingTitle: "Rendez-vous Jeyin",
    seeAll: "Chouf kol",
    confirmed: "Mou2akad",
    bookingsTitle: "Rendez-vous",
    pending: "Fil intidhar",
    accept: "E9bel",
    decline: "Orfodh",
    done: "Kamel",
    myServices: "Les Services mte3i",
    myProfile: "Profil mte3i",
    masterBarber: "El M3alem ",
    bio: "Mokhtass fi 9assat classique w e3tina bel le7ya. Aktar men 10 snin khebra fi khedmet l2anaka rjeli fi Tounes.",
    callAria: "3ayet",
    shareAria: "9assem",
    editProfileAria: "Badel Profil",
    editServiceAria: "Badel",
    deleteAria: "Na7i",
    hours: "Wa9t El Khedma",
    weekdays: "Ethnin - Sebt",
    sunday: "El Ahad",
    closed: "Ma8lou9",
    logout: "Khrouj",
  },
} as const satisfies Record<Lang, unknown>;

export const addServiceDialog = {
  fr: {
    add: "Ajouter",
    title: "Nouveau service",
    name: "Nom",
    duration: "Durée",
    price: "Prix",
    cancel: "Annuler",
  },
  tn: {
    add: "Zid",
    title: "Service jdid",
    name: "Esm",
    duration: "Mouda",
    price: "Se3r",
    cancel: "Batel",
  },
} as const satisfies Record<Lang, unknown>;

export const editProfileDialog = {
  fr: {
    editAria: "Modifier le profil",
    title: "Modifier le profil",
    name: "Nom",
    bio: "Description",
    weekdays: "Lundi - Samedi",
    sunday: "Dimanche",
    cancel: "Annuler",
    save: "Enregistrer",
  },
  tn: {
    editAria: "Badel Profil",
    title: "Badel Profil",
    name: "Esm",
    bio: "Description",
    weekdays: "Ethnin - Sebt",
    sunday: "El Ahad",
    cancel: "Batel",
    save: "7afedh",
  },
} as const satisfies Record<Lang, unknown>;

export const editServiceDialog = {
  fr: {
    editAria: "Modifier",
    title: "Modifier le service",
    name: "Nom",
    duration: "Durée",
    price: "Prix",
    cancel: "Annuler",
    save: "Enregistrer",
  },
  tn: {
    editAria: "Badel",
    title: "Badel Service",
    name: "Esm",
    duration: "Mouda",
    price: "Se3r",
    cancel: "Batel",
    save: "7afedh",
  },
} as const satisfies Record<Lang, unknown>;
