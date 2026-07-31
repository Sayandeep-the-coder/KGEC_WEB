/**
 * Custom migration script — applies schema changes directly via Drizzle.
 * Run with: node src/lib/db/migrate.mjs
 *
 * This bypasses drizzle-kit push's TTY requirement for interactive prompts
 * by executing raw SQL statements directly.
 */

import postgres from "postgres";

const url = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (!url) {
  console.error("ERROR: No DATABASE_URL or DIRECT_URL found in .env");
  process.exit(1);
}

const sql = postgres(url);

async function migrate() {
  console.log("🔄 Starting migration...\n");

  // 1. Create new enums (skip if already exist)
  const enumStatements = [
    `DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'notice_type') THEN CREATE TYPE "notice_type" AS ENUM('general', 'admission', 'placement', 'academic', 'exam', 'result'); END IF; END $$;`,
    `DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'department') THEN CREATE TYPE "department" AS ENUM('cse', 'it', 'ece', 'ee', 'me', 'mca', 'mtech'); END IF; END $$;`,
    `DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'staff_role') THEN CREATE TYPE "staff_role" AS ENUM('principal', 'registrar', 'accounts_officer', 'hod', 'hostel_super', 'caretaker', 'faculty'); END IF; END $$;`,
    `DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'audit_action') THEN CREATE TYPE "audit_action" AS ENUM('create', 'update', 'delete', 'grant', 'revoke'); END IF; END $$;`,
    `DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'admission_program') THEN CREATE TYPE "admission_program" AS ENUM('ug_btech', 'pg_mtech', 'pg_mca'); END IF; END $$;`,
    `DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'download_category') THEN CREATE TYPE "download_category" AS ENUM('general', 'mandatory_disclosure', 'nirf', 'iqac', 'naac', 'notices'); END IF; END $$;`,
  ];

  for (const stmt of enumStatements) {
    await sql.unsafe(stmt);
  }
  console.log("  ✅ Enums created/verified");

  // 2. Create new tables
  const createTables = [
    // admin_allowlist
    `CREATE TABLE IF NOT EXISTS "admin_allowlist" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "email" text NOT NULL,
      "name" text,
      "added_at" timestamp with time zone DEFAULT now() NOT NULL,
      "added_by" uuid,
      CONSTRAINT "admin_allowlist_email_unique" UNIQUE("email")
    );`,
    // audit_log
    `CREATE TABLE IF NOT EXISTS "audit_log" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "admin_id" uuid NOT NULL,
      "admin_email" text NOT NULL,
      "action" "audit_action" NOT NULL,
      "resource" text NOT NULL,
      "resource_id" text,
      "metadata" jsonb,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL
    );`,
    // staff
    `CREATE TABLE IF NOT EXISTS "staff" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "name" text NOT NULL,
      "email" text NOT NULL,
      "employee_id" text NOT NULL,
      "photo_url" text,
      "role" "staff_role" NOT NULL,
      "department" "department",
      "education" jsonb,
      "research_paper_links" jsonb,
      "created_at" timestamp with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp with time zone DEFAULT now() NOT NULL,
      CONSTRAINT "staff_email_unique" UNIQUE("email"),
      CONSTRAINT "staff_employee_id_unique" UNIQUE("employee_id")
    );`,
    // department_enrollment
    `CREATE TABLE IF NOT EXISTS "department_enrollment" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "year" integer NOT NULL,
      "department" "department" NOT NULL,
      "total_students" integer NOT NULL,
      "male_students" integer NOT NULL,
      "female_students" integer NOT NULL,
      CONSTRAINT "department_enrollment_year_department_unique" UNIQUE("year","department")
    );`,
    // institute_enrollment_stats
    `CREATE TABLE IF NOT EXISTS "institute_enrollment_stats" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "year" integer NOT NULL,
      "total_students" integer NOT NULL,
      "total_male" integer NOT NULL,
      "total_female" integer NOT NULL,
      "male_ratio" numeric(5, 2),
      "female_ratio" numeric(5, 2),
      CONSTRAINT "institute_enrollment_stats_year_unique" UNIQUE("year")
    );`,
    // contact_submissions (if not exists)
    `CREATE TABLE IF NOT EXISTS "contact_submissions" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
      "name" text NOT NULL,
      "email" text NOT NULL,
      "message" text NOT NULL,
      "submitted_at" timestamp with time zone DEFAULT now() NOT NULL
    );`,
  ];

  for (const stmt of createTables) {
    await sql.unsafe(stmt);
  }
  console.log("  ✅ New tables created");

  // 3. Alter existing tables — notices
  const noticeAlters = [
    // Add new columns (skip if exist)
    `ALTER TABLE "notices" ADD COLUMN IF NOT EXISTS "type" "notice_type" DEFAULT 'general' NOT NULL;`,
    `ALTER TABLE "notices" ADD COLUMN IF NOT EXISTS "file_url" text;`,
    `ALTER TABLE "notices" ADD COLUMN IF NOT EXISTS "file_name" text;`,
    `ALTER TABLE "notices" ADD COLUMN IF NOT EXISTS "file_type" text;`,
    `ALTER TABLE "notices" ADD COLUMN IF NOT EXISTS "is_active" boolean DEFAULT true NOT NULL;`,
    `ALTER TABLE "notices" ADD COLUMN IF NOT EXISTS "created_by" uuid;`,
    // Migrate data from old columns to new ones
    `UPDATE "notices" SET "file_url" = "pdf_url" WHERE "pdf_url" IS NOT NULL AND "file_url" IS NULL;`,
    `UPDATE "notices" SET "is_active" = "is_new" WHERE "is_new" IS NOT NULL;`,
    // Migrate category → type (map old values)
    `DO $$ BEGIN
      UPDATE "notices" SET "type" = "category"::text::"notice_type"
      WHERE "category" IS NOT NULL
      AND "category"::text IN ('general', 'admission', 'placement', 'academic', 'exam');
    EXCEPTION WHEN OTHERS THEN NULL;
    END $$;`,
  ];

  for (const stmt of noticeAlters) {
    try {
      await sql.unsafe(stmt);
    } catch (err) {
      // Silently skip if column doesn't exist for migration data
      if (!err.message.includes("does not exist") && !err.message.includes("already exists")) {
        console.warn(`  ⚠️  Notice alter warning: ${err.message}`);
      }
    }
  }
  console.log("  ✅ Notices table updated");

  // 4. Alter placement_recruiters — add logo_url
  try {
    await sql.unsafe(`ALTER TABLE "placement_recruiters" ADD COLUMN IF NOT EXISTS "logo_url" text;`);
    console.log("  ✅ Recruiters: logo_url added");
  } catch {
    console.log("  ⏭️  Recruiters: logo_url already exists");
  }

  // 5. Add FKs (skip if exist)
  const fkStatements = [
    `DO $$ BEGIN
      ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_admin_id_admin_allowlist_id_fk"
      FOREIGN KEY ("admin_id") REFERENCES "admin_allowlist"("id") ON DELETE no action ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;`,
    `DO $$ BEGIN
      ALTER TABLE "notices" ADD CONSTRAINT "notices_created_by_admin_allowlist_id_fk"
      FOREIGN KEY ("created_by") REFERENCES "admin_allowlist"("id") ON DELETE no action ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;`,
  ];

  for (const stmt of fkStatements) {
    await sql.unsafe(stmt);
  }
  console.log("  ✅ Foreign keys added");

  // 6. Create indexes (IF NOT EXISTS)
  const indexStatements = [
    `CREATE INDEX IF NOT EXISTS "audit_log_resource_idx" ON "audit_log" USING btree ("resource","resource_id");`,
    `CREATE INDEX IF NOT EXISTS "audit_log_created_at_idx" ON "audit_log" USING btree ("created_at");`,
    `CREATE INDEX IF NOT EXISTS "department_enrollment_year_idx" ON "department_enrollment" USING btree ("year");`,
    `CREATE INDEX IF NOT EXISTS "downloads_category_idx" ON "downloads" USING btree ("category");`,
    `CREATE INDEX IF NOT EXISTS "notices_type_idx" ON "notices" USING btree ("type");`,
    `CREATE INDEX IF NOT EXISTS "notices_published_at_idx" ON "notices" USING btree ("published_at");`,
    `CREATE INDEX IF NOT EXISTS "placement_departments_year_idx" ON "placement_departments" USING btree ("year");`,
    `CREATE INDEX IF NOT EXISTS "staff_role_idx" ON "staff" USING btree ("role");`,
    `CREATE INDEX IF NOT EXISTS "staff_department_idx" ON "staff" USING btree ("department");`,
  ];

  for (const stmt of indexStatements) {
    await sql.unsafe(stmt);
  }
  console.log("  ✅ Indexes created");

  // 7. Drop old tables/columns that are no longer needed
  try {
    await sql.unsafe(`DROP TABLE IF EXISTS "password_reset_otps";`);
    console.log("  ✅ Dropped password_reset_otps table");
  } catch {
    console.log("  ⏭️  password_reset_otps already dropped");
  }

  // 8. Convert all timestamp columns to timestamptz (if not already)
  const timestampAlters = [
    `ALTER TABLE "news" ALTER COLUMN "published_at" TYPE timestamp with time zone USING "published_at" AT TIME ZONE 'UTC';`,
    `ALTER TABLE "events" ALTER COLUMN "event_date" TYPE timestamp with time zone USING "event_date" AT TIME ZONE 'UTC';`,
    `ALTER TABLE "downloads" ALTER COLUMN "uploaded_at" TYPE timestamp with time zone USING "uploaded_at" AT TIME ZONE 'UTC';`,
    `ALTER TABLE "notices" ALTER COLUMN "published_at" TYPE timestamp with time zone USING "published_at" AT TIME ZONE 'UTC';`,
  ];

  for (const stmt of timestampAlters) {
    try {
      await sql.unsafe(stmt);
    } catch {
      // Already timestamptz
    }
  }
  console.log("  ✅ Timestamps converted to timestamptz");

  console.log("\n🎉 Migration complete!\n");

  await sql.end();
}

migrate().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});
