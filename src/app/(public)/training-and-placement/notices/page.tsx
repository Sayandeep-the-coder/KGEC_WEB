import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NoticeBoard from "@/components/NoticeBoard";
import { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import { notices } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import {
  Briefcase,
  Sparkles,
  TrendingUp,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export const metadata: Metadata = {
  title: "Placement Notices & Drive Updates | Kalyani Government Engineering College",
  description:
    "Live placement schedules, recruiter drive announcements, shortlist circulars, and internship notifications from the KGEC T&P Cell.",
};

export const dynamic = "force-dynamic";

export default async function PlacementNoticesPage() {
  const dbNotices = await db
    .select()
    .from(notices)
    .where(eq(notices.isActive, true))
    .orderBy(desc(notices.publishedAt))
    .limit(100);

  const placementNotices = dbNotices
    .filter((n) => n.type.toLowerCase().includes("placement") || n.type.toLowerCase().includes("general"))
    .map((n) => ({
      id: n.id,
      title: n.title,
      type: n.type,
      fileUrl: n.fileUrl || n.pdfUrl,
      fileName: n.fileName,
      fileType: n.fileType,
      publishedAt: n.publishedAt.toISOString(),
    }));

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>Recruitment & Career Drives</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight">
                Training & Placement Notices
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
                Stay updated with recruitment drive schedules, eligibility criteria, online test links, interview shortlists, and internship opportunities.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  href="/training-and-placement/statistics"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E5C9E] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Placement Statistics</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/training-and-placement"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors backdrop-blur-md"
                >
                  <Briefcase size={16} />
                  <span>T&P Cell Overview</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-md text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">T&P Portal</p>
                    <p className="text-xl font-bold font-serif">Campus Placements</p>
                  </div>
                </div>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  Real-time synchronization with active corporate campus recruitment drives and internship hiring rounds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-12">
        <NoticeBoard initialNotices={placementNotices} limit={100} showTitle={false} />
      </main>

      <Footer />
    </div>
  );
}
