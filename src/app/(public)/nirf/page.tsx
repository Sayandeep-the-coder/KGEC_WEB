

import DownloadsTable from "@/components/DownloadsTable";
import Link from "next/link";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentCard from "@/components/ui/ContentCard";
import {
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "NIRF Ranking Data & Disclosures | Kalyani Government Engineering College",
  description:
    "National Institutional Ranking Framework (NIRF, Ministry of Education) submitted data files, executive summaries, and yearly rankings for KGEC.",
};

const NIRF_PILLARS = [
  { label: "Teaching, Learning & Resources (TLR)", desc: "Student strength, faculty-student ratio (FSR), faculty qualification metrics, and financial resource utilization." },
  { label: "Research & Professional Practice (RP)", desc: "Publications in indexed journals (SCOPUS/WoS), citation metrics, IPR & patents, and extramural research projects." },
  { label: "Graduation Outcomes (GO)", desc: "Student pass percentages, median placement salary packages, university exam ranks, and higher study progression." },
  { label: "Outreach & Inclusivity (OI)", desc: "Percentage of students from other states/countries, female student enrollment ratio, and facilities for PwD students." },
  { label: "Peer Perception (PR)", desc: "Perception surveys conducted among employers, academic peers, and public stakeholders regarding institutional excellence." },
];

export default function NIRFPage() {
  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Ministry of Education Rankings"
        title="National Institutional Ranking Framework (NIRF)"
        subtitle="Official data submissions, engineering category reports, and statutory disclosure files submitted to NIRF, Ministry of Education, Government of India."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/iqac"
            className="inline-flex items-center gap-2 border border-white/30 rounded-full px-6 py-3 text-white font-medium hover:bg-white/10 transition-colors"
          >
            IQAC Cell <ArrowRight size={16} />
          </Link>
          <Link
            href="/training-and-placement/statistics"
            className="inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-3 text-white/80 font-medium hover:bg-white/10 transition-colors"
          >
            <TrendingUp size={16} /> Placement Statistics
          </Link>
        </div>
      </PageHero>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">

        {/* NIRF Parameters Grid */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Evaluation Metrics"
                title="NIRF Assessment Parameters"
                align="left"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {NIRF_PILLARS.map((p, idx) => (
                  <ContentCard key={idx} variant="white" delay={idx * 0.05} className="border-[#e6eeff]">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#225eaa] border border-blue-100 inline-block mb-3">
                      Parameter {idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-[#022448] mb-2">{p.label}</h3>
                    <p className="text-xs text-[#43474e] leading-relaxed">{p.desc}</p>
                  </ContentCard>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Documents Table */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Submission Archives"
                title="Yearly NIRF Data Submissions & Reports"
                align="left"
              />
              <div className="mt-8">
                <DownloadsTable category="nirf" title="NIRF Submissions & Data Reports" />
              </div>
            </div>
          </div>
        </div>

      </main>

    </UnifiedPageLayout>
  );
}
