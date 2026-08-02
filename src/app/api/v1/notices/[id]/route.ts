import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notices } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { noticePatchSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { writeAuditLog } from "@/lib/audit";
import { handleApiError } from "@/lib/errors";
import { validateUuid } from "@/lib/utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const invalid = validateUuid(id);
    if (invalid) return invalid;
    const [notice] = await db.select().from(notices).where(eq(notices.id, id));

    if (!notice) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    }

    return NextResponse.json({ data: notice });
  } catch (error) {
    return handleApiError(error, "GET /api/v1/notices/[id]");
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { id } = await params;
    const invalid = validateUuid(id);
    if (invalid) return invalid;
    const body = await req.json();
    const result = noticePatchSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const { title, type, fileUrl, fileName, fileType, isActive } = result.data;

    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = title;
    if (type !== undefined) updateData.type = type;
    if (fileUrl !== undefined) {
      updateData.fileUrl = fileUrl;
      updateData.pdfUrl = fileUrl;
    }
    if (fileName !== undefined) updateData.fileName = fileName;
    if (fileType !== undefined) updateData.fileType = fileType;
    if (isActive !== undefined) updateData.isActive = isActive;

    const [updated] = await db
      .update(notices)
      .set(updateData)
      .where(eq(notices.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    }

    await writeAuditLog({
      adminId: auth.admin!.id,
      adminEmail: auth.admin!.email,
      action: "update",
      resource: "notices",
      resourceId: id,
    });

    revalidatePath("/");
    revalidatePath("/notices");

    return NextResponse.json({ data: updated });
  } catch (error) {
    return handleApiError(error, "PATCH /api/v1/notices/[id]");
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { id } = await params;
    const invalid = validateUuid(id);
    if (invalid) return invalid;
    const [deleted] = await db
      .delete(notices)
      .where(eq(notices.id, id))
      .returning();

    if (!deleted) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    }

    await writeAuditLog({
      adminId: auth.admin!.id,
      adminEmail: auth.admin!.email,
      action: "delete",
      resource: "notices",
      resourceId: id,
    });

    revalidatePath("/");
    revalidatePath("/notices");

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    return handleApiError(error, "DELETE /api/v1/notices/[id]");
  }
}
