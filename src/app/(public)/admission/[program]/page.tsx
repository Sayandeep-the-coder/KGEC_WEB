import { notFound } from "next/navigation";
import { GraduationCap, Calendar, CheckCircle2 } from "lucide-react";
import { db } from "@/lib/db";
import { admissions, admissionProgramEnum } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentCard from "@/components/ui/ContentCard";

interface PageProps {
  params: Promise<{ program: string }>;
}

const PROGRAM_MAP: Record<string, { apiKey: "ug_btech" | "pg_mtech" | "pg_mca"; title: string; desc: string }> = {
  "ug-btech": {
    apiKey: "ug_btech",
    title: "B.Tech Admissions (Undergraduate)",
    desc: "4-Year Bachelor of Technology program admitted via WBJEE & JEE Main examinations.",
  },
  "pg-mtech": {
    apiKey: "pg_mtech",
    title: "M.Tech Admissions (Postgraduate)",
    desc: "2-Year Master of Technology program admitted via GATE & PGET examinations.",
  },
  "pg-mca": {
    apiKey: "pg_mca",
    title: "MCA Admissions (Postgraduate)",
    desc: "2-Year Master of Computer Applications program admitted via JECA examination.",
  },
};

interface AdmissionsData {
  program: string;
  seatMatrix: Record<string, number> | Array<{ department?: string; name?: string; seats?: number; code?: string }> | null;
  importantDates: Array<{ event: string; date: string }> | null;
}

async function getAdmissionsData(programKey: "ug_btech" | "pg_mtech" | "pg_mca"): Promise<AdmissionsData | null> {
  try {
    const [row] = await db
      .select()
      .from(admissions)
      .where(eq(admissions.program, programKey));

    if (!row) return null;

    return {
      program: row.program,
      seatMatrix: row.seatMatrix as any,
      importantDates: row.importantDates as any,
    };
  } catch (err) {
    console.error("Error fetching admissions data from db:", err);
    return null;
  }
}

export default async function AdmissionProgramPage({ params }: PageProps) {
  const { program } = await params;
  const config = PROGRAM_MAP[program];

  if (!config) {
    notFound();
  }

  const admissionsData = await getAdmissionsData(config.apiKey);

  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Admissions & Seat Matrix"
        title={config.title}
        subtitle={config.desc}
      />

      <main className="flex-1 w-full flex flex-col items-center">
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Seat Matrix */}
            <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10">
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="text-[#225eaa]" size={28} />
                <h2 className="text-2xl font-bold font-serif text-[#022448]">Seat Matrix Breakdown</h2>
              </div>

              {admissionsData?.seatMatrix ? (
                <div className="divide-y divide-slate-100">
                  {Array.isArray(admissionsData.seatMatrix) ? (
                    admissionsData.seatMatrix.map((item: any, idx: number) => (
                      <div key={idx} className="py-4 flex justify-between text-sm">
                        <span className="font-semibold text-slate-800 uppercase">{item.department || item.name || item.code}</span>
                        <span className="font-bold text-[#225eaa]">{item.seats} Seats</span>
                      </div>
                    ))
                  ) : (
                    Object.entries(admissionsData.seatMatrix).map(([dept, seats]) => (
                      <div key={dept} className="py-4 flex justify-between text-sm">
                        <span className="font-semibold text-slate-800 uppercase">{dept}</span>
                        <span className="font-bold text-[#225eaa]">{seats as number} Seats</span>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="py-8 text-center text-slate-500 text-xs">
                  Seat matrix data currently being updated for this academic cycle.
                </div>
              )}
            </div>

            {/* Important Dates */}
            <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="text-[#225eaa]" size={28} />
                <h2 className="text-2xl font-bold font-serif text-[#022448]">Important Schedule & Dates</h2>
              </div>

              {admissionsData?.importantDates && admissionsData.importantDates.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {admissionsData.importantDates.map((item, idx) => (
                    <div key={idx} className="py-4 flex justify-between text-sm">
                      <span className="text-slate-700 font-medium">{item.event}</span>
                      <span className="font-semibold text-slate-900">{item.date}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-slate-500 text-xs">
                  Important dates for counseling will be announced shortly.
                </div>
              )}
            </div>
          </div>

          {/* Eligibility Text */}
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14 mb-12">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Requirements"
                title="Eligibility & Admission Process"
                align="left"
              />
              <p className="text-[#43474e] text-base leading-relaxed mt-4">
                Candidates seeking admission to Kalyani Government Engineering College must qualify through the central counseling process conducted by WBJEEB (for B.Tech / JECA) or MAKAUT PGET / GATE (for M.Tech).
              </p>
              <ul className="space-y-4 pt-6">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#225eaa] shrink-0 mt-0.5" />
                  <span className="text-[#43474e]">Must satisfy domicile requirements set by the Government of West Bengal.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#225eaa] shrink-0 mt-0.5" />
                  <span className="text-[#43474e]">Original documents required during physical verification at campus.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

    </UnifiedPageLayout>
  );
}
