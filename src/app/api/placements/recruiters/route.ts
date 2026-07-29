import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { placementRecruiters } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { checkPublicRateLimit } from "@/lib/middlewares/ratelimit";
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
      ? eq(placementRecruiters.year, parseInt(yearParam, 10))
      : undefined;

    const data = await db
      .select()
      .from(placementRecruiters)
      .where(whereClause)
      .orderBy(desc(placementRecruiters.year));

    return NextResponse.json({ data });
  } catch (error) {
    console.error("GET /api/placements/recruiters error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
