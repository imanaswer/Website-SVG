import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { env } from "./env";

/**
 * Prisma 7 singleton, lazily initialised.
 *
 * Prisma 7 requires a driver adapter; we use the node-postgres adapter pointed
 * at the pooled (pgbouncer) connection string. The client is created on first
 * use (not at import) so importing this module is safe even before
 * DATABASE_URL is set — the credential-free build never connects. A single
 * instance is cached on `globalThis` to survive Next.js hot-reloads.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getClient(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  if (!env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Add Supabase connection strings to .env (see .env.example).",
    );
  }
  const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
  // Cache unconditionally: one client per process is the singleton we want in
  // production too, and it survives hot-reloads in development. (Caching only
  // outside production would make the proxy build a new pool on every access.)
  globalForPrisma.prisma = new PrismaClient({ adapter });
  return globalForPrisma.prisma;
}

/** Lazy proxy — connects only when a model/method is first accessed. */
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getClient();
    return Reflect.get(client, prop, client);
  },
});

/** True when a database connection is configured. */
export const hasDatabase = Boolean(env.DATABASE_URL);
