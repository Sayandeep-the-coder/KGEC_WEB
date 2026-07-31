import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { departmentEnrollment } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const yearParam = searchParams.get("year");

    if (!yearParam || isNaN(parseInt(yearParam, 10))) {
      return NextResponse.json(
        { error: "Query parameter 'year' is required" },
        { status: 400 }
      );
    }

    const year = parseInt(yearParam, 10);

    const data = await db
      .select()
      .from(departmentEnrollment)
      .where(eq(departmentEnrollment.year, year));

    return NextResponse.json({ data });
  } catch (error) {
    console.error("GET /api/v1/enrollment/departments error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
