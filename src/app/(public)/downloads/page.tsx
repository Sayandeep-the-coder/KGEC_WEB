import DownloadsTable from "@/components/DownloadsTable";
import Link from "next/link";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Downloads & Document Repository | Kalyani Government Engineering College",
  description:
    "Centralized repository of official downloadable forms, academic circulars, syllabus archives, NIRF reports, and statutory disclosures for KGEC.",
};

export default function DownloadsPage() {
  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Central Document Archives"
        title="Downloads & Institutional Repository"
        subtitle="Access official administrative forms, admission brochures, mandatory disclosures, NIRF data, and student resources in verified digital formats."
      >
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <Link
            href="/notices"
            className="inline-flex items-center gap-2 bg-white text-[#022448] rounded-full px-6 py-3 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors shadow-lg"
          >
            <span>Notice Board</span> <ArrowRight size={16} />
          </Link>
          <Link
            href="/nirf"
            className="inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-3 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            NIRF Reports
          </Link>
        </div>
      </PageHero>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
        
        {/* Full Repository */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-16">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              badge="File Explorer"
              title="All Institutional Files & Documents"
              align="left"
            />
            <div className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <DownloadsTable title="Downloadable Resources" />
            </div>
          </div>
        </div>

      </main>

    </UnifiedPageLayout>
  );
}
