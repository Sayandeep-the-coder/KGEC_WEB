import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { adminAllowlist } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ data: { isAdmin: false } });
    }

    const [admin] = await db
      .select()
      .from(adminAllowlist)
      .where(eq(adminAllowlist.email, session.user.email.toLowerCase()));

    return NextResponse.json({ data: { isAdmin: !!admin } });
  } catch (error) {
    console.error("GET /api/v1/auth/status error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
