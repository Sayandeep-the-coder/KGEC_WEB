import NoticeBoard from "@/components/NoticeBoard";
import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { notices } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Official Notice Board | Kalyani Government Engineering College",
  description:
    "Live official notices, academic circulars, examination schedules, admission updates, and administrative notifications from KGEC.",
};

const getCachedNotices = unstable_cache(
  async () => {
    try {
      return await db
        .select({
          id: notices.id,
          title: notices.title,
          type: notices.type,
          fileUrl: notices.fileUrl,
          pdfUrl: notices.pdfUrl,
          fileName: notices.fileName,
          fileType: notices.fileType,
          publishedAt: notices.publishedAt,
        })
        .from(notices)
        .where(eq(notices.isActive, true))
        .orderBy(desc(notices.publishedAt))
        .limit(100);
    } catch (error) {
      console.warn("Database connection failed, serving fallback notices:", error);
      return [
        {
          id: "1",
          title: "Welcome to Kalyani Government Engineering College Official Portal",
          type: "GENERAL",
          fileUrl: null,
          pdfUrl: null,
          fileName: null,
          fileType: null,
          publishedAt: new Date(),
        },
        {
          id: "2",
          title: "Academic Calendar & Examination Guidelines for Even Semester 2026",
          type: "ACADEMIC",
          fileUrl: null,
          pdfUrl: null,
          fileName: null,
          fileType: null,
          publishedAt: new Date(),
        },
        {
          id: "3",
          title: "Notice regarding Annual Campus Recruitment Drive 2026",
          type: "PLACEMENT",
          fileUrl: null,
          pdfUrl: null,
          fileName: null,
          fileType: null,
          publishedAt: new Date(),
        },
      ];
    }
  },
  ["notices-page"],
  { revalidate: 300, tags: ["notices"] }
);

export default async function PublicNoticesPage() {
  const dbNotices = await getCachedNotices();

  const initialNotices = dbNotices.map((n) => ({
    id: n.id,
    title: n.title,
    type: n.type,
    fileUrl: n.fileUrl || n.pdfUrl,
    fileName: n.fileName,
    fileType: n.fileType,
    publishedAt: new Date(n.publishedAt).toISOString(),
  }));

  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Official Communications"
        title="Official Notice Board"
        subtitle="Stay updated with academic circulars, semester exam schedules, admission counseling announcements, tenders, and administrative notifications."
      >
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <Link
            href="/downloads"
            className="inline-flex items-center gap-2 bg-white text-[#022448] rounded-full px-6 py-3 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors shadow-lg"
          >
            <span>Document Downloads</span> <ArrowRight size={16} />
          </Link>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-3 text-white/90 font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors"
          >
            Campus News
          </Link>
        </div>
      </PageHero>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-16">
          <div className="max-w-[1200px] mx-auto">
            <NoticeBoard initialNotices={initialNotices} limit={100} showTitle={false} className="border-none shadow-sm md:p-8" />
          </div>
        </div>
      </main>

    </UnifiedPageLayout>
  );
}
