import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { departmentEnrollment } from "@/lib/db/schema";
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
        .from(departmentEnrollment)
        .where(eq(departmentEnrollment.year, year));
    } else {
      data = await db
        .select()
        .from(departmentEnrollment)
        .orderBy(desc(departmentEnrollment.year));
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("GET /api/v1/enrollment/departments error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
