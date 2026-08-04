

import Link from "next/link";
import {
  Code,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Laptop,
  Clock,
} from "lucide-react";
import { db } from "@/lib/db";
import { admissions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Master of Computer Applications (MCA) Admissions | Kalyani Government Engineering College",
  description:
    "Admission procedure, WBJECA exam guidelines, eligibility, computing facilities, and counseling process for the MCA program at KGEC.",
};

const HIGHLIGHTS = [
  { label: "Degree Awarded", value: "Master of Computer Applications" },
  { label: "Program Duration", value: "2 Years (4 Semesters)" },
  { label: "Admission Route", value: "WBJECA (WBJEEB)" },
  { label: "Approved Intake", value: "40 Seats" },
  { label: "Recent Placement Rate", value: "76.0%" },
  { label: "Highest Package", value: "INR 11.0 LPA" },
  { label: "Approved Body", value: "AICTE & MAKAUT" },
];

const ELIGIBILITY_POINTS = [
  "Passed BCA / Bachelor Degree in Computer Science Engineering or equivalent degree.",
  "OR Passed B.Sc. / B.Com. / B.A. with Mathematics at 10+2 Level or at Graduation Level (with additional bridge courses as per the norms of the concerned University).",
  "Obtained at least 50% marks (45% marks in case of candidates belonging to reserved category) in the qualifying Examination.",
  "Must possess a valid General Merit Rank (GMR) in WBJECA conducted by the West Bengal Joint Entrance Examinations Board."
];

async function getPgMcaData() {
  try {
    const [row] = await db
      .select()
      .from(admissions)
      .where(eq(admissions.program, "pg_mca"));
    return row;
  } catch (err) {
    console.error("Error fetching MCA admissions:", err);
    return null;
  }
}

export default async function PgMcaAdmissionPage() {
  const data = await getPgMcaData();
  const importantDates = (data?.importantDates as Array<{ event: string; date: string }>) || [];

  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Computer Applications Admissions"
        title="Master of Computer Applications (MCA)"
        subtitle="Empowering next-generation software engineers, systems analysts, and data architects with state-of-the-art programming labs and exceptional campus placements."
      />

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
        {/* Eligibility & Selection */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm">
          <div className="inline-block text-xs font-bold text-[#2E5C9E] bg-blue-50 px-3 py-1 rounded-md uppercase tracking-wider mb-3">
            WBJECA Selection Route
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1B2A4A] mb-4">
            Eligibility Criteria & Admission Procedure
          </h2>
          <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed mb-6">
            Admissions to the 2-year MCA program at KGEC are made through centralized web-based counseling conducted by the West Bengal Joint Entrance Examinations Board (WBJEEB) based on WBJECA rank.
          </p>

          <div className="space-y-3">
            {ELIGIBILITY_POINTS.map((pt, i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start gap-3 text-xs text-slate-800">
                <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{pt}</span>
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
                  WBJECA Key Dates & Schedule
                </h3>
                <p className="text-xs text-[#6B7280]">
                  Official dates for entrance examination and centralized seat counseling.
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

        {/* Curriculum Focus & Labs */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2E5C9E] flex items-center justify-center mb-4">
              <Code size={24} />
            </div>
            <h3 className="text-xl font-bold font-serif text-[#1B2A4A] mb-2">
              Advanced Software Focus
            </h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              The MCA curriculum emphasizes modern object-oriented programming, data structures, cloud architectures, artificial intelligence, enterprise web application design, and distributed database management.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2E5C9E] flex items-center justify-center mb-4">
              <Laptop size={24} />
            </div>
            <h3 className="text-xl font-bold font-serif text-[#1B2A4A] mb-2">
              Dedicated Computing Labs
            </h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Equipped with high-speed internet, dedicated software servers, modern development IDEs, and round-the-clock computational infrastructure to support coursework and industry projects.
            </p>
          </div>
        </section>
      </main>

      </UnifiedPageLayout>
  );
}
