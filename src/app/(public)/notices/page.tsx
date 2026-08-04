

import NoticeBoard from "@/components/NoticeBoard";
import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { notices } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  Bell,
  DownloadCloud,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export const metadata: Metadata = {
  title: "Official Notice Board | Kalyani Government Engineering College",
  description:
    "Live official notices, academic circulars, examination schedules, admission updates, and administrative notifications from KGEC.",
};

export const dynamic = "force-dynamic";

export default async function PublicNoticesPage() {
  const dbNotices = await db
    .select()
    .from(notices)
    .where(eq(notices.isActive, true))
    .orderBy(desc(notices.publishedAt))
    .limit(100);

  const initialNotices = dbNotices.map((n) => ({
    id: n.id,
    title: n.title,
    type: n.type,
    fileUrl: n.fileUrl || n.pdfUrl,
    fileName: n.fileName,
    fileType: n.fileType,
    publishedAt: n.publishedAt.toISOString(),
  }));

  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Official Communications"
        title="Official Notice Board"
        subtitle="Stay updated with academic circulars, semester exam schedules, admission counseling announcements, tenders, and administrative notifications."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/downloads"
            className="inline-flex items-center gap-2 border border-white/30 rounded-full px-6 py-3 text-white font-medium hover:bg-white/10 transition-colors"
          >
            Document Downloads <ArrowRight size={16} />
          </Link>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-3 text-white/80 font-medium hover:bg-white/10 transition-colors"
          >
            Campus News
          </Link>
        </div>
      </PageHero>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
        <NoticeBoard initialNotices={initialNotices} limit={100} showTitle={false} />
      </main>

      </UnifiedPageLayout>
  );
}
