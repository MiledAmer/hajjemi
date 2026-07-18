import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Prisma 7 config: Migrate/Studio/db push read the connection URL from here
// instead of `datasource { url }` in schema.prisma. The app itself still
// gets DATABASE_URL through the validated src/env.js (see src/server/db.ts).
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
