import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { placementDepartments, departmentEnum } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

// ─── Cached query: all departments for a given year ────────────────────────
const getCachedByYear = unstable_cache(
  async (year: number) => {
    return db
      .select()
      .from(placementDepartments)
      .where(eq(placementDepartments.year, year))
      .orderBy(desc(placementDepartments.studentsPlaced));
  },
  ["placement-departments-year"],
  { revalidate: 3600, tags: ["placements"] }
);

// ─── Cached query: last 5 years for one department ─────────────────────────
const getCachedByDept = unstable_cache(
  async (department: string) => {
    return db
      .select()
      .from(placementDepartments)
      .where(
        eq(
          placementDepartments.department,
          department as (typeof departmentEnum.enumValues)[number]
        )
      )
      .orderBy(desc(placementDepartments.year))
      .limit(5);
  },
  ["placement-departments-dept"],
  { revalidate: 3600, tags: ["placements"] }
);

// ─── Cached query: latest year for one department ──────────────────────────
const getCachedLatestByDept = unstable_cache(
  async (department: string) => {
    return db
      .select()
      .from(placementDepartments)
      .where(
        eq(
          placementDepartments.department,
          department as (typeof departmentEnum.enumValues)[number]
        )
      )
      .orderBy(desc(placementDepartments.year))
      .limit(1);
  },
  ["placement-departments-dept-latest"],
  { revalidate: 3600, tags: ["placements"] }
);

// ─── Cached query: all data (no filters) ───────────────────────────────────
const getCachedAll = unstable_cache(
  async (limit: number) => {
    return db
      .select()
      .from(placementDepartments)
      .orderBy(
        desc(placementDepartments.year),
        desc(placementDepartments.studentsPlaced)
      )
      .limit(limit);
  },
  ["placement-departments-all"],
  { revalidate: 3600, tags: ["placements"] }
);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const yearParam = searchParams.get("year");
    const deptParam = searchParams.get("department");
    const latest = searchParams.get("latest") === "true";
    const limit = Math.min(
      parseInt(searchParams.get("limit") || "100", 10),
      100
    );

    let data;

    if (
      deptParam &&
      (departmentEnum.enumValues as string[]).includes(deptParam)
    ) {
      // Section 4: department mode — last 5 years for one department
      if (latest) {
        data = await getCachedLatestByDept(deptParam);
      } else {
        data = await getCachedByDept(deptParam);
      }
    } else if (yearParam && !isNaN(parseInt(yearParam, 10))) {
      // Existing: year mode — all departments for one year
      const year = parseInt(yearParam, 10);
      data = await getCachedByYear(year);
    } else {
      // Fallback: all data
      data = await getCachedAll(limit);
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("GET /api/v1/placements/departments error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
