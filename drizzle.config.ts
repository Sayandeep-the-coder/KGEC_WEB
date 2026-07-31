import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./src/lib/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    // Use DIRECT_URL (port 5432) for migrations — the Supavisor pooler
    // (port 6543) doesn't support the extended query protocol needed
    // by drizzle-kit for schema introspection.
    url: process.env.DIRECT_URL || process.env.DATABASE_URL || "",
  },
});
