import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { GraduationCap, Calendar, CheckCircle2 } from "lucide-react";
import { db } from "@/lib/db";
import { admissions, admissionProgramEnum } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

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
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans w-full">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="bg-[#1B2A4A] text-white rounded-3xl p-8 md:p-12 mb-12 shadow-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-300 block mb-2">
            ADMISSIONS & SEAT MATRIX
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight">
            {config.title}
          </h1>
          <p className="text-slate-300 text-sm md:text-base mt-3 max-w-2xl">
            {config.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Seat Matrix */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="text-[#1B2A4A]" size={20} />
              <h2 className="text-xl font-bold text-slate-900">Seat Matrix Breakdown</h2>
            </div>

            {admissionsData?.seatMatrix ? (
              <div className="divide-y divide-slate-100">
                {Array.isArray(admissionsData.seatMatrix) ? (
                  admissionsData.seatMatrix.map((item: any, idx: number) => (
                    <div key={idx} className="py-3 flex justify-between text-sm">
                      <span className="font-semibold text-slate-800 uppercase">{item.department || item.name || item.code}</span>
                      <span className="font-bold text-[#2E5C9E]">{item.seats} Seats</span>
                    </div>
                  ))
                ) : (
                  Object.entries(admissionsData.seatMatrix).map(([dept, seats]) => (
                    <div key={dept} className="py-3 flex justify-between text-sm">
                      <span className="font-semibold text-slate-800 uppercase">{dept}</span>
                      <span className="font-bold text-[#2E5C9E]">{seats as number} Seats</span>
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
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-[#1B2A4A]" size={20} />
              <h2 className="text-xl font-bold text-slate-900">Important Schedule & Dates</h2>
            </div>

            {admissionsData?.importantDates && admissionsData.importantDates.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {admissionsData.importantDates.map((item, idx) => (
                  <div key={idx} className="py-3 flex justify-between text-sm">
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
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-sm text-slate-700 leading-relaxed space-y-4">
          <h2 className="text-2xl font-bold font-serif text-slate-900">Eligibility & Admission Process</h2>
          <p>
            Candidates seeking admission to Kalyani Government Engineering College must qualify through the central counseling process conducted by WBJEEB (for B.Tech / JECA) or MAKAUT PGET / GATE (for M.Tech).
          </p>
          <ul className="space-y-2 pt-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>Must satisfy domicile requirements set by the Government of West Bengal.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <span>Original documents required during physical verification at campus.</span>
            </li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
