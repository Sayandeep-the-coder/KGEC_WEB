import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { news } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { newsSchema } from "@/lib/validators";
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
    const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 100);

    const items = await db
      .select()
      .from(news)
      .orderBy(desc(news.publishedAt))
      .limit(limit);

    return NextResponse.json({ data: items });
  } catch (error) {
    console.error("GET /api/news error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const body = await req.json();
    const result = newsSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const [newItem] = await db.insert(news).values(result.data).returning();

    revalidatePath("/");
    revalidatePath("/news");

    return NextResponse.json({ data: newItem }, { status: 201 });
  } catch (error) {
    console.error("POST /api/news error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
