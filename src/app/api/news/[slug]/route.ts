import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { news } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { newsPatchSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { checkPublicRateLimit } from "@/lib/middlewares/ratelimit";
import { headers } from "next/headers";


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  const rateLimit = await checkPublicRateLimit(`public_${ip}`);
  if (!rateLimit.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }


  try {
    const { slug } = await params;
    const [item] = await db.select().from(news).where(eq(news.slug, slug));

    if (!item) {
      return NextResponse.json({ error: "News item not found" }, { status: 404 });
    }

    return NextResponse.json({ data: item });
  } catch (error) {
    console.error("GET /api/news/[slug] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { slug } = await params;
    const body = await req.json();
    const result = newsPatchSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const [updated] = await db
      .update(news)
      .set(result.data)
      .where(eq(news.slug, slug))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "News item not found" }, { status: 404 });
    }

    revalidatePath("/");
    revalidatePath("/news");
    revalidatePath(`/news/${slug}`);

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("PATCH /api/news/[slug] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { slug } = await params;
    const [deleted] = await db.delete(news).where(eq(news.slug, slug)).returning();

    if (!deleted) {
      return NextResponse.json({ error: "News item not found" }, { status: 404 });
    }

    revalidatePath("/");
    revalidatePath("/news");

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    console.error("DELETE /api/news/[slug] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
