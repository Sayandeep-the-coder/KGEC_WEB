import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { adminAllowlist } from "@/lib/db/schema";
import { count } from "drizzle-orm";

export async function GET() {
  try {
    // Real DB connectivity check — runs a simple count query
    await db.select({ count: count() }).from(adminAllowlist);

    return NextResponse.json({
      data: {
        status: "ok",
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("GET /api/v1/health error:", error);
    return NextResponse.json(
      {
        data: {
          status: "error",
          timestamp: new Date().toISOString(),
        },
      },
      { status: 503 }
    );
  }
}
