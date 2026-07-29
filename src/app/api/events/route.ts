import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { events } from "@/db/schema";
import { gte, asc, desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { eventSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { checkPublicRateLimit } from "@/lib/ratelimit";
import { headers } from "next/headers";


export async function GET(req: NextRequest) {

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  const rateLimit = await checkPublicRateLimit(`public_${ip}`);
  if (!rateLimit.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }


  try {
    const { searchParams } = new URL(req.url);
    const upcoming = searchParams.get("upcoming") === "true";

    const whereClause = upcoming ? gte(events.eventDate, new Date()) : undefined;
    const orderClause = upcoming ? asc(events.eventDate) : desc(events.eventDate);

    const items = await db
      .select()
      .from(events)
      .where(whereClause)
      .orderBy(orderClause);

    return NextResponse.json({ data: items });
  } catch (error) {
    console.error("GET /api/events error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
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

    revalidatePath("/");
    revalidatePath("/events");

    return NextResponse.json({ data: newEvent }, { status: 201 });
  } catch (error) {
    console.error("POST /api/events error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
