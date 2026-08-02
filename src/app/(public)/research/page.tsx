import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  FlaskConical,
  Award,
  BookOpen,
  Sparkles,
  Cpu,
  Zap,
  Globe,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
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
    status: "Ongoing Grant",
  },
  {
    agency: "AICTE-RPS",
    title: "Development of AI-Powered Intelligent Energy Management in Solar-Microgrids",
    investigator: "Department of Electrical Engineering",
    status: "Active Research",
  },
  {
    agency: "State DST West Bengal",
    title: "Natural Language Understanding and Semantic Search in Regional Vernacular Corpora",
    investigator: "Department of Computer Science & Engineering",
    status: "Completed & Deployed",
  },
];

export default function ResearchPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>Academic Research & Innovation</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight">
                Research & Development Cell
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
                Driving cutting-edge breakthroughs across Artificial Intelligence, Clean Energy Systems, VLSI, Robotics, and Materials Science through funded grants and interdisciplinary discovery.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  href="/departments"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E5C9E] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Department Labs</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/iic"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors backdrop-blur-md"
                >
                  <Globe size={16} />
                  <span>Innovation & IIC</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-md text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Publication Output</p>
                    <p className="text-xl font-bold font-serif">SCOPUS & IEEE</p>
                  </div>
                </div>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  Faculty and research scholars actively author high-impact peer-reviewed journal articles, conference papers, and patent filings annually.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Thrust Areas */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
              Specialized Domains
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              Core Research Thrust Areas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESEARCH_THRUST_AREAS.map((item) => {
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
                    <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Funded Projects Highlight */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
              Extramural Grants
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              Sponsored Research Projects & Grants
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Selected extramurally sponsored investigations supported by government research councils and funding agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {FUNDED_PROJECT_HIGHLIGHTS.map((proj, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#1B2A4A] font-bold text-[11px]">
                      {proj.agency}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      {proj.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-[#1B2A4A] leading-snug mb-2">{proj.title}</h3>
                  <p className="text-xs text-slate-500">{proj.investigator}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Faculty Publications Link Section */}
        <section className="bg-linear-to-r from-[#1B2A4A] to-[#2E5C9E] text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-300">
              Department Publications & Faculty Portfolios
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-serif">
              Explore Faculty Research Directories
            </h2>
            <p className="text-xs md:text-sm text-blue-100 leading-relaxed">
              Individual citations, journal papers, conference proceedings, and doctoral supervision profiles are indexed under the respective department faculty portals.
            </p>
          </div>
          <Link
            href="/departments"
            className="shrink-0 px-8 py-4 rounded-xl bg-white text-[#1B2A4A] hover:bg-blue-50 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
          >
            Browse Departments
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
