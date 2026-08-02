import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

async function main() {
  console.log("Running seed script with DATABASE_URL:", process.env.DATABASE_URL ? "Loaded successfully" : "Missing");
  const { seedAllData } = await import("../src/lib/db/seed");
  try {
    await seedAllData();
    console.log("Seed script finished successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seed script failed:", error);
    process.exit(1);
  }
}

main();
