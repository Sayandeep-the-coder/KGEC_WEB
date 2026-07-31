import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  departmentEnrollment,
  instituteEnrollmentStats,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { departmentEnrollmentRowSchema } from "@/lib/validators";
import Papa from "papaparse";
import { revalidatePath } from "next/cache";
import { writeAuditLog } from "@/lib/audit";

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File exceeds 5MB limit" },
        { status: 413 }
      );
    }

    if (
      file.type !== "text/csv" &&
      file.type !== "application/csv" &&
      file.type !== "application/vnd.ms-excel"
    ) {
      return NextResponse.json(
        { error: "Invalid file type. Only CSV allowed." },
        { status: 415 }
      );
    }

    const csvText = await file.text();

    const parseResult = Papa.parse<Record<string, unknown>>(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });

    if (
      parseResult.errors &&
      parseResult.errors.length > 0 &&
      parseResult.data.length === 0
    ) {
      return NextResponse.json(
        { error: "Failed to parse CSV file", details: parseResult.errors },
        { status: 400 }
      );
    }

    const validRows: Array<{
      year: number;
      department: string;
      totalStudents: number;
      maleStudents: number;
      femaleStudents: number;
    }> = [];

    const errors: Array<{ row: number; message: string }> = [];

    parseResult.data.forEach((row, index) => {
      const parsed = departmentEnrollmentRowSchema.safeParse(row);

      if (!parsed.success) {
        errors.push({
          row: index + 1,
          message: parsed.error.issues
            .map((i) => `${i.path.join(".")}: ${i.message}`)
            .join("; "),
        });
      } else {
        validRows.push({
          year: parsed.data.year,
          department: parsed.data.department,
          totalStudents: parsed.data.total_students,
          maleStudents: parsed.data.male_students,
          femaleStudents: parsed.data.female_students,
        });
      }
    });

    if (validRows.length > 0) {
      await db.transaction(async (tx) => {
        // Upsert department enrollment rows
        for (const row of validRows) {
          await tx
            .insert(departmentEnrollment)
            .values({
              ...row,
              department: row.department as "cse" | "it" | "ece" | "ee" | "me" | "mca" | "mtech",
            })
            .onConflictDoUpdate({
              target: [
                departmentEnrollment.year,
                departmentEnrollment.department,
              ],
              set: {
                totalStudents: row.totalStudents,
                maleStudents: row.maleStudents,
                femaleStudents: row.femaleStudents,
              },
            });
        }

        // Recompute institute_enrollment_stats for each affected year
        const affectedYears = Array.from(
          new Set(validRows.map((r) => r.year))
        );

        for (const year of affectedYears) {
          const deptRecords = await tx
            .select()
            .from(departmentEnrollment)
            .where(eq(departmentEnrollment.year, year));

          if (deptRecords.length > 0) {
            const totalStudents = deptRecords.reduce(
              (acc, curr) => acc + curr.totalStudents,
              0
            );
            const totalMale = deptRecords.reduce(
              (acc, curr) => acc + curr.maleStudents,
              0
            );
            const totalFemale = deptRecords.reduce(
              (acc, curr) => acc + curr.femaleStudents,
              0
            );

            const maleRatio =
              totalStudents > 0
                ? ((totalMale / totalStudents) * 100).toFixed(2)
                : "0.00";
            const femaleRatio =
              totalStudents > 0
                ? ((totalFemale / totalStudents) * 100).toFixed(2)
                : "0.00";

            await tx
              .insert(instituteEnrollmentStats)
              .values({
                year,
                totalStudents,
                totalMale,
                totalFemale,
                maleRatio,
                femaleRatio,
              })
              .onConflictDoUpdate({
                target: instituteEnrollmentStats.year,
                set: {
                  totalStudents,
                  totalMale,
                  totalFemale,
                  maleRatio,
                  femaleRatio,
                },
              });
          }
        }
      });

      await writeAuditLog({
        adminId: auth.admin!.id,
        adminEmail: auth.admin!.email,
        action: "create",
        resource: "department_enrollment",
        metadata: { rowsInserted: validRows.length, errors: errors.length },
      });

      revalidatePath("/enrollment");
    }

    return NextResponse.json({
      data: { inserted: validRows.length, errors },
    });
  } catch (error) {
    console.error(
      "POST /api/v1/enrollment/departments/upload error:",
      error
    );
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
