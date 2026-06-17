import { defineConfig } from "prisma/config";

// Prisma 7 no longer auto-loads .env. Load it with Node's native loader
// (Node 20.12+/22+). Guarded so commands still run if .env is absent.
try {
  process.loadEnvFile();
} catch {
  // no .env yet — connection-less commands (validate/generate) still work
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    // Node runs TypeScript directly via type-stripping on this project's Node version.
    seed: "node prisma/seed.ts",
  },
  datasource: {
    // Migrations use the DIRECT (non-pooled) connection; fall back to DATABASE_URL.
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  },
});
