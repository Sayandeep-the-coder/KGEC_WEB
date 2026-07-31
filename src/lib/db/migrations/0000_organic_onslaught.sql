CREATE TYPE "public"."admission_program" AS ENUM('ug_btech', 'pg_mtech', 'pg_mca');--> statement-breakpoint
CREATE TYPE "public"."audit_action" AS ENUM('create', 'update', 'delete', 'grant', 'revoke');--> statement-breakpoint
CREATE TYPE "public"."department" AS ENUM('cse', 'it', 'ece', 'ee', 'me', 'mca', 'mtech');--> statement-breakpoint
CREATE TYPE "public"."download_category" AS ENUM('general', 'mandatory_disclosure', 'nirf', 'iqac', 'naac', 'notices');--> statement-breakpoint
CREATE TYPE "public"."notice_type" AS ENUM('general', 'admission', 'placement', 'academic', 'exam', 'result');--> statement-breakpoint
CREATE TYPE "public"."staff_role" AS ENUM('principal', 'registrar', 'accounts_officer', 'hod', 'hostel_super', 'caretaker', 'faculty');--> statement-breakpoint
CREATE TABLE "admin_allowlist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"name" text,
	"added_at" timestamp with time zone DEFAULT now() NOT NULL,
	"added_by" uuid,
	CONSTRAINT "admin_allowlist_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "admissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"program" "admission_program" NOT NULL,
	"seat_matrix" jsonb NOT NULL,
	"important_dates" jsonb NOT NULL,
	CONSTRAINT "admissions_program_unique" UNIQUE("program")
);
--> statement-breakpoint
CREATE TABLE "audit_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"admin_id" uuid NOT NULL,
	"admin_email" text NOT NULL,
	"action" "audit_action" NOT NULL,
	"resource" text NOT NULL,
	"resource_id" text,
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"message" text NOT NULL,
	"submitted_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "department_enrollment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"year" integer NOT NULL,
	"department" "department" NOT NULL,
	"total_students" integer NOT NULL,
	"male_students" integer NOT NULL,
	"female_students" integer NOT NULL,
	CONSTRAINT "department_enrollment_year_department_unique" UNIQUE("year","department")
);
--> statement-breakpoint
CREATE TABLE "downloads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"file_url" text NOT NULL,
	"category" "download_category" DEFAULT 'general' NOT NULL,
	"uploaded_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"event_date" timestamp with time zone NOT NULL,
	"external_link" text
);
--> statement-breakpoint
CREATE TABLE "gallery_images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"album" text NOT NULL,
	"image_url" text NOT NULL,
	"caption" text
);
--> statement-breakpoint
CREATE TABLE "institute_enrollment_stats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"year" integer NOT NULL,
	"total_students" integer NOT NULL,
	"total_male" integer NOT NULL,
	"total_female" integer NOT NULL,
	"male_ratio" numeric(5, 2),
	"female_ratio" numeric(5, 2),
	CONSTRAINT "institute_enrollment_stats_year_unique" UNIQUE("year")
);
--> statement-breakpoint
CREATE TABLE "news" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"image_url" text,
	"body" jsonb NOT NULL,
	"published_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "news_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "notices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"type" "notice_type" DEFAULT 'general' NOT NULL,
	"file_url" text,
	"file_name" text,
	"file_type" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"published_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_by" uuid
);
--> statement-breakpoint
CREATE TABLE "placement_departments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"year" integer NOT NULL,
	"department" "department" NOT NULL,
	"students_placed" integer NOT NULL,
	"median_salary" integer,
	"highest_salary" integer,
	CONSTRAINT "placement_departments_year_department_unique" UNIQUE("year","department")
);
--> statement-breakpoint
CREATE TABLE "placement_recruiters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"year" integer NOT NULL,
	"company" text NOT NULL,
	"offers" integer NOT NULL,
	"logo_url" text,
	CONSTRAINT "placement_recruiters_year_company_unique" UNIQUE("year","company")
);
--> statement-breakpoint
CREATE TABLE "placement_stats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"year" integer NOT NULL,
	"students_placed" integer NOT NULL,
	"median_salary" integer,
	"highest_salary" integer,
	CONSTRAINT "placement_stats_year_unique" UNIQUE("year")
);
--> statement-breakpoint
CREATE TABLE "staff" (
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
);
--> statement-breakpoint
ALTER TABLE "audit_log" ADD CONSTRAINT "audit_log_admin_id_admin_allowlist_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."admin_allowlist"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notices" ADD CONSTRAINT "notices_created_by_admin_allowlist_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."admin_allowlist"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "audit_log_resource_idx" ON "audit_log" USING btree ("resource","resource_id");--> statement-breakpoint
CREATE INDEX "audit_log_created_at_idx" ON "audit_log" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "department_enrollment_year_idx" ON "department_enrollment" USING btree ("year");--> statement-breakpoint
CREATE INDEX "downloads_category_idx" ON "downloads" USING btree ("category");--> statement-breakpoint
CREATE INDEX "notices_type_idx" ON "notices" USING btree ("type");--> statement-breakpoint
CREATE INDEX "notices_published_at_idx" ON "notices" USING btree ("published_at");--> statement-breakpoint
CREATE INDEX "placement_departments_year_idx" ON "placement_departments" USING btree ("year");--> statement-breakpoint
CREATE INDEX "staff_role_idx" ON "staff" USING btree ("role");--> statement-breakpoint
CREATE INDEX "staff_department_idx" ON "staff" USING btree ("department");