import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { placementDepartments, placementStats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { placementDeptRowSchema } from "@/lib/validators";
import Papa from "papaparse";
import { revalidateTag } from "next/cache";

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
      return NextResponse.json({ error: "File exceeds 5MB limit" }, { status: 413 });
    }

    if (file.type !== "text/csv" && file.type !== "application/csv" && file.type !== "application/vnd.ms-excel") {
      return NextResponse.json({ error: "Invalid file type. Only CSV allowed." }, { status: 415 });
    }

    const csvText = await file.text();

    const parseResult = Papa.parse<Record<string, unknown>>(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });

    if (parseResult.errors && parseResult.errors.length > 0 && parseResult.data.length === 0) {
      return NextResponse.json(
        { error: "Failed to parse CSV file", details: parseResult.errors },
        { status: 400 }
      );
    }

    const validRows: Array<{
      year: number;
      department: string;
      studentsPlaced: number;
      medianSalary: number | null;
      highestSalary: number | null;
    }> = [];

    const errors: Array<{ row: number; message: string }> = [];

    parseResult.data.forEach((row, index) => {
      const parsed = placementDeptRowSchema.safeParse(row);

      if (!parsed.success) {
        errors.push({
          row: index + 1,
          message: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "),
        });
      } else {
        validRows.push({
          year: parsed.data.year,
          department: parsed.data.department,
          studentsPlaced: parsed.data.students_placed,
          medianSalary: parsed.data.median_salary ?? null,
          highestSalary: parsed.data.highest_salary ?? null,
        });
      }
    });

    if (validRows.length > 0) {
      // Upsert department rows
      for (const row of validRows) {
        await db
          .insert(placementDepartments)
          .values(row)
          .onConflictDoUpdate({
            target: [placementDepartments.year, placementDepartments.department],
            set: {
              studentsPlaced: row.studentsPlaced,
              medianSalary: row.medianSalary,
              highestSalary: row.highestSalary,
            },
          });
      }

      // Identify all unique years affected by this upload
      const affectedYears = Array.from(new Set(validRows.map((r) => r.year)));

      // Recompute aggregate placementStats for each affected year
      for (const year of affectedYears) {
        const deptRecords = await db
          .select()
          .from(placementDepartments)
          .where(eq(placementDepartments.year, year));

        if (deptRecords.length > 0) {
          const totalStudentsPlaced = deptRecords.reduce((acc, curr) => acc + curr.studentsPlaced, 0);

          const maxHighestSalary = deptRecords.reduce((max, curr) => {
            if (curr.highestSalary !== null && (max === null || curr.highestSalary > max)) {
              return curr.highestSalary;
            }
            return max;
          }, null as number | null);

          const validMedians = deptRecords
            .map((r) => r.medianSalary)
            .filter((s): s is number => s !== null);

          let avgMedianSalary: number | null = null;
          if (validMedians.length > 0) {
            avgMedianSalary = Math.round(
              validMedians.reduce((a, b) => a + b, 0) / validMedians.length
            );
          }

          await db
            .insert(placementStats)
            .values({
              year,
              studentsPlaced: totalStudentsPlaced,
              medianSalary: avgMedianSalary,
              highestSalary: maxHighestSalary,
            })
            .onConflictDoUpdate({
              target: placementStats.year,
              set: {
                studentsPlaced: totalStudentsPlaced,
                medianSalary: avgMedianSalary,
                highestSalary: maxHighestSalary,
              },
            });
        }
      }

      revalidateTag("placements", "max");
    }

    return NextResponse.json({
      inserted: validRows.length,
      errors,
    });
  } catch (error) {
    console.error("POST /api/placements/departments/upload error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
