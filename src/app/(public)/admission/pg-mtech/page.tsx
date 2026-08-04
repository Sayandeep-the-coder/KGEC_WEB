

import Link from "next/link";
import {
  Calendar,
  ArrowRight,
  Clock,
} from "lucide-react";
import { db } from "@/lib/db";
import { admissions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";

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
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Postgraduate Engineering Admissions"
        title="Master of Technology (M.Tech)"
        subtitle="Advanced specialized degree programs fostering research, domain expertise, and high-impact industrial innovation across cutting-edge engineering disciplines."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/admission"
            className="inline-flex items-center gap-2 border border-white/30 rounded-full px-6 py-3 text-white font-medium hover:bg-white/10 transition-colors"
          >
            All Admission Routes <ArrowRight size={16} />
          </Link>
        </div>
      </PageHero>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
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

      </UnifiedPageLayout>
  );
}
