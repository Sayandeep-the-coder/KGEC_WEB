import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloadsTable from "@/components/DownloadsTable";
import Link from "next/link";
import {
  DownloadCloud,
  Sparkles,
  FolderOpen,
  FileCheck,
  Award,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export const metadata = {
  title: "Downloads & Document Repository | Kalyani Government Engineering College",
  description:
    "Centralized repository of official downloadable forms, academic circulars, syllabus archives, NIRF reports, and statutory disclosures for KGEC.",
};

export default function DownloadsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>Central Document Archives</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight">
                Downloads & Institutional Repository
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
                Access official administrative forms, admission brochures, mandatory disclosures, NIRF data, and student resources in verified digital formats.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  href="/notices"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E5C9E] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Notice Board</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/nirf"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors backdrop-blur-md"
                >
                  <Award size={16} />
                  <span>NIRF Reports</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-md text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                    <DownloadCloud size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Public Access</p>
                    <p className="text-xl font-bold font-serif">Verified PDFs</p>
                  </div>
                </div>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  All documents and attachments are cryptographically hosted and categorized for instant high-speed access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-12">
        <section className="space-y-6">
          <DownloadsTable title="All Institutional Files & Documents" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
