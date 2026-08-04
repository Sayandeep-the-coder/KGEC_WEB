

import DownloadsTable from "@/components/DownloadsTable";
import Link from "next/link";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentCard from "@/components/ui/ContentCard";
import {
  Award,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "NAAC Accreditation & Disclosures | Kalyani Government Engineering College",
  description:
    "Official NAAC accreditation certificates, Self-Study Reports (SSR), Peer Team recommendations, and compliance documents for KGEC.",
};

const ACCREDITATION_CRITERIA = [
  { criterion: "Criterion 1", title: "Curricular Aspects", desc: "Curriculum enrichment, academic flexibility, and structured feedback mechanisms." },
  { criterion: "Criterion 2", title: "Teaching-Learning & Evaluation", desc: "Student-centric pedagogical methods, faculty profile quality, and continuous evaluation." },
  { criterion: "Criterion 3", title: "Research, Innovations & Extension", desc: "Extramural funding, peer-reviewed publications, patent output, and community outreach." },
  { criterion: "Criterion 4", title: "Infrastructure & Learning Resources", desc: "Advanced laboratory equipment, computing facilities, digital library, and green campus." },
  { criterion: "Criterion 5", title: "Student Support & Progression", desc: "Placement training, scholarships, student council representation, and alumni mentorship." },
  { criterion: "Criterion 6", title: "Governance, Leadership & Management", desc: "Decentralized governance, institutional strategic planning, and financial management." },
  { criterion: "Criterion 7", title: "Institutional Values & Best Practices", desc: "Green initiatives, gender equity measures, renewable energy adoption, and distinctiveness." },
];

export default function NAACPage() {
  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="National Accreditation"
        title="NAAC Accreditation Disclosures"
        subtitle="National Assessment and Accreditation Council (NAAC) evaluation files, Self-Study Reports (SSR), Peer Team assessment reports, and certificates."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/iqac"
            className="inline-flex items-center gap-2 border border-white/30 rounded-full px-6 py-3 text-white font-medium hover:bg-white/10 transition-colors"
          >
            IQAC Cell <ArrowRight size={16} />
          </Link>
          <Link
            href="/nirf"
            className="inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-3 text-white/80 font-medium hover:bg-white/10 transition-colors"
          >
            <Award size={16} /> NIRF Data
          </Link>
        </div>
      </PageHero>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">

        {/* 7-Criteria Grid */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Assessment Framework"
                title="7 Core Criteria for Institutional Assessment"
                align="left"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {ACCREDITATION_CRITERIA.map((c, idx) => (
                  <ContentCard key={c.criterion} variant="white" delay={idx * 0.05} className="border-[#e6eeff]">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#225eaa] border border-blue-100 inline-block mb-3">
                      {c.criterion}
                    </span>
                    <h3 className="text-base font-bold text-[#022448] mb-2">{c.title}</h3>
                    <p className="text-xs text-[#43474e] leading-relaxed">{c.desc}</p>
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
                badge="Verification Records"
                title="Accreditation Documents & Certificates"
                align="left"
              />
              <div className="mt-8">
                <DownloadsTable category="naac" title="NAAC Accreditation Documents & SSR" />
              </div>
            </div>
          </div>
        </div>

      </main>

    </UnifiedPageLayout>
  );
}
