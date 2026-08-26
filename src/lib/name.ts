import { z } from "zod";

// Shared name validation (client + server). Whitelist-only, so dangerous
// sequences (SQL/HTML injection, control chars) can't pass — Prisma also
// parameterises queries, this is defence in depth.
//
// Both norms: 2–100 chars, must contain at least one letter (blocks "--", "  ").
// `\p{L}` letters incl. accents, `\p{M}` combining marks, space, apostrophe
// (straight or typographic), hyphen.
const LETTER_LOOKAHEAD = "(?=.*\\p{L})";
const person = new RegExp(`^${LETTER_LOOKAHEAD}[\\p{L}\\p{M}\\s'’-]+$`, "u");
// Salon/business names also allow digits (`\p{N}`) and `&`.
const salon = new RegExp(`^${LETTER_LOOKAHEAD}[\\p{L}\\p{M}\\p{N}\\s'’&-]+$`, "u");

const base = (allowed: RegExp, charsMsg: string) =>
  z
    .string()
    .trim()
    .min(2, "Au moins 2 caractères.")
    .max(100, "100 caractères maximum.")
    .regex(allowed, charsMsg);

export const personNameSchema = base(
  person,
  "Uniquement lettres, espaces, apostrophe et tiret.",
);
export const salonNameSchema = base(
  salon,
  "Caractères non autorisés dans le nom.",
);

const firstError = (schema: z.ZodTypeAny, v: string): string | null => {
  const r = schema.safeParse(v);
  return r.success ? null : (r.error.issues[0]?.message ?? "Valeur invalide.");
};

export const personNameError = (v: string) => firstError(personNameSchema, v);
export const salonNameError = (v: string) => firstError(salonNameSchema, v);
