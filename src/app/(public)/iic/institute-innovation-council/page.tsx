import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloadsTable from "@/components/DownloadsTable";
import Link from "next/link";
import {
  Lightbulb,
  Sparkles,
  Award,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Users,
  Compass
} from "lucide-react";

export const metadata = {
  title: "Institute Innovation Council (IIC Council) | KGEC",
  description:
    "Institutional council leadership, quarterly activity calendars, hackathons, and innovation drives under the Ministry of Education's Innovation Cell (MIC).",
};

const IIC_CALENDAR_ACTIVITIES = [
  {
    quarter: "Quarter 1 (Jul - Sep)",
    title: "Ideation & Innovation Orientation",
    desc: "National Innovation Day celebrations, Design Thinking and Critical Thinking workshops, student team formations, and orientation on intellectual property basics.",
  },
  {
    quarter: "Quarter 2 (Oct - Dec)",
    title: "Prototype Development & Validation",
    desc: "National Education Day symposium, Pitching Prototype competitions, internal Smart India Hackathon (SIH) qualifiers, and mentorship by alumni founders.",
  },
  {
    quarter: "Quarter 3 (Jan - Mar)",
    title: "Business Modeling & Angel Pitching",
    desc: "National Science Day technological exhibitions, Business Plan competitions, E-Summit keynote sessions, and angel investor interaction roundtables.",
  },
  {
    quarter: "Quarter 4 (Apr - Jun)",
    title: "IPR Filings & Incubation Onboarding",
    desc: "World Intellectual Property Day celebrations, provisional patent drafting assistance, startup incubation agreements, and annual IIC performance auditing.",
  },
];

export default function InstituteInnovationCouncilPage() {
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
            <span>MHRD Innovation Cell</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight">
                Institute Innovation Council (IIC)
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
                Driving systematic annual innovation calendars, hackathons, patent filing workshops, and technology incubation drives established under MoE's Innovation Cell.
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
                  href="/iic/national-startup-policy"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors backdrop-blur-md"
                >
                  <Award size={16} />
                  <span>NISP Policy</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-md text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                    <Lightbulb size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">MoE Innovation</p>
                    <p className="text-xl font-bold font-serif">4-Star Rated</p>
                  </div>
                </div>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  Consistently meeting quarterly milestones for Smart India Hackathon participation and student ideation challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Annual Activity Calendar */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
              Yearly Schedule
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              Prescribed Activity Framework (Quarter 1 to Quarter 4)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {IIC_CALENDAR_ACTIVITIES.map((act, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2E5C9E] font-bold text-xs">
                      {act.quarter}
                    </span>
                    <Calendar size={18} className="text-[#2E5C9E]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">{act.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{act.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic Downloads Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
              Reports & Evidence
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              IIC Annual Reports & Meeting Minutes
            </h2>
          </div>

          <DownloadsTable category="iic" title="IIC Activity Reports & Documentation" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
