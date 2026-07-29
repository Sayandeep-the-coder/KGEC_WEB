import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { downloads, downloadCategoryEnum } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { downloadSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
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
    const category = searchParams.get("category");

    const categoryValid = category && downloadCategoryEnum.enumValues.includes(category as any)
      ? (category as (typeof downloadCategoryEnum.enumValues)[number])
      : undefined;

    const whereClause = categoryValid ? eq(downloads.category, categoryValid) : undefined;

    const items = await db
      .select()
      .from(downloads)
      .where(whereClause)
      .orderBy(desc(downloads.uploadedAt));

    return NextResponse.json({ data: items });
  } catch (error) {
    console.error("GET /api/downloads error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const body = await req.json();
    const result = downloadSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const [newDownload] = await db
      .insert(downloads)
      .values(result.data)
      .returning();

    revalidatePath("/downloads");

    return NextResponse.json({ data: newDownload }, { status: 201 });
  } catch (error) {
    console.error("POST /api/downloads error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
