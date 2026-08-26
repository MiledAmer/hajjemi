# Hajjem

Application mobile-first de réservation de coiffeurs/barbiers pour le marché tunisien.
Deux rôles : **clients** (recherche et réservation) et **barbiers** (gestion de leur activité).

Bâti avec le [T3 Stack](https://create.t3.gg/) : Next.js (App Router), Prisma/Postgres, Tailwind, Clerk.

## Démarrage

```bash
cp .env.example .env      # renseigner les variables
npm install
npm run dev               # http://localhost:3000
```

## Commandes

- `npm run dev` — serveur de développement
- `npm run build` / `npm run start` — build / exécution en production
- `npm run check` — lint + typecheck
- `npm run db:generate` — migration Prisma (dev)
- `npm run db:studio` — Prisma Studio

## Structure

- `src/app/` — pages et routes (App Router)
- `src/server/` — accès base de données, uploads, intégrations
- `prisma/` — schéma et migrations
- `tests/` — tests end-to-end (branche `test`)
