import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { placementRecruiters } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

// ─── Cached queries ────────────────────────────────────────────────────────
const getCachedByYear = unstable_cache(
  async (year: number, limit: number, offset: number) => {
    return db
      .select()
      .from(placementRecruiters)
      .where(eq(placementRecruiters.year, year))
      .orderBy(desc(placementRecruiters.offers))
      .limit(limit)
      .offset(offset);
  },
  ["placement-recruiters-year"],
  { revalidate: 3600, tags: ["placements"] }
);

const getCachedAll = unstable_cache(
  async (limit: number, offset: number) => {
    return db
      .select()
      .from(placementRecruiters)
      .orderBy(
        desc(placementRecruiters.year),
        desc(placementRecruiters.offers)
      )
      .limit(limit)
      .offset(offset);
  },
  ["placement-recruiters-all"],
  { revalidate: 3600, tags: ["placements"] }
);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const yearParam = searchParams.get("year");
    const limit = Math.min(
      parseInt(searchParams.get("limit") || "50", 10),
      200
    );
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
    const offset = (page - 1) * limit;

    let data;

    if (yearParam && !isNaN(parseInt(yearParam, 10))) {
      const year = parseInt(yearParam, 10);
      data = await getCachedByYear(year, limit, offset);
    } else {
      data = await getCachedAll(limit, offset);
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("GET /api/v1/placements/recruiters error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
