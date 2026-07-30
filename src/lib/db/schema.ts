import { pgTable, uuid, text, timestamp, boolean, integer, jsonb, pgEnum, unique } from "drizzle-orm/pg-core";

export const staffRoleEnum = pgEnum("staff_role", [
  "principal", "registrar", "accounts_officer", "hod", "hostel_super", "caretaker", "faculty"
]);

export const admissionProgramEnum = pgEnum("admission_program", [
  "ug_btech", "pg_mtech", "pg_mca"
]);

export const noticeCategoryEnum = pgEnum("notice_category", [
  "general", "admission", "placement", "academic", "exam"
]);

export const downloadCategoryEnum = pgEnum("download_category", [
  "general", "mandatory_disclosure", "nirf", "iqac", "naac", "notices"
]);

// NOTE: no `pages`, `departments`, or `staff` tables. That content is static
// (About/Research/IIC/IQAC/NAAC/RTI text, department overviews, and staff bios live in content/*.ts, not the DB).

export const notices = pgTable("notices", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  pdfUrl: text("pdf_url").notNull(),
  category: noticeCategoryEnum("category").default("general").notNull(),
  isNew: boolean("is_new").default(true).notNull(),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const news = pgTable("news", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  imageUrl: text("image_url"),
  body: jsonb("body").notNull(),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  eventDate: timestamp("event_date").notNull(),
  externalLink: text("external_link"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const downloads = pgTable("downloads", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  fileUrl: text("file_url").notNull(),
  category: downloadCategoryEnum("category").default("general").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const galleryImages = pgTable("gallery_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  album: text("album").notNull(),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
});

export const admissions = pgTable("admissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  program: admissionProgramEnum("program").notNull().unique(),
  seatMatrix: jsonb("seat_matrix").notNull(),
  importantDates: jsonb("important_dates").notNull(),
});

export const placementStats = pgTable("placement_stats", {
  id: uuid("id").defaultRandom().primaryKey(),
  year: integer("year").notNull().unique(),
  studentsPlaced: integer("students_placed").notNull(),
  medianSalary: integer("median_salary"),
  highestSalary: integer("highest_salary"),
});

export const placementDepartments = pgTable("placement_departments", {
  id: uuid("id").defaultRandom().primaryKey(),
  year: integer("year").notNull(),
  department: text("department").notNull(),
  studentsPlaced: integer("students_placed").notNull(),
  medianSalary: integer("median_salary"),
  highestSalary: integer("highest_salary"),
}, (t) => ({
  yearDeptUnique: unique().on(t.year, t.department),
}));

export const placementRecruiters = pgTable("placement_recruiters", {
  id: uuid("id").defaultRandom().primaryKey(),
  year: integer("year").notNull(),
  company: text("company").notNull(),
  offers: integer("offers").notNull(),
}, (t) => ({
  yearCompanyUnique: unique().on(t.year, t.company),
}));

export const contactSubmissions = pgTable("contact_submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const passwordResetOtps = pgTable("password_reset_otps", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  otp: text("otp").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  verified: boolean("verified").default(false).notNull(),
  attempts: integer("attempts").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
