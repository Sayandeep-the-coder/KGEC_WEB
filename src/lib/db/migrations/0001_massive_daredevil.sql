CREATE TYPE "public"."alumni_category" AS ENUM('space_research', 'big_tech', 'founder', 'academia', 'general');--> statement-breakpoint
CREATE TABLE "alumni" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"batch_year" integer NOT NULL,
	"department" text NOT NULL,
	"current_role" text NOT NULL,
	"company" text NOT NULL,
	"location" text,
	"category" "alumni_category" DEFAULT 'general' NOT NULL,
	"bio" text,
	"photo_url" text,
	"linkedin_url" text,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "department_details" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"established" text NOT NULL,
	"degrees_offered" jsonb NOT NULL,
	"head_of_department" text NOT NULL,
	"overview" text NOT NULL,
	"detailed_overview" jsonb NOT NULL,
	"vision" text NOT NULL,
	"mission" jsonb NOT NULL,
	"laboratories" jsonb NOT NULL,
	"seat_matrix" jsonb NOT NULL,
	"total_annual_capacity" integer NOT NULL,
	"enrollment_5_year" jsonb,
	"placement_5_year" jsonb,
	"recent_metrics" jsonb,
	"student_achievements" text NOT NULL,
	"achievement_highlights" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "department_details_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "excerpt" text;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "category" text DEFAULT 'campus' NOT NULL;--> statement-breakpoint
ALTER TABLE "news" ADD COLUMN "is_published" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "notices" ADD COLUMN "pdf_url" text;--> statement-breakpoint
ALTER TABLE "placement_departments" ADD COLUMN "placement_rate" numeric;--> statement-breakpoint
ALTER TABLE "placement_departments" ADD COLUMN "total_offers" integer;--> statement-breakpoint
ALTER TABLE "staff" ADD COLUMN "designation" text;--> statement-breakpoint
ALTER TABLE "staff" ADD COLUMN "specialization" text;--> statement-breakpoint
CREATE INDEX "alumni_category_idx" ON "alumni" USING btree ("category");--> statement-breakpoint
CREATE INDEX "alumni_batch_idx" ON "alumni" USING btree ("batch_year");--> statement-breakpoint
CREATE INDEX "department_details_slug_idx" ON "department_details" USING btree ("slug");