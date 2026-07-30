import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notices, noticeCategoryEnum } from "@/lib/db/schema";
import { eq, desc, count } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { noticeSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { enforcePublicRateLimit } from "@/lib/utils";


export async function GET(req: NextRequest) {
  const rateLimited = await enforcePublicRateLimit();
  if (rateLimited) return rateLimited;


  try {
    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 100);
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
    const category = searchParams.get("category");

    const categoryValid = category && (noticeCategoryEnum.enumValues as string[]).includes(category)
      ? (category as (typeof noticeCategoryEnum.enumValues)[number])
      : undefined;

    const whereClause = categoryValid ? eq(notices.category, categoryValid) : undefined;

    const dataQuery = db
      .select()
      .from(notices)
      .where(whereClause)
      .orderBy(desc(notices.publishedAt))
      .limit(limit)
      .offset((page - 1) * limit);

    const totalCountQuery = db
      .select({ count: count() })
      .from(notices)
      .where(whereClause);

    const [data, totalResult] = await Promise.all([dataQuery, totalCountQuery]);
    const totalCount = Number(totalResult[0]?.count || 0);

    return NextResponse.json({ data, count: totalCount });
  } catch (error) {
    console.error("GET /api/notices error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const body = await req.json();
    const result = noticeSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const [newNotice] = await db
      .insert(notices)
      .values(result.data)
      .returning();

    revalidatePath("/");
    revalidatePath("/training-and-placement/notices");

    return NextResponse.json({ data: newNotice }, { status: 201 });
  } catch (error) {
    console.error("POST /api/notices error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
