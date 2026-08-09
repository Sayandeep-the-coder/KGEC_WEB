import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { departmentEnrollment, departmentEnum } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

// ─── Cached query: all departments for a given year ────────────────────────
const getCachedByYear = unstable_cache(
  async (year: number) => {
    return db
      .select()
      .from(departmentEnrollment)
      .where(eq(departmentEnrollment.year, year));
  },
  ["enrollment-departments-year"],
  { revalidate: 3600, tags: ["enrollment"] }
);

// ─── Cached query: last 5 years for one department ─────────────────────────
const getCachedByDept = unstable_cache(
  async (department: string) => {
    return db
      .select()
      .from(departmentEnrollment)
      .where(
        eq(
          departmentEnrollment.department,
          department as (typeof departmentEnum.enumValues)[number]
        )
      )
      .orderBy(desc(departmentEnrollment.year))
      .limit(5);
  },
  ["enrollment-departments-dept"],
  { revalidate: 3600, tags: ["enrollment"] }
);

// ─── Cached query: all data (no filters) ───────────────────────────────────
const getCachedAll = unstable_cache(
  async (limit: number) => {
    return db
      .select()
      .from(departmentEnrollment)
      .orderBy(desc(departmentEnrollment.year))
      .limit(limit);
  },
  ["enrollment-departments-all"],
  { revalidate: 3600, tags: ["enrollment"] }
);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const yearParam = searchParams.get("year");
    const deptParam = searchParams.get("department");
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
      data = await getCachedByDept(deptParam);
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
    console.error("GET /api/v1/enrollment/departments error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
