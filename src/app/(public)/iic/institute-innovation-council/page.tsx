import DownloadsTable from "@/components/DownloadsTable";
import Link from "next/link";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentCard from "@/components/ui/ContentCard";
import {
  Calendar,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Institute Innovation Council (IIC Council) | KGEC",
  description:
    "Institutional council leadership, quarterly activity calendars, hackathons, and innovation drives under the Ministry of Education's Innovation Cell (MIC).",
};

const IIC_CALENDAR_ACTIVITIES = [
  {
    quarter: "Quarter 1 (Jul - Sep)",
    title: "Ideation & Innovation Orientation",
    desc: "National Innovation Day celebrations, Design Thinking and Critical Thinking workshops, student team formations, and orientation on intellectual property basics.",
  },
  {
    quarter: "Quarter 2 (Oct - Dec)",
    title: "Prototype Development & Validation",
    desc: "National Education Day symposium, Pitching Prototype competitions, internal Smart India Hackathon (SIH) qualifiers, and mentorship by alumni founders.",
  },
  {
    quarter: "Quarter 3 (Jan - Mar)",
    title: "Business Modeling & Angel Pitching",
    desc: "National Science Day technological exhibitions, Business Plan competitions, E-Summit keynote sessions, and angel investor interaction roundtables.",
  },
  {
    quarter: "Quarter 4 (Apr - Jun)",
    title: "IPR Filings & Incubation Onboarding",
    desc: "World Intellectual Property Day celebrations, provisional patent drafting assistance, startup incubation agreements, and annual IIC performance auditing.",
  },
];

export default function InstituteInnovationCouncilPage() {
  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="MHRD Innovation Cell"
        title="Institute Innovation Council (IIC)"
        subtitle="Driving systematic annual innovation calendars, hackathons, patent filing workshops, and technology incubation drives established under MoE's Innovation Cell."
      >
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <Link
            href="/iic/e-cell"
            className="inline-flex items-center gap-2 bg-white text-[#022448] rounded-full px-6 py-3 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors shadow-lg"
          >
            <span>Entrepreneurship Cell</span> <ArrowRight size={16} />
          </Link>
          <Link
            href="/iic/national-startup-policy"
            className="inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-3 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            NISP Policy
          </Link>
        </div>
      </PageHero>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
        {/* Annual Activity Calendar */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Yearly Schedule"
                title="Prescribed Activity Framework (Q1 to Q4)"
                subtitle="The structured annual calendar guided by the Ministry of Education to drive continuous innovation on campus."
                align="left"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {IIC_CALENDAR_ACTIVITIES.map((act, idx) => (
                  <ContentCard key={idx} variant="white" delay={idx * 0.1}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#225eaa] font-bold text-xs">
                        {act.quarter}
                      </span>
                      <Calendar size={20} className="text-[#225eaa]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#022448] mb-3">{act.title}</h3>
                    <p className="text-sm text-[#43474e] leading-relaxed">{act.desc}</p>
                  </ContentCard>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Downloads Section */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 pb-12">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              badge="Reports & Evidence"
              title="IIC Annual Reports & Meeting Minutes"
              align="left"
            />
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <DownloadsTable category="iic" title="IIC Activity Reports & Documentation" />
            </div>
          </div>
        </div>
      </main>

    </UnifiedPageLayout>
  );
}
