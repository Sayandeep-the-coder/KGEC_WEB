import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloadsTable from "@/components/DownloadsTable";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Award,
  FileText,
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
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>Academic Quality & Governance</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight">
                Internal Quality Assurance Cell (IQAC)
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
                Dedicated to institutionalizing quality culture, academic audits, stakeholder feedback systems, and sustained continuous improvement at KGEC.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  href="/naac"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E5C9E] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>NAAC Accreditation</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/nirf"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors backdrop-blur-md"
                >
                  <Award size={16} />
                  <span>NIRF Disclosures</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-md text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Quality Assurance</p>
                    <p className="text-xl font-bold font-serif">Excellence First</p>
                  </div>
                </div>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  IQAC guides the institutional self-study process, encouraging technological modernization, curriculum alignment, and outcome-based engineering education.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Objectives Grid */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
              Mandate & Functions
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              Core IQAC Objectives
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {IQAC_OBJECTIVES.map((item) => (
              <div
                key={item.title}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2E5C9E] flex items-center justify-center mb-4">
                    <Target size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic Downloads & AQAR Reports */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
              Document Repository
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              AQAR Reports & Quality Records
            </h2>
          </div>

          <DownloadsTable category="iqac" title="IQAC Reports & AQAR Files" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
