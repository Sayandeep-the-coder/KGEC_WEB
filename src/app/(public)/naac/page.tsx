import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloadsTable from "@/components/DownloadsTable";
import Link from "next/link";
import {
  Award,
  Sparkles,
  CheckCircle2,
  FileCheck,
  Building2,
  ArrowRight,
  ShieldCheck
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
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>National Accreditation</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight">
                NAAC Accreditation Disclosures
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
                National Assessment and Accreditation Council (NAAC) evaluation files, Self-Study Reports (SSR), Peer Team assessment reports, and certificates.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  href="/iqac"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E5C9E] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>IQAC Cell</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/nirf"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors backdrop-blur-md"
                >
                  <Award size={16} />
                  <span>NIRF Data</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-md text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                    <Award size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Accreditation</p>
                    <p className="text-xl font-bold font-serif">NAAC Evaluated</p>
                  </div>
                </div>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  Rigorous institutional self-study assessment validating quality assurance standards across academic, research, and infrastructure benchmarks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* NAAC 7-Criteria Grid */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
              Assessment Framework
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              7 Core Criteria for Institutional Assessment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACCREDITATION_CRITERIA.map((c) => (
              <div
                key={c.criterion}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2E5C9E] border border-blue-100 inline-block mb-3">
                    {c.criterion}
                  </span>
                  <h3 className="text-base font-bold text-[#1B2A4A] mb-2">{c.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic NAAC Documents Table */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
              Verification Records
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              Accreditation Documents & Certificates
            </h2>
          </div>

          <DownloadsTable category="naac" title="NAAC Accreditation Documents & SSR" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
