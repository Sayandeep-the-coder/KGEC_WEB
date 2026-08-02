import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { news } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { newsSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { writeAuditLog } from "@/lib/audit";
import { handleApiError } from "@/lib/errors";

export async function GET(req: NextRequest) {
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
    return handleApiError(error, "GET /api/v1/news");
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

    await writeAuditLog({
      adminId: auth.admin!.id,
      adminEmail: auth.admin!.email,
      action: "create",
      resource: "news",
      resourceId: newItem.id,
    });

    revalidatePath("/");
    revalidatePath("/news");

    return NextResponse.json({ data: newItem }, { status: 201 });
  } catch (error) {
    return handleApiError(error, "POST /api/v1/news");
  }
}
