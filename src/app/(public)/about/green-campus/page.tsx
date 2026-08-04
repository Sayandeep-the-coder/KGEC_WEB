

import Link from "next/link";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentCard from "@/components/ui/ContentCard";
import {
  Leaf,
  Sun,
  Recycle,
  Droplets,
  TreePine,
  ShieldCheck,
  ArrowRight,
  Compass
} from "lucide-react";

export const metadata = {
  title: "Green Campus & Sustainability | Kalyani Government Engineering College",
  description:
    "Explore the environmental initiatives, clean energy transition, water conservation, and biodiversity preservation at KGEC's 75-acre green campus.",
};

const SUSTAINABILITY_PILLARS = [
  {
    icon: Sun,
    title: "Solar Clean Energy",
    highlight: "100 kWp Grid Tied",
    text: "Rooftop solar photovoltaic arrays generating clean renewable energy, reducing grid dependency and lowering institutional carbon footprint.",
  },
  {
    icon: TreePine,
    title: "75-Acre Biodiversity",
    highlight: "5000+ Native Trees",
    text: "Extensive botanical reserves, lush green lawns, and medicinal plantations creating an oxygen-rich micro-climate across the Kalyani campus.",
  },
  {
    icon: Droplets,
    title: "Rainwater Harvesting",
    highlight: "Groundwater Recharge",
    text: "Integrated catchment basins and percolation reservoirs capturing monsoon runoffs to recharge aquifers and supply horticulture irrigation.",
  },
  {
    icon: Recycle,
    title: "Solid & E-Waste Management",
    highlight: "Zero Open Waste",
    text: "Systematic segregation at source, organic composting for garden fertilizers, and authorized recycling of laboratory electronic components.",
  },
];

const GREEN_PRACTICES = [
  {
    title: "Pedestrian-First Green Mobility",
    desc: "Motorized vehicles restricted to peripheral parking zones. Tree-lined walkways, shaded pathways, and bicycle ranks encourage zero-emission transit across academic complexes and student residences.",
  },
  {
    title: "Energy Efficient Infrastructure",
    desc: "Complete transition to energy-efficient LED luminaires, sensor-automated hallway lighting, and high-efficiency BLDC ventilation systems across all lecture theatres and departmental laboratories.",
  },
  {
    title: "Student-Led Eco Societies",
    desc: "Active participation in annual Van Mahotsav tree-planting drives, campus environmental audits, and climate awareness hackathons organized in partnership with local civic bodies.",
  },
  {
    title: "Paperless Digital Administration",
    desc: "Automated institutional notice boards, cloud repository for academic records, digital marks submission, and online student fee clearance minimizing institutional paper usage.",
  },
];

export default function GreenCampusPage() {
  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Environmental Sustainability"
        title="Green Campus & Eco-Initiatives"
        subtitle="Fostering an ecologically sustainable, biodiversity-rich 75-acre academic sanctuary in Kalyani through clean energy generation, water stewardship, and environmental ethics."
        backgroundImage="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      >
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 border border-white/30 rounded-full px-6 py-3 text-white font-medium hover:bg-white/10 transition-colors"
          >
            About KGEC <ArrowRight size={16} />
          </Link>
          <Link
            href="/campus-life"
            className="inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-3 text-white/80 font-medium hover:bg-white/10 transition-colors"
          >
            <Compass size={16} /> Campus Life
          </Link>
        </div>
      </PageHero>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">

        {/* Core Pillars Grid */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Sustainability Framework"
                title="Key Green Initiatives"
                align="left"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {SUSTAINABILITY_PILLARS.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <ContentCard key={item.title} variant="white" delay={idx * 0.1} className="border-[#e6eeff]">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                        <Icon size={22} />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 inline-block mb-2">
                        {item.highlight}
                      </span>
                      <h3 className="text-lg font-bold text-[#022448] mb-2">{item.title}</h3>
                      <p className="text-xs text-[#43474e] leading-relaxed">{item.text}</p>
                    </ContentCard>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Environmental Policy Narrative */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Institutional Policy"
                title="Comprehensive Environmental & Clean Energy Policy"
                subtitle="KGEC has adopted a comprehensive sustainable development protocol aligned with national green campus standards. The institution actively measures, manages, and mitigates its carbon footprint through clean technology deployments and community participation."
                align="left"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {GREEN_PRACTICES.map((p, idx) => (
                  <ContentCard key={idx} variant="white" hover={false} delay={idx * 0.05} className="bg-slate-50/50 border-slate-200/80">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck size={18} className="text-[#225eaa]" />
                      <h3 className="font-bold text-sm text-[#022448]">{p.title}</h3>
                    </div>
                    <p className="text-xs text-[#43474e] leading-relaxed">{p.desc}</p>
                  </ContentCard>
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>

    </UnifiedPageLayout>
  );
}
