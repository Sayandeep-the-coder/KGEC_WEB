import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { eventPatchSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { checkPublicRateLimit } from "@/lib/middlewares/ratelimit";
import { headers } from "next/headers";


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  const rateLimit = await checkPublicRateLimit(`public_${ip}`);
  if (!rateLimit.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }


  try {
    const { id } = await params;
    const [eventItem] = await db.select().from(events).where(eq(events.id, id));

    if (!eventItem) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ data: eventItem });
  } catch (error) {
    console.error("GET /api/events/[id] error:", error);
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

    revalidatePath("/");
    revalidatePath("/events");

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("PATCH /api/events/[id] error:", error);
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

    revalidatePath("/");
    revalidatePath("/events");

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    console.error("DELETE /api/events/[id] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
