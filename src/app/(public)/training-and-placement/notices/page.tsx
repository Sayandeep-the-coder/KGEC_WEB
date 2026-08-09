import NoticeBoard from "@/components/NoticeBoard";
import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { notices } from "@/lib/db/schema";
import { desc, eq, inArray } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import {
  Briefcase,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Placement Notices & Drive Updates | Kalyani Government Engineering College",
  description:
    "Live placement schedules, recruiter drive announcements, shortlist circulars, and internship notifications from the KGEC T&P Cell.",
};

const getCachedPlacementNotices = unstable_cache(
  async () => {
    return db
      .select()
      .from(notices)
      .where(eq(notices.isActive, true))
      // .where(inArray(notices.type, ["placement", "general"])) // Alternatively do this in code, but schema only has 6 types
      .orderBy(desc(notices.publishedAt))
      .limit(100);
  },
  ["placement-notices-page"],
  { revalidate: 300, tags: ["notices"] }
);

export default async function PlacementNoticesPage() {
  const dbNotices = await getCachedPlacementNotices();

  const placementNotices = dbNotices
    .filter((n) => n.type.toLowerCase().includes("placement") || n.type.toLowerCase().includes("general"))
    .map((n) => ({
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
        badge="Recruitment & Career Drives"
        title="Training & Placement Notices"
        subtitle="Stay updated with recruitment drive schedules, eligibility criteria, online test links, interview shortlists, and internship opportunities."
      >
        <div className="flex flex-wrap items-center gap-4 mt-2">
          <Link
            href="/training-and-placement/statistics"
            className="px-6 py-3 rounded-full bg-white text-[#022448] font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 hover:bg-slate-100"
          >
            <span>Placement Statistics</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/training-and-placement"
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider transition-all backdrop-blur-sm flex items-center gap-2"
          >
            <Briefcase size={14} />
            <span>T&P Cell Overview</span>
          </Link>
        </div>
      </PageHero>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <NoticeBoard initialNotices={placementNotices} limit={100} showTitle={false} />
        </div>
      </main>

    </UnifiedPageLayout>
  );
}
