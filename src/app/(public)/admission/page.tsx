import Link from "next/link";
import {
  GraduationCap,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { db } from "@/lib/db";
import { admissions } from "@/lib/db/schema";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentCard from "@/components/ui/ContentCard";

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
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Admissions Portal"
        title="Admissions at KGEC"
        subtitle="Join one of West Bengal's premier government engineering institutions. Admissions to all programs are strictly merit-based through state and national entrance examinations."
      >
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <Link
            href="/training-and-placement/statistics"
            className="inline-flex items-center gap-2 bg-white text-[#022448] rounded-full px-6 py-3 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors shadow-lg"
          >
            <span>Placement Statistics</span> <ArrowRight size={16} />
          </Link>
        </div>
      </PageHero>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
        
        {/* Programs Grid */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="ACADEMIC DEGREES"
                title="Programs Offered & Admission Pathways"
                align="left"
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                {PROGRAMS.map((prog, idx) => (
                  <Link key={prog.title} href={prog.slug} className="block h-full">
                    <ContentCard variant="white" delay={idx * 0.1} className="h-full flex flex-col justify-between group hover:border-[#225eaa]">
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <span className="px-3 py-1 rounded-full bg-blue-50 text-[#225eaa] border border-blue-100 font-bold text-xs uppercase tracking-wider">
                            {prog.badge}
                          </span>
                          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                            {prog.intake}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold font-serif text-[#022448] mb-1 group-hover:text-[#225eaa] transition-colors">{prog.title}</h3>
                        <p className="text-xs font-bold text-[#225eaa] mb-4">{prog.tagline}</p>
                        <p className="text-sm text-[#43474e] leading-relaxed mb-6 font-medium">{prog.desc}</p>

                        <div className="space-y-3 mb-6">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Specializations:</p>
                          <div className="flex flex-wrap gap-2">
                            {prog.highlights.map((h, i) => (
                              <span key={i} className="text-[10px] font-bold bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md text-slate-700">
                                {h}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#225eaa] group-hover:text-[#022448] mt-auto transition-colors">
                        <span className="uppercase tracking-wider text-[10px]">Detailed Seat Matrix & Process</span>
                        <ArrowRight size={16} />
                      </div>
                    </ContentCard>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Important Dates Schedule from Database */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 bg-slate-50 border-y border-slate-200">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#225eaa] flex items-center justify-center shrink-0">
                <Calendar size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-serif text-[#022448]">
                  Admission Calendars & Schedules
                </h2>
                <p className="text-sm text-slate-500 font-medium mt-1">
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
                  <ContentCard key={adm.id} variant="white" hover={false} className="flex flex-col justify-between shadow-sm">
                    <div>
                      <h3 className="text-sm font-bold text-[#022448] mb-4 pb-3 border-b border-slate-100 uppercase tracking-wider">
                        {titleMap[adm.program] || adm.program}
                      </h3>
                      <div className="space-y-4 mt-2">
                        {dates.map((d, idx) => (
                          <div key={idx} className="text-xs">
                            <p className="font-bold text-slate-800 leading-snug">{d.event}</p>
                            <p className="text-[#225eaa] font-bold flex items-center gap-1.5 mt-1">
                              <Clock size={14} />
                              <span>{d.date}</span>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ContentCard>
                );
              })}
            </div>
          </div>
        </div>

        {/* General Counseling Guidelines */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-16">
          <div className="max-w-[1200px] mx-auto relative overflow-hidden bg-[#022448] rounded-3xl p-8 md:p-14 shadow-xl border border-[#1e3a5f]">
            {/* Background Accent */}
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4 text-white">
                Physical Document Verification
              </h2>
              <p className="text-sm text-blue-100 leading-relaxed mb-8 max-w-3xl font-medium">
                Upon successful seat allotment in any counseling round, candidates must physically report to the Kalyani Government Engineering College administrative office for document verification and fee payment.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm text-slate-100 font-medium">
                <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors">
                  <CheckCircle2 size={20} className="text-[#76A9FA] shrink-0 mt-0.5" />
                  <span>Original Rank Card, Allotment Letter & Class 10/12 Mark Sheets.</span>
                </div>
                <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors">
                  <CheckCircle2 size={20} className="text-[#76A9FA] shrink-0 mt-0.5" />
                  <span>West Bengal Domicile Certificate as per WBJEEB proforma.</span>
                </div>
                <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors">
                  <CheckCircle2 size={20} className="text-[#76A9FA] shrink-0 mt-0.5" />
                  <span>Category Certificates (SC/ST/OBC/EWS/PwD) if applicable.</span>
                </div>
                <div className="flex items-start gap-3 bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors">
                  <CheckCircle2 size={20} className="text-[#76A9FA] shrink-0 mt-0.5" />
                  <span>Anti-Ragging Affidavits signed by student and parent/guardian.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </UnifiedPageLayout>
  );
}
