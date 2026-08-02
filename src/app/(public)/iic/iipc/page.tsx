import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloadsTable from "@/components/DownloadsTable";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  Building2,
  Briefcase,
  Layers,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Globe
} from "lucide-react";

export const metadata = {
  title: "Industry Institute Partnership Cell (IIPC) | KGEC",
  description:
    "Bridging academic engineering with corporate R&D through consultancy projects, industrial apprenticeships, MoUs, and joint technical labs at KGEC.",
};

const IIPC_SERVICES = [
  {
    title: "Corporate Technical Consultancy",
    desc: "Deploying senior faculty domain experts and advanced laboratory infrastructure to address complex engineering and operational challenges faced by industrial partners.",
  },
  {
    title: "Joint Research & Industrial MoUs",
    desc: "Formalizing bilateral Memorandums of Understanding (MoUs) for collaborative research, specialized technology licensing, and sponsored testing facilities.",
  },
  {
    title: "Industrial Tours & Live Apprenticeships",
    desc: "Coordinating hands-on student visits to power plants, manufacturing complexes, IT development centers, and core engineering refineries across West Bengal and India.",
  },
  {
    title: "Continuing Professional Education",
    desc: "Customized technical upskilling and certification workshops designed by KGEC faculty for working engineers and corporate technical personnel.",
  },
];

export default function IIPCPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            href="/iic"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            <span>Back to IIC Overview</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>Industry Synergy Wing</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight">
                Industry Institute Partnership Cell (IIPC)
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
                Bridging the gap between academic innovation and corporate industry demands through sponsored consultancy, institutional MoUs, and industrial training.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  href="/training-and-placement"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E5C9E] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Placement Cell</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/research"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors backdrop-blur-md"
                >
                  <Building2 size={16} />
                  <span>Research Labs</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-md text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Corporate Linkage</p>
                    <p className="text-xl font-bold font-serif">Active MoUs</p>
                  </div>
                </div>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  Facilitating knowledge exchange and state-of-the-art testing consultancy with regional and multinational engineering corporations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Core Services */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
              Engagement Verticals
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              Industry Collaboration Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {IIPC_SERVICES.map((s, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 size={20} className="text-[#2E5C9E]" />
                    <h3 className="text-lg font-bold text-[#1B2A4A]">{s.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic IIPC Downloads Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
              MoU & Documentation
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              Industrial Agreements & Consultancy Guidelines
            </h2>
          </div>

          <DownloadsTable category="iic" title="IIPC Guidelines & MoU Documents" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
