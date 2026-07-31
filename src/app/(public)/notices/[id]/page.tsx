import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { FileText, Calendar, Download, ArrowLeft } from "lucide-react";
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
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans w-full">
      <Header />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-kgec-navy transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          <span>Back to Notice Board</span>
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-kgec-blue">
              {notice.type} Notice
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <Calendar size={14} />
              <span>{new Date(notice.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold font-serif text-slate-900 leading-snug mb-6">
            {notice.title}
          </h1>

          {notice.fileUrl ? (
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center">
              <FileText size={48} className="text-kgec-blue mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-900 mb-1">{notice.fileName || "Attached Notice Document"}</p>
              <p className="text-xs text-slate-500 mb-4">{notice.fileType || "PDF Document"}</p>

              <a
                href={notice.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-kgec-navy text-white text-xs font-bold hover:bg-kgec-blue transition-colors cursor-pointer"
              >
                <Download size={14} />
                <span>Open / Download File</span>
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
