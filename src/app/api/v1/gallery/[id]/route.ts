import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { galleryImages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { revalidatePath } from "next/cache";
import { writeAuditLog } from "@/lib/audit";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { id } = await params;
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
    console.error("DELETE /api/v1/gallery/[id] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
