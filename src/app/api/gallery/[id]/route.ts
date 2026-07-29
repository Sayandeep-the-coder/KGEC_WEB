import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { galleryImages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

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
      return NextResponse.json({ error: "Gallery image not found" }, { status: 404 });
    }

    revalidatePath("/gallery");

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    console.error("DELETE /api/gallery/[id] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
