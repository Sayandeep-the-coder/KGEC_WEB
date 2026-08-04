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
import ContentCard from "@/components/ui/ContentCard";

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
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <Link
            href="/admission"
            className="inline-flex items-center gap-2 bg-white text-[#022448] rounded-full px-6 py-3 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors shadow-lg"
          >
            <span>All Admission Routes</span> <ArrowRight size={16} />
          </Link>
        </div>
      </PageHero>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
        
        {/* Specializations & Seats */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              badge="SPECIALIZATIONS OFFERED"
              title="M.Tech Programs & Intake"
              subtitle="Curricula tailored for high-end industrial R&D, doctoral research, and core technological leadership."
              align="left"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {seatMatrix.map((spec, idx) => (
                <ContentCard key={spec.code || spec.department} variant="white" delay={idx * 0.1} className="flex flex-col justify-between h-full group hover:border-[#225eaa]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-4 py-1.5 rounded-full bg-blue-50 text-[#225eaa] font-black text-xs border border-blue-100">
                        {spec.code}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{spec.duration || "2 Years"}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#022448] mb-3 group-hover:text-[#225eaa] transition-colors">{spec.department}</h3>
                    <div className="text-3xl font-black text-[#022448] mb-3 flex items-baseline gap-1">
                      {spec.seats} <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Approved Seats</span>
                    </div>
                    <p className="text-sm text-[#43474e] leading-relaxed font-medium">{spec.eligibility}</p>
                  </div>
                </ContentCard>
              ))}
            </div>
          </div>
        </div>

        {/* Important Dates */}
        {importantDates.length > 0 && (
          <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-16 bg-slate-50 border-y border-slate-200">
            <div className="max-w-[1200px] mx-auto">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#225eaa] flex items-center justify-center shrink-0">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-serif text-[#022448]">
                      Key Dates & Timeline
                    </h3>
                    <p className="text-sm text-slate-500 font-medium mt-1">
                      Scheduled admission dates for the upcoming academic session.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {importantDates.map((d, i) => (
                    <div key={i} className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-white hover:shadow-sm transition-all">
                      <p className="text-sm font-bold text-slate-800">{d.event}</p>
                      <p className="text-sm text-[#225eaa] font-bold mt-2 flex items-center gap-1.5">
                        <Clock size={16} />
                        <span>{d.date}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admission Routes */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-16">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              badge="SELECTION PROCESS"
              title="M.Tech Admission Guidelines"
              align="left"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              {ADMISSION_ROUTES.map((route, idx) => (
                <ContentCard key={route.title} variant="white" delay={idx * 0.1}>
                  <div className="inline-block text-[10px] font-bold text-[#225eaa] bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full uppercase tracking-wider mb-4">
                    {route.exam}
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-[#022448] mb-3">{route.title}</h3>
                  <p className="text-sm text-[#43474e] leading-relaxed font-medium mb-6">{route.desc}</p>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-700">
                    <span className="text-[#225eaa] font-bold uppercase tracking-wider text-[11px] block mb-1">Eligibility Requirement</span>
                    Minimum 60% marks (55% for SC/ST) or equivalent CGPA in B.Tech/B.E. in relevant engineering branches from an AICTE-approved institution.
                  </div>
                </ContentCard>
              ))}
            </div>
          </div>
        </div>

      </main>

    </UnifiedPageLayout>
  );
}
