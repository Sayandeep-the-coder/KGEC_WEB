import { z } from "zod";

export const noticeCategoryEnum = z.enum(["general", "admission", "placement", "academic", "exam"]);
export const downloadCategoryEnum = z.enum(["general", "mandatory_disclosure", "nirf", "iqac", "naac", "notices"]);
export const admissionProgramEnum = z.enum(["ug_btech", "pg_mtech", "pg_mca"]);

export const noticeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  pdfUrl: z.string().url("Valid PDF URL is required"),
  category: noticeCategoryEnum.default("general"),
  isNew: z.boolean().optional(),
});

export const noticePatchSchema = noticeSchema.partial();

export const newsSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
  title: z.string().min(1, "Title is required"),
  imageUrl: z.string().url().optional().nullable(),
  body: z.record(z.string(), z.unknown()).or(z.array(z.unknown())),
});

export const newsPatchSchema = newsSchema.partial();

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().nullable(),
  eventDate: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
  externalLink: z.string().url().optional().nullable(),
});

export const eventPatchSchema = eventSchema.partial();

export const downloadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  fileUrl: z.string().url("Valid file URL is required"),
  category: downloadCategoryEnum.default("general"),
});

export const gallerySchema = z.object({
  album: z.string().min(1, "Album name is required"),
  imageUrl: z.string().url("Valid image URL is required"),
  caption: z.string().optional().nullable(),
});

export const admissionsPatchSchema = z.object({
  seatMatrix: z.record(z.string(), z.unknown()).optional(),
  importantDates: z.record(z.string(), z.unknown()).or(z.array(z.unknown())).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export const placementDeptRowSchema = z.object({
  year: z.number().int("Year must be an integer"),
  department: z.string().min(1, "Department is required"),
  students_placed: z.number().int().nonnegative("Students placed must be a non-negative integer"),
  median_salary: z.number().int().nullable().optional(),
  highest_salary: z.number().int().nullable().optional(),
});

export const placementRecruiterRowSchema = z.object({
  year: z.number().int("Year must be an integer"),
  company: z.string().min(1, "Company is required"),
  offers: z.number().int().nonnegative("Offers must be a non-negative integer"),
});

export const signedUrlSchema = z.object({
  bucket: z.enum(["notices", "downloads", "gallery", "news"]),
  filename: z.string().min(1, "Filename is required"),
  contentType: z.enum(
    ["image/jpeg", "image/png", "image/webp", "application/pdf"],
    { message: "Invalid file type. Only JPEG, PNG, WEBP, and PDF are allowed." }
  ),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Valid email is required"),
});

export const verifyOtpSchema = z.object({
  email: z.string().email("Valid email is required"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Valid email is required"),
  otp: z.string().length(6, "OTP must be 6 digits"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});
