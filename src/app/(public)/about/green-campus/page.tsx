import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Leaf,
  Sun,
  Recycle,
  Droplets,
  Sparkles,
  TreePine,
  ShieldCheck,
  Zap,
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
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>Environmental Sustainability</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight">
                Green Campus & Eco-Initiatives
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
                Fostering an ecologically sustainable, biodiversity-rich 75-acre academic sanctuary in Kalyani through clean energy generation, water stewardship, and environmental ethics.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E5C9E] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>About KGEC</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/campus-life"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors backdrop-blur-md"
                >
                  <Compass size={16} />
                  <span>Campus Life</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-md text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                    <Leaf size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Campus Ecosystem</p>
                    <p className="text-xl font-bold font-serif">75-Acre Sanctuary</p>
                  </div>
                </div>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  KGEC balances engineering innovation with environmental conservation, featuring zero-discharge zones and high green canopy coverage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Core Pillars Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider mb-2">
                Sustainability Framework
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
                Key Green Initiatives
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUSTAINABILITY_PILLARS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2E5C9E] flex items-center justify-center mb-4">
                      <Icon size={22} />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 inline-block mb-2">
                      {item.highlight}
                    </span>
                    <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Environmental Policy Narrative */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
              Institutional Policy
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              Comprehensive Environmental & Clean Energy Policy
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl">
              KGEC has adopted a comprehensive sustainable development protocol aligned with national green campus standards. The institution actively measures, manages, and mitigates its carbon footprint through clean technology deployments and community participation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {GREEN_PRACTICES.map((p, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#2E5C9E]" />
                  <h3 className="font-bold text-sm text-[#1B2A4A]">{p.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
