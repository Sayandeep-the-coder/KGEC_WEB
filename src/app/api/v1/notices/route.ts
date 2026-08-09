import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { notices } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { noticeSchema } from "@/lib/validators";
import { revalidatePath, revalidateTag } from "next/cache";
import { writeAuditLog } from "@/lib/audit";
import { handleApiError } from "@/lib/errors";

// ─── Cached query ──────────────────────────────────────────────────────────
const getCachedNotices = unstable_cache(
  async (limit: number, type?: string) => {
    const VALID_TYPES = ["general", "admission", "placement", "academic", "exam", "result"] as const;
    let query = db.select().from(notices).$dynamic();

    if (type && (VALID_TYPES as readonly string[]).includes(type)) {
      query = query.where(eq(notices.type, type as typeof VALID_TYPES[number]));
    }

    return query.orderBy(desc(notices.publishedAt)).limit(limit);
  },
  ["notices-list"],
  { revalidate: 300, tags: ["notices"] }
);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const type = searchParams.get("type") || undefined;
    const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 100);

    const data = await getCachedNotices(limit, type);

    return NextResponse.json({ data });
  } catch (error) {
    return handleApiError(error, "GET /api/v1/notices");
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

    const { title, type, fileUrl, fileName, fileType, isActive } = result.data;

    const [newNotice] = await db
      .insert(notices)
      .values({
        title,
        type,
        fileUrl: fileUrl || null,
        pdfUrl: fileUrl || null,
        fileName: fileName || null,
        fileType: fileType || null,
        isActive: isActive ?? true,
        createdBy: auth.admin!.id,
      })
      .returning();

    await writeAuditLog({
      adminId: auth.admin!.id,
      adminEmail: auth.admin!.email,
      action: "create",
      resource: "notices",
      resourceId: newNotice.id,
    });

    revalidateTag("notices", "max");
    revalidatePath("/");
    revalidatePath("/notices");

    return NextResponse.json({ data: newNotice }, { status: 201 });
  } catch (error) {
    return handleApiError(error, "POST /api/v1/notices");
  }
}
