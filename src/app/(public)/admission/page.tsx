import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { db } from "@/lib/db";
import { admissions } from "@/lib/db/schema";


export const metadata = {
  title: "Admissions Portal | Kalyani Government Engineering College",
  description:
    "Explore undergraduate and postgraduate engineering admissions, WBJEE, GATE, and JECA seat matrix, eligibility criteria, and counseling procedures at KGEC.",
};

const PROGRAMS = [
  {
    title: "Undergraduate B.Tech",
    slug: "/admission/ug-btech",
    badge: "WBJEE & JELET",
    tagline: "4-Year Bachelor of Technology (5 Specialized Branches)",
    exam: "WBJEE / JELET (WBJEEB)",
    intake: "~282 Seats",
    desc: "Admissions to 1st year B.Tech are conducted strictly through WBJEE centralized counseling. Lateral entry to 2nd year (3rd semester) is offered to Diploma & B.Sc graduates via JELET.",
    highlights: ["CSE (68 seats)", "IT (52 seats)", "ECE (55 seats)", "EE (55 seats)", "ME (52 seats)"],
  },
  {
    title: "Postgraduate M.Tech",
    slug: "/admission/pg-mtech",
    badge: "GATE & PGET",
    tagline: "2-Year Master of Technology (5 Specialized Disciplines)",
    exam: "GATE / MAKAUT PGET",
    intake: "~90 Seats",
    desc: "Advanced research-oriented postgraduate engineering degrees affiliated to MAKAUT with AICTE scholarships for GATE-qualified candidates.",
    highlights: ["Advanced CSE", "VLSI & Embedded (ECE)", "Power Systems (EE)", "Production Engg (ME)", "Information Technology"],
  },
  {
    title: "Postgraduate MCA",
    slug: "/admission/pg-mca",
    badge: "WBJECA",
    tagline: "2-Year Master of Computer Applications",
    exam: "WBJECA (WBJEEB)",
    intake: "~40 Seats",
    desc: "Premier postgraduate computer application curriculum focusing on modern software engineering, cloud computing, and AI architectures with stellar placement records.",
    highlights: ["Advanced Software Engineering", "Cloud Computing Labs", "76% Placement Rate", "INR 11 LPA Highest Offer"],
  },
];

async function getAllAdmissionsData() {
  try {
    const rows = await db.select().from(admissions);
    return rows;
  } catch (err) {
    console.error("Error fetching admissions from DB:", err);
    return [];
  }
}

export default async function AdmissionHubPage() {
  const admissionsList = await getAllAdmissionsData();

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>Admissions Portal</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight">
                Admissions at KGEC
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
                Join one of West Bengal&apos;s premier government engineering institutions. Admissions to all programs are strictly merit-based through state and national entrance examinations.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <a
                  href="https://wbjeeb.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E5C9E] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>WBJEEB Counseling Portal</span>
                  <ArrowRight size={16} />
                </a>
                <Link
                  href="/training-and-placement/statistics"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors backdrop-blur-md"
                >
                  <GraduationCap size={16} />
                  <span>Placement Statistics</span>
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
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Government Institution</p>
                    <p className="text-xl font-bold font-serif">100% Merit Admissions</p>
                  </div>
                </div>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  Affiliated to MAKAUT and approved by AICTE. Highly subsidized government tuition fees with merit scholarships.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Programs Grid */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2E5C9E] block">
              ACADEMIC DEGREES
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              Programs Offered & Admission Pathways
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PROGRAMS.map((prog) => (
              <div
                key={prog.title}
                className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between hover:border-[#2E5C9E] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-[#2E5C9E] font-bold text-xs">
                      {prog.badge}
                    </span>
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                      {prog.intake}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-serif text-[#1B2A4A] mb-1">{prog.title}</h3>
                  <p className="text-xs font-semibold text-[#2E5C9E] mb-3">{prog.tagline}</p>
                  <p className="text-xs text-[#6B7280] leading-relaxed mb-6">{prog.desc}</p>

                  <div className="space-y-2 mb-6">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-700">Specializations:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {prog.highlights.map((h, i) => (
                        <span key={i} className="text-[11px] bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md text-slate-700">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Link
                  href={prog.slug}
                  className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2E5C9E] hover:underline"
                >
                  <span>Detailed Seat Matrix & Process</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Live Important Dates Schedule from Database */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-8">
          <div className="flex items-center gap-3">
            <Calendar size={24} className="text-[#2E5C9E]" />
            <div>
              <h2 className="text-2xl font-bold font-serif text-[#1B2A4A]">
                Admission Calendars & Schedules
              </h2>
              <p className="text-xs text-[#6B7280]">
                Important dates synchronized from official exam boards for the current academic session.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {admissionsList.map((adm) => {
              const dates = (adm.importantDates as Array<{ event: string; date: string }>) || [];
              const titleMap: Record<string, string> = {
                ug_btech: "UG B.Tech (WBJEE)",
                pg_mtech: "PG M.Tech (GATE / PGET)",
                pg_mca: "PG MCA (WBJECA)",
              };

              return (
                <div key={adm.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#1B2A4A] mb-3 pb-2 border-b border-slate-200">
                      {titleMap[adm.program] || adm.program}
                    </h3>
                    <div className="space-y-2.5">
                      {dates.map((d, idx) => (
                        <div key={idx} className="text-xs">
                          <p className="font-semibold text-slate-800">{d.event}</p>
                          <p className="text-[#2E5C9E] font-medium flex items-center gap-1 mt-0.5">
                            <Clock size={12} />
                            <span>{d.date}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* General Counseling Guidelines */}
        <section className="bg-[#1B2A4A] text-white rounded-3xl p-8 md:p-12 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold font-serif mb-4">
            Physical Document Verification at KGEC
          </h2>
          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed mb-6 max-w-3xl">
            Upon successful seat allotment in any counseling round, candidates must physically report to the Kalyani Government Engineering College administrative office for document verification and fee payment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-200">
            <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 p-4 rounded-xl">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <span>Original Rank Card, Allotment Letter & Class 10/12 Mark Sheets.</span>
            </div>
            <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 p-4 rounded-xl">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <span>West Bengal Domicile Certificate as per WBJEEB proforma.</span>
            </div>
            <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 p-4 rounded-xl">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <span>Category Certificates (SC/ST/OBC/EWS/PwD) if applicable.</span>
            </div>
            <div className="flex items-start gap-2.5 bg-white/5 border border-white/10 p-4 rounded-xl">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
              <span>Anti-Ragging Affidavits signed by student and parent/guardian.</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
