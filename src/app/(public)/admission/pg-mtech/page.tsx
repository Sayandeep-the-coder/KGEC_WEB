import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Calendar,
  ArrowRight,
  Sparkles,
  Clock,
} from "lucide-react";
import { db } from "@/lib/db";
import { admissions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const metadata = {
  title: "Postgraduate M.Tech Admissions | Kalyani Government Engineering College",
  description:
    "Admission procedure, GATE & PGET eligibility, specializations, seat matrix, and counseling process for M.Tech programs at KGEC.",
};

const ADMISSION_ROUTES = [
  {
    title: "GATE Qualified Route (Direct / High Preference)",
    exam: "Graduate Aptitude Test in Engineering (GATE)",
    desc: "Candidates with a valid GATE score in relevant engineering disciplines are offered direct counseling preference and AICTE postgraduate scholarships as per norms.",
  },
  {
    title: "MAKAUT PGET Route (Post Graduate Entrance Test)",
    exam: "Post Graduate Entrance Test (PGET)",
    desc: "B.Tech/B.E. graduates without GATE scores can appear for the centralized PGET examination conducted by MAKAUT, followed by centralized online counseling.",
  },
];

async function getPgMtechData() {
  try {
    const [row] = await db
      .select()
      .from(admissions)
      .where(eq(admissions.program, "pg_mtech"));
    return row;
  } catch (err) {
    console.error("Error fetching M.Tech admissions:", err);
    return null;
  }
}

export default async function PgMtechAdmissionPage() {
  const data = await getPgMtechData();
  const seatMatrix = (data?.seatMatrix as Array<{ department?: string; code?: string; duration?: string; seats?: number; eligibility?: string }>) || [];
  const importantDates = (data?.importantDates as Array<{ event: string; date: string }>) || [];

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>Postgraduate Engineering Admissions</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif">
                Master of Technology (M.Tech)
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
                Advanced specialized degree programs fostering research, domain expertise, and high-impact industrial innovation across cutting-edge engineering disciplines.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <a
                  href="https://makautwb.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E5C9E] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>MAKAUT PGET Portal</span>
                  <ArrowRight size={16} />
                </a>
                <Link
                  href="/admission"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors backdrop-blur-md"
                >
                  <span>All Admission Routes</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-md text-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span>Program Duration</span>
                  <span className="font-bold text-white">2 Years (4 Semesters)</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span>Admissions Mode</span>
                  <span className="font-bold text-white">GATE / MAKAUT PGET</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span>Total PG Intake</span>
                  <span className="font-bold text-amber-400">~90 Seats</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Degree Awarding Body</span>
                  <span className="font-bold text-white">MAKAUT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Specializations & Seats */}
        <section>
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2E5C9E] block mb-1">
              SPECIALIZATIONS OFFERED
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1B2A4A]">
              M.Tech Programs & Intake
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
              Curricula tailored for high-end industrial R&D, doctoral research, and core technological leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seatMatrix.map((spec) => (
              <div
                key={spec.code || spec.department}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:border-[#2E5C9E] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-[#2E5C9E] font-black text-xs">
                      {spec.code}
                    </span>
                    <span className="text-xs font-bold text-slate-500">{spec.duration || "2 Years"}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#1A1A1A] mb-2">{spec.department}</h3>
                  <div className="text-2xl font-black text-[#1B2A4A] mb-2">
                    {spec.seats} <span className="text-xs font-normal text-slate-500">Approved Seats</span>
                  </div>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{spec.eligibility}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Important Dates */}
        {importantDates.length > 0 && (
          <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Calendar size={24} className="text-[#2E5C9E]" />
              <div>
                <h3 className="text-xl font-bold font-serif text-[#1B2A4A]">
                  Key Dates & Timeline
                </h3>
                <p className="text-xs text-[#6B7280]">
                  Scheduled admission dates for the upcoming academic session.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {importantDates.map((d, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs font-bold text-slate-800">{d.event}</p>
                  <p className="text-xs text-[#2E5C9E] font-semibold mt-1 flex items-center gap-1.5">
                    <Clock size={12} />
                    <span>{d.date}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Admission Routes */}
        <section className="space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#2E5C9E] block mb-1">
              SELECTION PROCESS
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1B2A4A]">
              M.Tech Admission Guidelines
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ADMISSION_ROUTES.map((route) => (
              <div
                key={route.title}
                className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm"
              >
                <div className="inline-block text-xs font-bold text-[#2E5C9E] bg-blue-50 px-3 py-1 rounded-md uppercase tracking-wider mb-3">
                  {route.exam}
                </div>
                <h3 className="text-xl font-bold font-serif text-[#1B2A4A] mb-2">{route.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed mb-4">{route.desc}</p>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                  <strong>Eligibility:</strong> Minimum 60% marks (55% for SC/ST) or equivalent CGPA in B.Tech/B.E. in relevant engineering branches from an AICTE-approved institution.
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
