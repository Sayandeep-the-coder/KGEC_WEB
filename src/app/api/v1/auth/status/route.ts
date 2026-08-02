import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { adminAllowlist } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { handleApiError } from "@/lib/errors";

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
    return handleApiError(error, "GET /api/v1/auth/status");
  }
}
