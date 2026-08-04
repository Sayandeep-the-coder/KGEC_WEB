import DownloadsTable from "@/components/DownloadsTable";
import Link from "next/link";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentCard from "@/components/ui/ContentCard";
import {
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "National Innovation & Startup Policy (NISP) | KGEC",
  description:
    "National Innovation and Startup Policy (NISP) guidelines, IPR framework, incubation incentives, and faculty-student startup guidelines at KGEC.",
};

const POLICY_PROVISIONS = [
  {
    title: "Student Startup Support & Academic Credits",
    desc: "Undergraduate and postgraduate students establishing incubated enterprises are eligible to convert startup prototypes and business validation into academic mini-projects and major capstone credits.",
  },
  {
    title: "Intellectual Property Rights (IPR) & Equity",
    desc: "Transparent ownership model enabling student and faculty innovators to retain primary patent rights with institutional mentoring, patent attorney assistance, and minimal licensing obligations.",
  },
  {
    title: "Seed Incubation & Infrastructure Access",
    desc: "Zero-cost access to high-performance computing clusters, IoT prototyping equipment, 3D printing facilities, high-speed campus internet, and dedicated meeting pods within the campus incubation wing.",
  },
  {
    title: "Faculty Mentorship & Sabbatical Leave",
    desc: "Provisions allowing faculty researchers to spend time on startup advisory boards, consult on technology transfer, and take entrepreneurial sabbaticals as per AICTE/NISP norms.",
  },
];

export default function NationalStartupPolicyPage() {
  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="National Startup Framework"
        title="National Innovation & Startup Policy (NISP)"
        subtitle="Empowering student innovators and faculty researchers to transform technology prototypes into commercially viable, high-impact enterprise startups."
      >
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <Link
            href="/iic/e-cell"
            className="inline-flex items-center gap-2 bg-white text-[#022448] rounded-full px-6 py-3 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors shadow-lg"
          >
            <span>Entrepreneurship Cell</span> <ArrowRight size={16} />
          </Link>
          <Link
            href="/iic/iipc"
            className="inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-3 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            Industry Cell (IIPC)
          </Link>
        </div>
      </PageHero>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
        {/* Core Policy Provisions Grid */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Institutional Framework"
                title="Key Policy Provisions & Benefits"
                subtitle="Guidelines set forth to ease the transition from academia to entrepreneurship, protecting IP and encouraging faculty participation."
                align="left"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {POLICY_PROVISIONS.map((p, idx) => (
                  <ContentCard key={idx} variant="white" delay={idx * 0.1}>
                    <div className="flex items-start gap-4 mb-3">
                      <div className="p-2 bg-blue-50 text-[#225eaa] rounded-xl shrink-0">
                        <CheckCircle2 size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-[#022448] mt-1">{p.title}</h3>
                    </div>
                    <p className="text-sm text-[#43474e] leading-relaxed ml-14">{p.desc}</p>
                  </ContentCard>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* NISP Documents Section */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 pb-12">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              badge="Policy Disclosures"
              title="NISP Guidelines & Committee Formations"
              align="left"
            />
            <div className="mt-6 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <DownloadsTable category="iic" title="NISP Policy Documents & Resolution Files" />
            </div>
          </div>
        </div>
      </main>

    </UnifiedPageLayout>
  );
}
