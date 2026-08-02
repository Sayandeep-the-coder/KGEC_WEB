import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { FileText, Calendar, Download, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getNotice(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/notices/${id}`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    console.error("Error fetching notice detail:", err);
    return null;
  }
}

export default async function NoticeDetailPage({ params }: PageProps) {
  const { id } = await params;
  const notice = await getNotice(id);

  if (!notice) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-14 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/notices"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            <span>Back to All Notices</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
            <Sparkles size={12} className="text-blue-300" />
            <span>{notice.type || "Official"} Notice</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold tracking-tight font-serif leading-tight">
            {notice.title}
          </h1>

          <div className="flex items-center gap-2 text-xs text-blue-200/80 mt-4">
            <Calendar size={14} />
            <span>
              Published on {new Date(notice.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-6">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
              Official Document
            </span>
            <h2 className="text-xl font-bold text-[#1B2A4A]">{notice.title}</h2>
          </div>

          {notice.fileUrl ? (
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#2E5C9E] flex items-center justify-center mx-auto">
                <FileText size={32} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#1B2A4A] mb-1">
                  {notice.fileName || "Attached Notice Document"}
                </p>
                <p className="text-xs text-slate-500">{notice.fileType || "PDF Document"}</p>
              </div>

              <a
                href={notice.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B2A4A] text-white text-xs font-bold hover:bg-[#2E5C9E] transition-colors shadow-sm cursor-pointer"
              >
                <Download size={15} />
                <span>Open / Download Verified PDF</span>
              </a>
            </div>
          ) : (
            <div className="py-8 text-center text-slate-500 text-xs italic">
              No attached document file for this notification.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
