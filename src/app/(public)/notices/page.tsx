import NoticeBoard from "@/components/NoticeBoard";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { notices } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Notice Board | Kalyani Government Engineering College",
  description: "Official notices, academic circulars, examination schedules, and general announcements from KGEC.",
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
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Banner */}
        <div className="bg-[#0f2552] text-white rounded-3xl p-8 md:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Campus Communication Portal
            </span>
            <h1 className="text-3xl md:text-4xl font-bold font-serif">
              Official KGEC Notice Board
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl">
              Stay updated with academic circulars, exam notifications, admission announcements, tenders, and general information released by KGEC administration.
            </p>
          </div>
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
        </div>

        {/* Public Notice Board Component */}
        <NoticeBoard initialNotices={initialNotices} limit={100} showTitle={true} />
      </div>
    </main>
  );
}
