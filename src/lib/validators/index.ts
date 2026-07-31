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
  title: z.string().min(1, "Title is required"),
  type: noticeTypeEnum.default("general"),
  fileUrl: z.string().url("Valid file URL is required").optional().nullable(),
  fileName: z.string().optional().nullable(),
  fileType: z.string().optional().nullable(),
});

export const noticePatchSchema = noticeSchema.partial();

// ─── News ───────────────────────────────────────────────────────────────────

export const newsSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  imageUrl: z.string().url().optional().nullable(),
  body: z.record(z.string(), z.unknown()).or(z.array(z.unknown())),
});

export const newsPatchSchema = newsSchema.partial();

// ─── Events ─────────────────────────────────────────────────────────────────

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().nullable(),
  eventDate: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
  externalLink: z.string().url().optional().nullable(),
});

export const eventPatchSchema = eventSchema.partial();

// ─── Downloads ──────────────────────────────────────────────────────────────

export const downloadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  fileUrl: z.string().url("Valid file URL is required"),
  category: downloadCategoryEnum.default("general"),
});

// ─── Gallery ────────────────────────────────────────────────────────────────

export const gallerySchema = z.object({
  album: z.string().min(1, "Album name is required"),
  imageUrl: z.string().url("Valid image URL is required"),
  caption: z.string().optional().nullable(),
});

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
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

// ─── Placement CSV rows ─────────────────────────────────────────────────────

export const placementDeptRowSchema = z.object({
  year: z.number().int("Year must be an integer"),
  department: z.string().min(1, "Department is required"),
  students_placed: z
    .number()
    .int()
    .nonnegative("Students placed must be a non-negative integer"),
  median_salary: z.number().int().nullable().optional(),
  highest_salary: z.number().int().nullable().optional(),
});

export const placementRecruiterRowSchema = z.object({
  year: z.number().int("Year must be an integer"),
  company: z.string().min(1, "Company is required"),
  offers: z
    .number()
    .int()
    .nonnegative("Offers must be a non-negative integer"),
});

// ─── Enrollment CSV rows ────────────────────────────────────────────────────

export const departmentEnrollmentRowSchema = z
  .object({
    year: z.number().int("Year must be an integer"),
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
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  employeeId: z.string().min(1, "Employee ID is required"),
  photoUrl: z.string().url().optional().nullable(),
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
  name: z.string().optional().nullable(),
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
