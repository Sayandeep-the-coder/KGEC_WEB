import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { news } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { newsPatchSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { writeAuditLog } from "@/lib/audit";
import { handleApiError } from "@/lib/errors";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const [item] = await db.select().from(news).where(eq(news.slug, slug));

    if (!item) {
      return NextResponse.json({ error: "News item not found" }, { status: 404 });
    }

    return NextResponse.json({ data: item });
  } catch (error) {
    return handleApiError(error, "GET /api/v1/news/[slug]");
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

    await writeAuditLog({
      adminId: auth.admin!.id,
      adminEmail: auth.admin!.email,
      action: "update",
      resource: "news",
      resourceId: updated.id,
    });

    revalidatePath("/");
    revalidatePath("/news");
    revalidatePath(`/news/${slug}`);

    return NextResponse.json({ data: updated });
  } catch (error) {
    return handleApiError(error, "PATCH /api/v1/news/[slug]");
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

    await writeAuditLog({
      adminId: auth.admin!.id,
      adminEmail: auth.admin!.email,
      action: "delete",
      resource: "news",
      resourceId: deleted.id,
    });

    revalidatePath("/");
    revalidatePath("/news");

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    return handleApiError(error, "DELETE /api/v1/news/[slug]");
  }
}
