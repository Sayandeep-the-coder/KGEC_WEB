import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { downloads, downloadCategoryEnum } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { downloadSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { writeAuditLog } from "@/lib/audit";
import { handleApiError } from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 100);
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);

    const categoryValid =
      category &&
      (downloadCategoryEnum.enumValues as readonly string[]).includes(category)
        ? (category as (typeof downloadCategoryEnum.enumValues)[number])
        : undefined;

    const whereClause = categoryValid
      ? eq(downloads.category, categoryValid)
      : undefined;

    const items = await db
      .select()
      .from(downloads)
      .where(whereClause)
      .orderBy(desc(downloads.uploadedAt))
      .limit(limit)
      .offset((page - 1) * limit);

    return NextResponse.json({ data: items });
  } catch (error) {
    return handleApiError(error, "GET /api/v1/downloads");
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

    await writeAuditLog({
      adminId: auth.admin!.id,
      adminEmail: auth.admin!.email,
      action: "create",
      resource: "downloads",
      resourceId: newDownload.id,
    });

    revalidatePath("/downloads");

    return NextResponse.json({ data: newDownload }, { status: 201 });
  } catch (error) {
    return handleApiError(error, "POST /api/v1/downloads");
  }
}
