import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { placementDepartments } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { checkPublicRateLimit } from "@/lib/ratelimit";
import { headers } from "next/headers";


export async function GET(req: NextRequest) {

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  const rateLimit = await checkPublicRateLimit(`public_${ip}`);
  if (!rateLimit.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }


  try {
    const { searchParams } = new URL(req.url);
    const yearParam = searchParams.get("year");

    const whereClause = yearParam && !isNaN(parseInt(yearParam, 10))
      ? eq(placementDepartments.year, parseInt(yearParam, 10))
      : undefined;

    const data = await db
      .select()
      .from(placementDepartments)
      .where(whereClause)
      .orderBy(desc(placementDepartments.year));

    return NextResponse.json({ data });
  } catch (error) {
    console.error("GET /api/placements/departments error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
