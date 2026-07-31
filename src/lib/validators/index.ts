import { z } from "zod";

// ─── Enum validators ────────────────────────────────────────────────────────

export const noticeTypeValues = [
  "general", "admission", "placement", "academic", "exam", "result",
] as const;
export const noticeTypeEnum = z.enum(noticeTypeValues);

export const downloadCategoryValues = [
  "general", "mandatory_disclosure", "nirf", "iqac", "naac", "notices",
] as const;
export const downloadCategoryEnum = z.enum(downloadCategoryValues);

export const admissionProgramValues = ["ug_btech", "pg_mtech", "pg_mca"] as const;
export const admissionProgramEnum = z.enum(admissionProgramValues);

export const departmentValues = [
  "cse", "it", "ece", "ee", "me", "mca", "mtech",
] as const;
export const departmentEnum = z.enum(departmentValues);

export const staffRoleValues = [
  "principal", "registrar", "accounts_officer", "hod",
  "hostel_super", "caretaker", "faculty",
] as const;
export const staffRoleEnum = z.enum(staffRoleValues);

// ─── Notices ────────────────────────────────────────────────────────────────

export const noticeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(255, "Title cannot exceed 255 characters"),
  type: noticeTypeEnum.default("general"),
  fileUrl: z.string().url("Valid file URL is required").or(z.literal("")).optional().nullable(),
  fileName: z.string().max(255).optional().nullable(),
  fileType: z.string().max(100).optional().nullable(),
  isActive: z.boolean().optional().default(true),
});

export const noticePatchSchema = noticeSchema.partial();

// ─── News ───────────────────────────────────────────────────────────────────

export const newsSchema = z.object({
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(100, "Slug cannot exceed 100 characters")
    .regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase alphanumeric characters and hyphens"),
  title: z.string().min(3, "Title must be at least 3 characters").max(255, "Title cannot exceed 255 characters"),
  excerpt: z.string().max(500, "Excerpt cannot exceed 500 characters").optional().nullable(),
  imageUrl: z.string().url("Valid image URL is required").or(z.literal("")).optional().nullable(),
  category: z.string().max(50).optional().default("campus"),
  body: z.union([z.string(), z.record(z.string(), z.unknown()), z.array(z.unknown())]),
  isPublished: z.boolean().optional().default(true),
});

export const newsPatchSchema = newsSchema.partial();

// ─── Events ─────────────────────────────────────────────────────────────────

export const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(255, "Title cannot exceed 255 characters"),
  description: z.string().max(2000, "Description cannot exceed 2000 characters").optional().nullable(),
  location: z.string().max(255, "Location cannot exceed 255 characters").optional().nullable(),
  imageUrl: z.string().url().or(z.literal("")).optional().nullable(),
  eventDate: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
  externalLink: z.string().url().or(z.literal("")).optional().nullable(),
});

export const eventPatchSchema = eventSchema.partial();

// ─── Downloads ──────────────────────────────────────────────────────────────

export const downloadSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(255, "Title cannot exceed 255 characters"),
  fileUrl: z.string().url("Valid file URL is required"),
  category: downloadCategoryEnum.default("general"),
});

export const downloadPatchSchema = downloadSchema.partial();

// ─── Gallery ────────────────────────────────────────────────────────────────

export const gallerySchema = z.object({
  album: z.string().min(2, "Album name must be at least 2 characters").max(100, "Album cannot exceed 100 characters"),
  imageUrl: z.string().url("Valid image URL is required"),
  caption: z.string().max(300, "Caption cannot exceed 300 characters").optional().nullable(),
});

export const galleryPatchSchema = gallerySchema.partial();

// ─── Admissions ─────────────────────────────────────────────────────────────

export const admissionsPatchSchema = z.object({
  seatMatrix: z.record(z.string(), z.unknown()).optional(),
  importantDates: z
    .record(z.string(), z.unknown())
    .or(z.array(z.unknown()))
    .optional(),
});

// ─── Contact ────────────────────────────────────────────────────────────────

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name cannot exceed 100 characters"),
  email: z.string().email("Invalid email address").max(255),
  message: z.string().min(10, "Message must be at least 10 characters long").max(2000, "Message cannot exceed 2000 characters"),
});

// ─── Placement CSV rows ─────────────────────────────────────────────────────

export const placementDeptRowSchema = z.object({
  year: z.number().int("Year must be an integer").min(2000).max(2100),
  department: z.string().min(1, "Department is required"),
  students_placed: z
    .number()
    .int()
    .nonnegative("Students placed must be a non-negative integer"),
  median_salary: z.number().int().nullable().optional(),
  highest_salary: z.number().int().nullable().optional(),
});

export const placementRecruiterRowSchema = z.object({
  year: z.number().int("Year must be an integer").min(2000).max(2100),
  company: z.string().min(1, "Company is required"),
  offers: z
    .number()
    .int()
    .nonnegative("Offers must be a non-negative integer"),
});

// ─── Enrollment CSV rows ────────────────────────────────────────────────────

export const departmentEnrollmentRowSchema = z
  .object({
    year: z.number().int("Year must be an integer").min(2000).max(2100),
    department: z.string().min(1, "Department is required"),
    total_students: z.number().int().nonnegative(),
    male_students: z.number().int().nonnegative(),
    female_students: z.number().int().nonnegative(),
  })
  .refine(
    (data) => data.male_students + data.female_students === data.total_students,
    {
      message: "male_students + female_students must equal total_students",
      path: ["total_students"],
    }
  );

// ─── Staff ──────────────────────────────────────────────────────────────────

export const staffSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(150, "Name cannot exceed 150 characters"),
  email: z.string().email("Valid email is required").max(255),
  employeeId: z.string().min(2, "Employee ID must be at least 2 characters").max(30).regex(/^[A-Za-z0-9_-]+$/, "Employee ID contains invalid characters"),
  photoUrl: z.string().url().or(z.literal("")).optional().nullable(),
  phone: z.string().max(20).optional().nullable(),
  designation: z.string().max(100).optional().nullable(),
  role: staffRoleEnum,
  department: departmentEnum.optional().nullable(),
  education: z
    .array(
      z.object({
        degree: z.string(),
        institution: z.string(),
        year: z.number().int().optional(),
      })
    )
    .optional()
    .nullable(),
  researchPaperLinks: z
    .array(z.object({ title: z.string(), url: z.string().url() }))
    .optional()
    .nullable(),
});

export const staffPatchSchema = staffSchema.partial();

// ─── Admin Allowlist ────────────────────────────────────────────────────────

export const allowlistSchema = z.object({
  email: z.string().email("Valid email is required"),
  name: z.string().max(150).optional().nullable(),
});

// ─── Signed URL ─────────────────────────────────────────────────────────────

export const signedUrlSchema = z.object({
  bucket: z.enum([
    "notices",
    "downloads",
    "gallery",
    "news",
    "staff",
    "recruiters",
  ]),
  filename: z.string().min(1, "Filename is required"),
  contentType: z.enum(
    [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
      "text/csv",
      "application/vnd.ms-excel",
    ],
    {
      message:
        "Invalid file type. Allowed: JPEG, PNG, WEBP, PDF, CSV.",
    }
  ),
});

// ─── Recruiter logo patch ───────────────────────────────────────────────────

export const recruiterLogoPatchSchema = z.object({
  logoUrl: z.string().url("Valid logo URL is required"),
});

// ─── Query Params Validation ────────────────────────────────────────────────

export const paginationQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});
