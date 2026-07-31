import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { eventPatchSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { writeAuditLog } from "@/lib/audit";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [eventItem] = await db.select().from(events).where(eq(events.id, id));

    if (!eventItem) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ data: eventItem });
  } catch (error) {
    console.error("GET /api/v1/events/[id] error:", error);
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
    const result = eventPatchSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const [updated] = await db
      .update(events)
      .set(result.data)
      .where(eq(events.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    await writeAuditLog({
      adminId: auth.admin!.id,
      adminEmail: auth.admin!.email,
      action: "update",
      resource: "events",
      resourceId: id,
    });

    revalidatePath("/");
    revalidatePath("/events");

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("PATCH /api/v1/events/[id] error:", error);
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
      .delete(events)
      .where(eq(events.id, id))
      .returning();

    if (!deleted) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    await writeAuditLog({
      adminId: auth.admin!.id,
      adminEmail: auth.admin!.email,
      action: "delete",
      resource: "events",
      resourceId: id,
    });

    revalidatePath("/");
    revalidatePath("/events");

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    console.error("DELETE /api/v1/events/[id] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
