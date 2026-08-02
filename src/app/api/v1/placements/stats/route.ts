import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { placementStats } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const yearParam = searchParams.get("year");

    if (yearParam) {
      const year = parseInt(yearParam, 10);
      if (isNaN(year)) {
        return NextResponse.json({ error: "Invalid year parameter" }, { status: 400 });
      }

      const [stat] = await db
        .select()
        .from(placementStats)
        .where(eq(placementStats.year, year));

      return NextResponse.json({ data: stat || null });
    }

    const stats = await db
      .select()
      .from(placementStats)
      .orderBy(asc(placementStats.year));

    return NextResponse.json({ data: stats || [] });
  } catch (error) {
    console.error("GET /api/v1/placements/stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
