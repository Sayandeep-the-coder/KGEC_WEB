import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notices } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { noticePatchSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { enforcePublicRateLimit } from "@/lib/utils";


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const rateLimited = await enforcePublicRateLimit();
  if (rateLimited) return rateLimited;


  try {
    const { id } = await params;
    const [notice] = await db.select().from(notices).where(eq(notices.id, id));

    if (!notice) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    }

    return NextResponse.json({ data: notice });
  } catch (error) {
    console.error("GET /api/notices/[id] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
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
    const body = await req.json();
    const result = noticePatchSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const [updated] = await db
      .update(notices)
      .set({ ...result.data, updatedAt: new Date() })
      .where(eq(notices.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    }

    revalidatePath("/");
    revalidatePath("/training-and-placement/notices");

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("PATCH /api/notices/[id] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
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
    const [deleted] = await db
      .delete(notices)
      .where(eq(notices.id, id))
      .returning();

    if (!deleted) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    }

    revalidatePath("/");
    revalidatePath("/training-and-placement/notices");

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    console.error("DELETE /api/notices/[id] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
