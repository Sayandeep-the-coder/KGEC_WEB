import DownloadsTable from "@/components/DownloadsTable";
import Link from "next/link";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentCard from "@/components/ui/ContentCard";
import {
  ShieldCheck,
  Target,
  ArrowRight
} from "lucide-react";

export const metadata = {
  title: "Internal Quality Assurance Cell (IQAC) | Kalyani Government Engineering College",
  description:
    "IQAC cell objectives, Annual Quality Assurance Reports (AQAR), quality benchmarks, and institutional audits at KGEC.",
};

const IQAC_OBJECTIVES = [
  {
    title: "Continuous Academic Audits",
    desc: "Systematic review of pedagogical methods, course outcomes (COs), program outcomes (POs), and continuous internal evaluation processes.",
  },
  {
    title: "Quality Benchmarking",
    desc: "Formulating parameters and best practices for academic and administrative operations across all teaching and technical departments.",
  },
  {
    title: "Stakeholder Feedback Mechanism",
    desc: "Collecting, analyzing, and acting upon comprehensive feedback from students, alumni, parents, and industry recruiters.",
  },
  {
    title: "AQAR & Accreditation Preparation",
    desc: "Compiling Annual Quality Assurance Reports (AQAR) and coordinating documentation for NAAC and NBA accreditation compliance.",
  },
];

export default function IQACPage() {
  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Academic Quality & Governance"
        title="Internal Quality Assurance Cell (IQAC)"
        subtitle="Dedicated to institutionalizing quality culture, academic audits, stakeholder feedback systems, and sustained continuous improvement at KGEC."
      >
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <Link
            href="/naac"
            className="inline-flex items-center gap-2 bg-white text-[#022448] rounded-full px-6 py-3 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors shadow-lg"
          >
            <span>NAAC Accreditation</span> <ArrowRight size={16} />
          </Link>
          <Link
            href="/nirf"
            className="inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-3 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            NIRF Disclosures
          </Link>
        </div>
      </PageHero>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
        
        {/* Objectives Grid */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Mandate & Functions"
                title="Core IQAC Objectives"
                subtitle="The primary pillars through which the internal quality cell operates and enforces academic and operational standards."
                align="left"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {IQAC_OBJECTIVES.map((item, idx) => (
                  <ContentCard key={item.title} variant="white" delay={idx * 0.1} className="h-full">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#225eaa] flex items-center justify-center mb-5">
                      <Target size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-[#022448] mb-3">{item.title}</h3>
                    <p className="text-sm text-[#43474e] leading-relaxed font-medium">{item.desc}</p>
                  </ContentCard>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Downloads & AQAR Reports */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-16">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              badge="Document Repository"
              title="AQAR Reports & Quality Records"
              align="left"
            />
            <div className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <DownloadsTable category="iqac" title="IQAC Reports & AQAR Files" />
            </div>
          </div>
        </div>

      </main>

    </UnifiedPageLayout>
  );
}
