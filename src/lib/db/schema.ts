import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  pgEnum,
  unique,
  numeric,
  index,
} from "drizzle-orm/pg-core";

// ─── Enums ──────────────────────────────────────────────────────────────────

export const noticeTypeEnum = pgEnum("notice_type", [
  "general",
  "admission",
  "placement",
  "academic",
  "exam",
  "result",
]);

export const downloadCategoryEnum = pgEnum("download_category", [
  "general",
  "mandatory_disclosure",
  "nirf",
  "iqac",
  "naac",
  "notices",
]);

export const admissionProgramEnum = pgEnum("admission_program", [
  "ug_btech",
  "pg_mtech",
  "pg_mca",
]);

export const departmentEnum = pgEnum("department", [
  "cse",
  "it",
  "ece",
  "ee",
  "me",
  "mca",
  "mtech",
]);

export const staffRoleEnum = pgEnum("staff_role", [
  "principal",
  "registrar",
  "accounts_officer",
  "hod",
  "hostel_super",
  "caretaker",
  "faculty",
]);

export const auditActionEnum = pgEnum("audit_action", [
  "create",
  "update",
  "delete",
  "grant",
  "revoke",
]);

// ─── Admin Allowlist ────────────────────────────────────────────────────────

export const adminAllowlist = pgTable("admin_allowlist", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  addedAt: timestamp("added_at", { withTimezone: true }).defaultNow().notNull(),
  addedBy: uuid("added_by"),
});

// ─── Notices ────────────────────────────────────────────────────────────────

export const notices = pgTable(
  "notices",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    type: noticeTypeEnum("type").default("general").notNull(),
    fileUrl: text("file_url"),
    pdfUrl: text("pdf_url"),
    fileName: text("file_name"),
    fileType: text("file_type"),
    isActive: boolean("is_active").default(true).notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    createdBy: uuid("created_by").references(() => adminAllowlist.id),
  },
  (t) => ({
    typeIdx: index("notices_type_idx").on(t.type),
    publishedAtIdx: index("notices_published_at_idx").on(t.publishedAt),
  })
);

// ─── News ───────────────────────────────────────────────────────────────────

export const news = pgTable("news", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  imageUrl: text("image_url"),
  category: text("category").default("campus").notNull(),
  body: jsonb("body").notNull(),
  isPublished: boolean("is_published").default(true).notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ─── Events ─────────────────────────────────────────────────────────────────

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  location: text("location"),
  eventDate: timestamp("event_date", { withTimezone: true }).notNull(),
  externalLink: text("external_link"),
});

// ─── Downloads ──────────────────────────────────────────────────────────────

export const downloads = pgTable(
  "downloads",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    fileUrl: text("file_url").notNull(),
    category: downloadCategoryEnum("category").default("general").notNull(),
    uploadedAt: timestamp("uploaded_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    categoryIdx: index("downloads_category_idx").on(t.category),
  })
);

// ─── Gallery ────────────────────────────────────────────────────────────────

export const galleryImages = pgTable("gallery_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  album: text("album").notNull(),
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
});

// ─── Admissions ─────────────────────────────────────────────────────────────

export const admissions = pgTable("admissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  program: admissionProgramEnum("program").notNull().unique(),
  seatMatrix: jsonb("seat_matrix").notNull(),
  importantDates: jsonb("important_dates").notNull(),
});

// ─── Placement Stats (year-level rollup) ────────────────────────────────────

export const placementStats = pgTable("placement_stats", {
  id: uuid("id").defaultRandom().primaryKey(),
  year: integer("year").notNull().unique(),
  studentsPlaced: integer("students_placed").notNull(),
  medianSalary: integer("median_salary"),
  highestSalary: integer("highest_salary"),
});

// ─── Placement Departments ──────────────────────────────────────────────────

export const placementDepartments = pgTable(
  "placement_departments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    year: integer("year").notNull(),
    department: departmentEnum("department").notNull(),
    studentsPlaced: integer("students_placed").notNull(),
    medianSalary: integer("median_salary"),
    highestSalary: integer("highest_salary"),
    placementRate: numeric("placement_rate"),
    totalOffers: integer("total_offers"),
  },
  (t) => ({
    yearDeptUnique: unique().on(t.year, t.department),
    yearIdx: index("placement_departments_year_idx").on(t.year),
  })
);

// ─── Placement Recruiters ───────────────────────────────────────────────────

export const placementRecruiters = pgTable(
  "placement_recruiters",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    year: integer("year").notNull(),
    company: text("company").notNull(),
    offers: integer("offers").notNull(),
    logoUrl: text("logo_url"),
  },
  (t) => ({
    yearCompanyUnique: unique().on(t.year, t.company),
  })
);

// ─── Department Enrollment ──────────────────────────────────────────────────

export const departmentEnrollment = pgTable(
  "department_enrollment",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    year: integer("year").notNull(),
    department: departmentEnum("department").notNull(),
    totalStudents: integer("total_students").notNull(),
    maleStudents: integer("male_students").notNull(),
    femaleStudents: integer("female_students").notNull(),
  },
  (t) => ({
    yearDeptUnique: unique().on(t.year, t.department),
    yearIdx: index("department_enrollment_year_idx").on(t.year),
  })
);

// ─── Institute Enrollment Stats (year-level rollup) ─────────────────────────

export const instituteEnrollmentStats = pgTable("institute_enrollment_stats", {
  id: uuid("id").defaultRandom().primaryKey(),
  year: integer("year").notNull().unique(),
  totalStudents: integer("total_students").notNull(),
  totalMale: integer("total_male").notNull(),
  totalFemale: integer("total_female").notNull(),
  maleRatio: numeric("male_ratio", { precision: 5, scale: 2 }),
  femaleRatio: numeric("female_ratio", { precision: 5, scale: 2 }),
});

// ─── Staff ──────────────────────────────────────────────────────────────────

export const staff = pgTable(
  "staff",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    employeeId: text("employee_id").notNull().unique(),
    photoUrl: text("photo_url"),
    role: staffRoleEnum("role").notNull(),
    designation: text("designation"),
    specialization: text("specialization"),
    department: departmentEnum("department"),
    education: jsonb("education"),
    researchPaperLinks: jsonb("research_paper_links"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    roleIdx: index("staff_role_idx").on(t.role),
    departmentIdx: index("staff_department_idx").on(t.department),
  })
);

// ─── Contact Submissions ────────────────────────────────────────────────────

export const contactSubmissions = pgTable("contact_submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  submittedAt: timestamp("submitted_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ─── Audit Log ──────────────────────────────────────────────────────────────

export const auditLog = pgTable(
  "audit_log",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    adminId: uuid("admin_id")
      .references(() => adminAllowlist.id)
      .notNull(),
    adminEmail: text("admin_email").notNull(),
    action: auditActionEnum("action").notNull(),
    resource: text("resource").notNull(),
    resourceId: text("resource_id"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    resourceIdx: index("audit_log_resource_idx").on(t.resource, t.resourceId),
    createdAtIdx: index("audit_log_created_at_idx").on(t.createdAt),
  })
);

// ─── Alumni ─────────────────────────────────────────────────────────────────

export const alumniCategoryEnum = pgEnum("alumni_category", [
  "space_research",
  "big_tech",
  "founder",
  "academia",
  "general",
]);

export const alumni = pgTable(
  "alumni",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    batchYear: integer("batch_year").notNull(),
    department: text("department").notNull(),
    currentRole: text("current_role").notNull(),
    company: text("company").notNull(),
    location: text("location"),
    category: alumniCategoryEnum("category").default("general").notNull(),
    bio: text("bio"),
    photoUrl: text("photo_url"),
    linkedinUrl: text("linkedin_url"),
    featured: boolean("featured").default(false).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    categoryIdx: index("alumni_category_idx").on(t.category),
    batchIdx: index("alumni_batch_idx").on(t.batchYear),
  })
);

// ─── Department Details ─────────────────────────────────────────────────────

export const departmentDetails = pgTable(
  "department_details",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    code: text("code").notNull(),
    established: text("established").notNull(),
    degreesOffered: jsonb("degrees_offered").notNull(),
    headOfDepartment: text("head_of_department").notNull(),
    overview: text("overview").notNull(),
    detailedOverview: jsonb("detailed_overview").notNull(),
    vision: text("vision").notNull(),
    mission: jsonb("mission").notNull(),
    laboratories: jsonb("laboratories").notNull(),
    seatMatrix: jsonb("seat_matrix").notNull(),
    totalAnnualCapacity: integer("total_annual_capacity").notNull(),
    enrollment5Year: jsonb("enrollment_5_year"),
    placement5Year: jsonb("placement_5_year"),
    recentMetrics: jsonb("recent_metrics"),
    studentAchievements: text("student_achievements").notNull(),
    achievementHighlights: jsonb("achievement_highlights").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => ({
    slugIdx: index("department_details_slug_idx").on(t.slug),
  })
);

