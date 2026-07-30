import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { placementDepartments } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { enforcePublicRateLimit } from "@/lib/utils";


export async function GET(req: NextRequest) {
  const rateLimited = await enforcePublicRateLimit();
  if (rateLimited) return rateLimited;


  try {
    const { searchParams } = new URL(req.url);
    const yearParam = searchParams.get("year");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 200);
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);

    const whereClause = yearParam && !isNaN(parseInt(yearParam, 10))
      ? eq(placementDepartments.year, parseInt(yearParam, 10))
      : undefined;

    const data = await db
      .select()
      .from(placementDepartments)
      .where(whereClause)
      .orderBy(desc(placementDepartments.year))
      .limit(limit)
      .offset((page - 1) * limit);

    return NextResponse.json({ data });
  } catch (error) {
    console.error("GET /api/placements/departments error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
