import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { placementRecruiters } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/middlewares/auth";
import { placementRecruiterRowSchema } from "@/lib/validators";
import Papa from "papaparse";
import { revalidatePath } from "next/cache";

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
      company: string;
      offers: number;
    }> = [];

    const errors: Array<{ row: number; message: string }> = [];

    parseResult.data.forEach((row, index) => {
      const parsed = placementRecruiterRowSchema.safeParse(row);

      if (!parsed.success) {
        errors.push({
          row: index + 1,
          message: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "),
        });
      } else {
        validRows.push({
          year: parsed.data.year,
          company: parsed.data.company,
          offers: parsed.data.offers,
        });
      }
    });

    if (validRows.length > 0) {
      await db.transaction(async (tx) => {
        for (const row of validRows) {
          await tx
            .insert(placementRecruiters)
            .values(row)
            .onConflictDoUpdate({
              target: [placementRecruiters.year, placementRecruiters.company],
              set: {
                offers: row.offers,
              },
            });
        }
      });

      revalidatePath("/training-and-placement");
    }

    return NextResponse.json({
      inserted: validRows.length,
      errors,
    });
  } catch (error) {
    console.error("POST /api/placements/recruiters/upload error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
