import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { placementRecruiters } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

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
    const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 200);
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);

    const data = await db
      .select()
      .from(placementRecruiters)
      .where(eq(placementRecruiters.year, year))
      .orderBy(desc(placementRecruiters.offers))
      .limit(limit)
      .offset((page - 1) * limit);

    return NextResponse.json({ data });
  } catch (error) {
    console.error("GET /api/v1/placements/recruiters error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
