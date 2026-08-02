import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notices } from "@/lib/db/schema";
import { ilike, desc } from "drizzle-orm";
import { handleApiError } from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");
    const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 100);

    if (!q || q.trim().length === 0) {
      return NextResponse.json(
        { error: "Query parameter 'q' is required" },
        { status: 400 }
      );
    }

    const data = await db
      .select()
      .from(notices)
      .where(ilike(notices.title, `%${q}%`))
      .orderBy(desc(notices.publishedAt))
      .limit(limit);

    return NextResponse.json({ data });
  } catch (error) {
    return handleApiError(error, "GET /api/v1/notices/search");
  }
}
