import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { placementStats } from "@/lib/db/schema";
import { asc, eq } from "drizzle-orm";
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

    if (yearParam) {
      const year = parseInt(yearParam, 10);
      if (!isNaN(year)) {
        const [stat] = await db
          .select()
          .from(placementStats)
          .where(eq(placementStats.year, year));

        return NextResponse.json({ data: stat || null });
      }
    }

    const stats = await db
      .select()
      .from(placementStats)
      .orderBy(asc(placementStats.year));

    return NextResponse.json({ data: stats });
  } catch (error) {
    console.error("GET /api/placements/stats error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
