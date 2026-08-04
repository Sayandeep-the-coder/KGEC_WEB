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
import ContentCard from "@/components/ui/ContentCard";

export const metadata = {
  title: "Master of Computer Applications (MCA) Admissions | Kalyani Government Engineering College",
  description:
    "Admission procedure, WBJECA exam guidelines, eligibility, computing facilities, and counseling process for the MCA program at KGEC.",
};

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
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-14">
              <div className="inline-block text-[10px] font-bold text-[#225eaa] bg-blue-50 border border-blue-100 px-4 py-2 rounded-full uppercase tracking-widest mb-4">
                WBJECA Selection Route
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#022448] mb-5">
                Eligibility Criteria & Admission Procedure
              </h2>
              <p className="text-sm text-[#43474e] leading-relaxed mb-8 font-medium max-w-3xl">
                Admissions to the 2-year MCA program at KGEC are made through centralized web-based counseling conducted by the West Bengal Joint Entrance Examinations Board (WBJEEB) based on WBJECA rank.
              </p>

              <div className="space-y-4">
                {ELIGIBILITY_POINTS.map((pt, i) => (
                  <div key={i} className="p-5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-4 text-sm text-[#022448] font-medium hover:bg-white hover:shadow-sm transition-all">
                    <CheckCircle2 size={22} className="text-[#225eaa] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Important Dates */}
        {importantDates.length > 0 && (
          <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 bg-slate-50 border-y border-slate-200">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#225eaa] flex items-center justify-center shrink-0">
                  <Calendar size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-serif text-[#022448]">
                    WBJECA Key Dates & Schedule
                  </h3>
                  <p className="text-sm text-slate-500 font-medium mt-1">
                    Official dates for entrance examination and centralized seat counseling.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {importantDates.map((d, i) => (
                  <ContentCard key={i} variant="white" hover={false} delay={i * 0.1}>
                    <p className="text-sm font-bold text-slate-800">{d.event}</p>
                    <p className="text-sm text-[#225eaa] font-bold mt-2 flex items-center gap-1.5">
                      <Clock size={16} />
                      <span>{d.date}</span>
                    </p>
                  </ContentCard>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Curriculum Focus & Labs */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-16">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              badge="ACADEMIC INFRASTRUCTURE"
              title="Curriculum Focus & Labs"
              align="left"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <ContentCard variant="white" delay={0.1} className="h-full">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#225eaa] flex items-center justify-center mb-5">
                  <Code size={28} />
                </div>
                <h3 className="text-2xl font-bold font-serif text-[#022448] mb-3">
                  Advanced Software Focus
                </h3>
                <p className="text-sm text-[#43474e] leading-relaxed font-medium">
                  The MCA curriculum emphasizes modern object-oriented programming, data structures, cloud architectures, artificial intelligence, enterprise web application design, and distributed database management.
                </p>
              </ContentCard>

              <ContentCard variant="white" delay={0.2} className="h-full">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#225eaa] flex items-center justify-center mb-5">
                  <Laptop size={28} />
                </div>
                <h3 className="text-2xl font-bold font-serif text-[#022448] mb-3">
                  Dedicated Computing Labs
                </h3>
                <p className="text-sm text-[#43474e] leading-relaxed font-medium">
                  Equipped with high-speed internet, dedicated software servers, modern development IDEs, and round-the-clock computational infrastructure to support coursework and industry projects.
                </p>
              </ContentCard>
            </div>
          </div>
        </div>

      </main>

    </UnifiedPageLayout>
  );
}
