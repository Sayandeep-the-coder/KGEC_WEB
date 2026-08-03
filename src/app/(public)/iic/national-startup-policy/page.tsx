import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloadsTable from "@/components/DownloadsTable";
import Link from "next/link";
import {
  Rocket,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft
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
            <span>National Startup Framework</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight">
                National Innovation & Startup Policy (NISP)
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
                Empowering student innovators and faculty researchers to transform technology prototypes into commercially viable, high-impact enterprise startups.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  href="/iic/e-cell"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E5C9E] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Entrepreneurship Cell</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/iic/iipc"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors backdrop-blur-md"
                >
                  <ShieldCheck size={16} />
                  <span>Industry Cell (IIPC)</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-md text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                    <Rocket size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">MoE Guidelines</p>
                    <p className="text-xl font-bold font-serif">NISP Adopted</p>
                  </div>
                </div>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  KGEC operates under the national startup guidelines formulated by the Ministry of Education&apos;s Innovation Cell (MIC).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Core Policy Provisions Grid */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
              Institutional Framework
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              Key Policy Provisions & Benefits
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {POLICY_PROVISIONS.map((p, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 size={20} className="text-[#2E5C9E]" />
                    <h3 className="text-lg font-bold text-[#1B2A4A]">{p.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NISP Documents Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
              Policy Disclosures
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              NISP Guidelines & Committee Formations
            </h2>
          </div>

          <DownloadsTable category="iic" title="NISP Policy Documents & Resolution Files" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
