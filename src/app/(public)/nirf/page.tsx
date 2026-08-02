import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloadsTable from "@/components/DownloadsTable";
import Link from "next/link";
import {
  Award,
  Sparkles,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export const metadata = {
  title: "NIRF Ranking Data & Disclosures | Kalyani Government Engineering College",
  description:
    "National Institutional Ranking Framework (NIRF, Ministry of Education) submitted data files, executive summaries, and yearly rankings for KGEC.",
};

const NIRF_PILLARS = [
  { label: "Teaching, Learning & Resources (TLR)", desc: "Student strength, faculty-student ratio (FSR), faculty qualification metrics, and financial resource utilization." },
  { label: "Research & Professional Practice (RP)", desc: "Publications in indexed journals (SCOPUS/WoS), citation metrics, IPR & patents, and extramural research projects." },
  { label: "Graduation Outcomes (GO)", desc: "Student pass percentages, median placement salary packages, university exam ranks, and higher study progression." },
  { label: "Outreach & Inclusivity (OI)", desc: "Percentage of students from other states/countries, female student enrollment ratio, and facilities for PwD students." },
  { label: "Peer Perception (PR)", desc: "Perception surveys conducted among employers, academic peers, and public stakeholders regarding institutional excellence." },
];

export default function NIRFPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>Ministry of Education Rankings</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight">
                National Institutional Ranking Framework (NIRF)
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
                Official data submissions, engineering category reports, and statutory disclosure files submitted to NIRF, Ministry of Education, Government of India.
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
                  href="/training-and-placement/statistics"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors backdrop-blur-md"
                >
                  <TrendingUp size={16} />
                  <span>Placement Statistics</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-md text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                    <FileSpreadsheet size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">MoE Data</p>
                    <p className="text-xl font-bold font-serif">Verified Submissions</p>
                  </div>
                </div>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  Annual institutional disclosures providing complete transparency across graduation outcomes, faculty qualifications, and research metrics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* NIRF Parameters Grid */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
              Evaluation Metrics
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              NIRF Assessment Parameters
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NIRF_PILLARS.map((p, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2E5C9E] border border-blue-100 inline-block mb-3">
                    Parameter {idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-[#1B2A4A] mb-2">{p.label}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic NIRF Documents Table */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
              Submission Archives
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              Yearly NIRF Data Submissions & Reports
            </h2>
          </div>

          <DownloadsTable category="nirf" title="NIRF Submissions & Data Reports" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
