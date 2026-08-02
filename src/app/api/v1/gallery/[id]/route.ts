import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { galleryImages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { galleryPatchSchema } from "@/lib/validators";
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
    const [item] = await db
      .select()
      .from(galleryImages)
      .where(eq(galleryImages.id, id));

    if (!item) {
      return NextResponse.json({ error: "Gallery image not found" }, { status: 404 });
    }

    return NextResponse.json({ data: item });
  } catch (error) {
    return handleApiError(error, "GET /api/v1/gallery/[id]");
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
    const result = galleryPatchSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const [updated] = await db
      .update(galleryImages)
      .set(result.data)
      .where(eq(galleryImages.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Gallery image not found" }, { status: 404 });
    }

    await writeAuditLog({
      adminId: auth.admin!.id,
      adminEmail: auth.admin!.email,
      action: "update",
      resource: "gallery",
      resourceId: id,
    });

    revalidatePath("/gallery");

    return NextResponse.json({ data: updated });
  } catch (error) {
    return handleApiError(error, "PATCH /api/v1/gallery/[id]");
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
      .delete(galleryImages)
      .where(eq(galleryImages.id, id))
      .returning();

    if (!deleted) {
      return NextResponse.json(
        { error: "Gallery image not found" },
        { status: 404 }
      );
    }

    await writeAuditLog({
      adminId: auth.admin!.id,
      adminEmail: auth.admin!.email,
      action: "delete",
      resource: "gallery",
      resourceId: id,
    });

    revalidatePath("/gallery");

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    return handleApiError(error, "DELETE /api/v1/gallery/[id]");
  }
}
