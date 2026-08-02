import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { gte, asc, desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { eventSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { writeAuditLog } from "@/lib/audit";
import { handleApiError } from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const upcoming = searchParams.get("upcoming") === "true";
    const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 100);
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);

    const whereClause = upcoming ? gte(events.eventDate, new Date()) : undefined;
    const orderClause = upcoming ? asc(events.eventDate) : desc(events.eventDate);

    const items = await db
      .select()
      .from(events)
      .where(whereClause)
      .orderBy(orderClause)
      .limit(limit)
      .offset((page - 1) * limit);

    return NextResponse.json({ data: items });
  } catch (error) {
    return handleApiError(error, "GET /api/v1/events");
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const body = await req.json();
    const result = eventSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const [newEvent] = await db
      .insert(events)
      .values(result.data)
      .returning();

    await writeAuditLog({
      adminId: auth.admin!.id,
      adminEmail: auth.admin!.email,
      action: "create",
      resource: "events",
      resourceId: newEvent.id,
    });

    revalidatePath("/");
    revalidatePath("/events");

    return NextResponse.json({ data: newEvent }, { status: 201 });
  } catch (error) {
    return handleApiError(error, "POST /api/v1/events");
  }
}
