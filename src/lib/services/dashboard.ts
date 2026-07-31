import { db } from "@/lib/db";
import {
  notices,
  news,
  events,
  downloads,
  galleryImages,
  staff,
  auditLog,
} from "@/lib/db/schema";
import { count, desc } from "drizzle-orm";

export interface AdminDashboardMetrics {
  counts: {
    notices: number;
    news: number;
    events: number;
    downloads: number;
    gallery: number;
    staff: number;
  };
  recentNotices: Array<{
    id: string;
    title: string;
    type: string;
    fileUrl: string | null;
    publishedAt: Date;
  }>;
  recentNews: Array<{
    id: string;
    title: string;
    slug: string;
    publishedAt: Date;
  }>;
  recentEvents: Array<{
    id: string;
    title: string;
    eventDate: Date;
  }>;
  recentAudits: Array<{
    id: string;
    adminEmail: string;
    action: string;
    resource: string;
    createdAt: Date;
  }>;
}

export async function getAdminDashboardData(): Promise<AdminDashboardMetrics> {
  try {
    const [
      totalNoticesResult,
      totalNewsResult,
      totalEventsResult,
      totalDownloadsResult,
      totalGalleryResult,
      totalStaffResult,
      recentNoticesResult,
      recentNewsResult,
      recentEventsResult,
      recentAuditsResult,
    ] = await Promise.all([
      db.select({ count: count() }).from(notices).catch(() => [{ count: 0 }]),
      db.select({ count: count() }).from(news).catch(() => [{ count: 0 }]),
      db.select({ count: count() }).from(events).catch(() => [{ count: 0 }]),
      db.select({ count: count() }).from(downloads).catch(() => [{ count: 0 }]),
      db.select({ count: count() }).from(galleryImages).catch(() => [{ count: 0 }]),
      db.select({ count: count() }).from(staff).catch(() => [{ count: 0 }]),
      db
        .select({
          id: notices.id,
          title: notices.title,
          type: notices.type,
          fileUrl: notices.fileUrl,
          publishedAt: notices.publishedAt,
        })
        .from(notices)
        .orderBy(desc(notices.publishedAt))
        .limit(5)
        .catch(() => []),
      db
        .select({
          id: news.id,
          title: news.title,
          slug: news.slug,
          publishedAt: news.publishedAt,
        })
        .from(news)
        .orderBy(desc(news.publishedAt))
        .limit(5)
        .catch(() => []),
      db
        .select({
          id: events.id,
          title: events.title,
          eventDate: events.eventDate,
        })
        .from(events)
        .orderBy(desc(events.eventDate))
        .limit(5)
        .catch(() => []),
      db
        .select({
          id: auditLog.id,
          adminEmail: auditLog.adminEmail,
          action: auditLog.action,
          resource: auditLog.resource,
          createdAt: auditLog.createdAt,
        })
        .from(auditLog)
        .orderBy(desc(auditLog.createdAt))
        .limit(10)
        .catch(() => []),
    ]);

    return {
      counts: {
        notices: totalNoticesResult[0]?.count ?? 0,
        news: totalNewsResult[0]?.count ?? 0,
        events: totalEventsResult[0]?.count ?? 0,
        downloads: totalDownloadsResult[0]?.count ?? 0,
        gallery: totalGalleryResult[0]?.count ?? 0,
        staff: totalStaffResult[0]?.count ?? 0,
      },
      recentNotices: recentNoticesResult || [],
      recentNews: recentNewsResult || [],
      recentEvents: recentEventsResult || [],
      recentAudits: recentAuditsResult || [],
    };
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    return {
      counts: { notices: 0, news: 0, events: 0, downloads: 0, gallery: 0, staff: 0 },
      recentNotices: [],
      recentNews: [],
      recentEvents: [],
      recentAudits: [],
    };
  }
}
