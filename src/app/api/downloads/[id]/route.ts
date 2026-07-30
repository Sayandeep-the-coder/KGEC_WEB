import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { downloads } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
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
      .delete(downloads)
      .where(eq(downloads.id, id))
      .returning();

    if (!deleted) {
      return NextResponse.json({ error: "Download not found" }, { status: 404 });
    }

    revalidatePath("/downloads");

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    console.error("DELETE /api/downloads/[id] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
