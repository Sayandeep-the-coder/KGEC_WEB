import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  notices,
  downloads,
  galleryImages,
  auditLog,
} from "@/lib/db/schema";
import { count, desc, eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";

export async function GET() {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const [
      totalNoticesResult,
      totalDownloadsResult,
      totalGalleryResult,
      activeNotices,
      recentActivity,
    ] = await Promise.all([
      db.select({ count: count() }).from(notices),
      db.select({ count: count() }).from(downloads),
      db.select({ count: count() }).from(galleryImages),
      db
        .select()
        .from(notices)
        .where(eq(notices.isActive, true))
        .orderBy(desc(notices.publishedAt))
        .limit(5),
      db
        .select()
        .from(auditLog)
        .orderBy(desc(auditLog.createdAt))
        .limit(10),
    ]);

    return NextResponse.json({
      data: {
        totalNotices: Number(totalNoticesResult[0]?.count || 0),
        totalDownloads: Number(totalDownloadsResult[0]?.count || 0),
        totalGalleryImages: Number(totalGalleryResult[0]?.count || 0),
        activeNotices,
        recentActivity,
      },
    });
  } catch (error) {
    console.error("GET /api/v1/admin/dashboard error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
