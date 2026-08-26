import { z } from "zod";

// Single source of email validation (client + server), using Zod's standard
// email check — so no hand-rolled regex to keep in sync.
export const emailSchema = z.string().trim().email("Adresse e-mail invalide.");

export const isValidEmail = (v: string) => emailSchema.safeParse(v.trim()).success;
