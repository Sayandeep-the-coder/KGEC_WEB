import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { placementDepartments } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const yearParam = searchParams.get("year");

    let data = [];

    if (yearParam && !isNaN(parseInt(yearParam, 10))) {
      const year = parseInt(yearParam, 10);
      data = await db
        .select()
        .from(placementDepartments)
        .where(eq(placementDepartments.year, year))
        .orderBy(desc(placementDepartments.studentsPlaced));
    } else {
      data = await db
        .select()
        .from(placementDepartments)
        .orderBy(desc(placementDepartments.year), desc(placementDepartments.studentsPlaced));
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("GET /api/v1/placements/departments error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
