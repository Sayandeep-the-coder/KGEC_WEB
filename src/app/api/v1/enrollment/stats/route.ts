import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { instituteEnrollmentStats } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";

// ─── Cached queries ────────────────────────────────────────────────────────
const getCachedStatByYear = unstable_cache(
  async (year: number) => {
    const [stat] = await db
      .select()
      .from(instituteEnrollmentStats)
      .where(eq(instituteEnrollmentStats.year, year));
    return stat || null;
  },
  ["enrollment-stats-year"],
  { revalidate: 3600, tags: ["enrollment"] }
);

const getCachedAllStats = unstable_cache(
  async () => {
    return db
      .select()
      .from(instituteEnrollmentStats)
      .orderBy(asc(instituteEnrollmentStats.year));
  },
  ["enrollment-stats-all"],
  { revalidate: 3600, tags: ["enrollment"] }
);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const yearParam = searchParams.get("year");

    if (yearParam) {
      const year = parseInt(yearParam, 10);
      if (isNaN(year)) {
        return NextResponse.json(
          { error: "Invalid year parameter" },
          { status: 400 }
        );
      }

      const stat = await getCachedStatByYear(year);
      return NextResponse.json({ data: stat });
    }

    const stats = await getCachedAllStats();
    return NextResponse.json({ data: stats || [] });
  } catch (error) {
    console.error("GET /api/v1/enrollment/stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
