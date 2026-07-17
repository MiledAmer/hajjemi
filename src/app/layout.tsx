import "@/styles/globals.css";

import { type Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";

export const metadata: Metadata = {
  title: "Hajjem - Premium Barber App",
  description: "Réservez votre coupe en un clic.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`dark ${hanken.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col overflow-x-hidden bg-surface font-body-md text-on-surface selection:bg-primary-container selection:text-on-primary-container md:items-center md:justify-center md:bg-surface-container-lowest md:py-12">
        {children}
      </body>
    </html>
  );
}
