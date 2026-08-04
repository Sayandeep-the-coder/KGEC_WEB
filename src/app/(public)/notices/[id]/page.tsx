import { notFound } from "next/navigation";
import { FileText, Calendar, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";

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
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge={`${notice.type || "Official"} Notice`}
        title={notice.title}
        subtitle=""
      />

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-16">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 space-y-8">
              <div className="border-b border-slate-100 pb-6">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3">
                  Official Document
                </span>
                <h2 className="text-2xl font-bold font-serif text-[#022448]">{notice.title}</h2>
              </div>

              {notice.fileUrl ? (
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-10 text-center space-y-5 shadow-inner">
                  <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 text-[#225eaa] flex items-center justify-center mx-auto shadow-sm">
                    <FileText size={40} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-[#022448] mb-1">
                      {notice.fileName || "Attached Notice Document"}
                    </p>
                    <p className="text-sm font-medium text-slate-500">{notice.fileType || "PDF Document"}</p>
                  </div>

                  <a
                    href={notice.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#022448] shadow-lg shadow-blue-900/20 text-white text-xs font-bold uppercase tracking-wider hover:bg-[#225eaa] transition-all cursor-pointer mt-4"
                  >
                    <Download size={18} />
                    <span>Open / Download Verified PDF</span>
                  </a>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 text-sm font-medium italic bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  No attached document file for this notification.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

    </UnifiedPageLayout>
  );
}
