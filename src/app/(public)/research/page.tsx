

import Link from "next/link";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentCard from "@/components/ui/ContentCard";
import {
  FlaskConical,
  Cpu,
  Zap,
  Layers,
  CheckCircle2,
  ArrowRight,
  Globe,
} from "lucide-react";

export const metadata = {
  title: "Research & Development Cell | Kalyani Government Engineering College",
  description:
    "Explore funded research projects, AI & VLSI thrust areas, peer-reviewed publications, patents, and laboratory facilities at KGEC.",
};

const RESEARCH_THRUST_AREAS = [
  {
    icon: Cpu,
    title: "AI, Machine Learning & Vision",
    desc: "Deep learning algorithms, healthcare imaging diagnostics, natural language modeling, edge intelligence, and automated visual surveillance systems.",
  },
  {
    icon: Zap,
    title: "Smart Grids & Power Electronics",
    desc: "Renewable energy grid integration, wide-bandgap semiconductor drives, power quality stabilization, and high-efficiency micro-converters.",
  },
  {
    icon: FlaskConical,
    title: "Advanced Materials & Nanotechnology",
    desc: "Polymer composites, nanostructured catalytic surfaces, functional materials for energy storage, and thin-film sensor fabrication.",
  },
  {
    icon: Layers,
    title: "VLSI, RF & Embedded Systems",
    desc: "Low-power ASIC architectures, microstrip antenna design, 5G/6G communication circuits, and fault-tolerant IoT sensor nodes.",
  },
];

const FUNDED_PROJECT_HIGHLIGHTS = [
  {
    agency: "DST-SERB",
    title: "Design of Low-Power High-Performance Hybrid Architectures for Biomedical Signal Classification",
    investigator: "Department of Electronics & Communication Engineering",
    status: "Completed",
  },
  {
    agency: "AICTE-RPS",
    title: "Development of Smart Energy Management System with IoT-enabled Renewable Integration",
    investigator: "Department of Electrical Engineering",
    status: "Ongoing",
  },
  {
    agency: "UGC-DAE CSR",
    title: "Synthesis and Characterization of Nanostructured Thin Films for Photocatalytic Applications",
    investigator: "Department of Applied Science",
    status: "Completed",
  },
];

export default function ResearchPage() {
  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Academic Research & Innovation"
        title="Research & Development Cell"
        subtitle="Driving cutting-edge breakthroughs across Artificial Intelligence, Clean Energy Systems, VLSI, Robotics, and Materials Science through funded grants and interdisciplinary discovery."
        backgroundImage="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80"
      >
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/departments"
            className="inline-flex items-center gap-2 border border-white/30 rounded-full px-6 py-3 text-white font-medium hover:bg-white/10 transition-colors"
          >
            Department Labs <ArrowRight size={16} />
          </Link>
          <Link
            href="/iic"
            className="inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-3 text-white/80 font-medium hover:bg-white/10 transition-colors"
          >
            <Globe size={16} /> Innovation & IIC
          </Link>
        </div>
      </PageHero>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">

        {/* Thrust Areas */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Specialized Domains"
                title="Core Research Thrust Areas"
                align="left"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {RESEARCH_THRUST_AREAS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <ContentCard key={item.title} variant="white" delay={idx * 0.1} className="border-[#e6eeff]">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#225eaa] flex items-center justify-center mb-4">
                        <Icon size={22} />
                      </div>
                      <h3 className="text-lg font-bold text-[#022448] mb-2">{item.title}</h3>
                      <p className="text-xs text-[#43474e] leading-relaxed">{item.desc}</p>
                    </ContentCard>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Funded Projects */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Extramural Grants"
                title="Sponsored Research Projects & Grants"
                subtitle="Selected extramurally sponsored investigations supported by government research councils and funding agencies."
                align="left"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {FUNDED_PROJECT_HIGHLIGHTS.map((proj, idx) => (
                  <ContentCard key={idx} variant="white" hover={false} delay={idx * 0.05} className="bg-slate-50/50 border-slate-200/80">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#022448] font-bold text-[11px]">
                        {proj.agency}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        {proj.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-[#022448] leading-snug mb-2">{proj.title}</h3>
                    <p className="text-xs text-[#43474e]">{proj.investigator}</p>
                  </ContentCard>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Faculty Publications CTA */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <ContentCard variant="dark" hover={false} className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-[#76A9FA]">
                Department Publications & Faculty Portfolios
              </span>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-white">
                Explore Faculty Research Directories
              </h2>
              <p className="text-xs md:text-sm text-blue-100 leading-relaxed">
                Individual citations, journal papers, conference proceedings, and doctoral supervision profiles are indexed under the respective department faculty portals.
              </p>
            </div>
            <Link
              href="/departments"
              className="shrink-0 px-8 py-4 rounded-xl bg-white text-[#022448] hover:bg-blue-50 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
            >
              Browse Departments
            </Link>
          </ContentCard>
        </div>

      </main>

    </UnifiedPageLayout>
  );
}
