import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auditLog } from "@/lib/db/schema";
import { desc, count } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 100);
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);

    const [data, totalResult] = await Promise.all([
      db
        .select()
        .from(auditLog)
        .orderBy(desc(auditLog.createdAt))
        .limit(limit)
        .offset((page - 1) * limit),
      db.select({ count: count() }).from(auditLog),
    ]);

    return NextResponse.json({
      data,
      count: Number(totalResult[0]?.count || 0),
    });
  } catch (error) {
    console.error("GET /api/v1/admin/audit-log error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
