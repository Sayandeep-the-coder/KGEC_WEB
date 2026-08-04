import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  FileText,
} from "lucide-react";
import { db } from "@/lib/db";
import { admissions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentCard from "@/components/ui/ContentCard";

export const metadata = {
  title: "Undergraduate B.Tech Admissions | Kalyani Government Engineering College",
  description:
    "Admission procedure, WBJEE & JELET lateral entry eligibility, seat matrix, and counseling process for B.Tech programs at KGEC.",
};

const ADMISSION_ROUTES = [
  {
    title: "WBJEE Centralized Route (1st Year Entry)",
    exam: "West Bengal Joint Entrance Examination (WBJEE)",
    desc: "Admission to 1st year B.Tech is strictly conducted through centralized online counseling based on General Merit Rank (GMR) in WBJEE.",
    steps: [
      "Appear for the WBJEE examination conducted by WBJEEB.",
      "Register for e-counseling on the official WBJEEB portal upon rank publication.",
      "Fill choices and lock Kalyani Government Engineering College as preferred choice.",
      "Report to KGEC campus for physical document verification and fee payment upon seat allotment."
    ]
  },
  {
    title: "JELET Lateral Entry Route (2nd Year Direct Entry)",
    exam: "Joint Entrance Examination for Lateral Entry (JELET)",
    desc: "Diploma holders in Engineering/Technology and B.Sc. degree holders can secure direct admission to the 2nd year (3rd semester) of the B.Tech program.",
    steps: [
      "Qualify in JELET conducted by WBJEEB with a valid merit rank.",
      "Participate in JELET centralized counseling and choose preferred KGEC branch.",
      "Present Diploma/B.Sc. mark sheets and rank card during reporting at KGEC."
    ]
  }
];

const REQUIRED_DOCUMENTS = [
  "WBJEE / JELET Rank Card and Final Allotment Letter",
  "Class 10 Admit Card or Birth Certificate (Proof of Age)",
  "Class 10 & 10+2 (or Diploma) Mark Sheets and Certificates",
  "Domicile Certificate (as per WBJEEB guidelines)",
  "Category Certificate (SC/ST/OBC-A/OBC-B/EWS/PwD) if applicable",
  "Medical Fitness Certificate & Blood Group Report",
  "Anti-Ragging Affidavits signed by student and parent",
  "Recent passport-size colored photographs (6 copies)"
];

async function getUgAdmissionsData() {
  try {
    const [row] = await db
      .select()
      .from(admissions)
      .where(eq(admissions.program, "ug_btech"));
    return row;
  } catch (err) {
    console.error("Error fetching UG admissions:", err);
    return null;
  }
}

export default async function UgBtechAdmissionPage() {
  const data = await getUgAdmissionsData();
  const seatMatrix = (data?.seatMatrix as Array<{ department?: string; code?: string; duration?: string; seats?: number; eligibility?: string }>) || [];
  
  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Undergraduate Admissions"
        title="Bachelor of Technology (B.Tech)"
        subtitle="Join one of Eastern India's highest-ranked engineering colleges through WBJEE and JELET centralized counseling."
      />

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
        
        {/* Department Seat Matrix */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              badge="APPROVED INTAKE"
              title="B.Tech Departments & Seat Matrix"
              subtitle="KGEC offers undergraduate engineering education across 5 core & high-tech branches."
              align="left"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {seatMatrix.map((dept, idx) => (
                <ContentCard key={dept.code || dept.department} variant="white" delay={idx * 0.1} className="flex flex-col justify-between h-full group hover:border-[#225eaa]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-4 py-1.5 rounded-full bg-blue-50 text-[#225eaa] font-black text-xs border border-blue-100">
                        {dept.code}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{dept.duration}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#022448] mb-3 group-hover:text-[#225eaa] transition-colors">{dept.department}</h3>
                    <div className="text-3xl font-black text-[#022448] mb-3 flex items-baseline gap-1">
                      {dept.seats} <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Seats</span>
                    </div>
                    <p className="text-sm text-[#43474e] leading-relaxed font-medium">{dept.eligibility}</p>
                  </div>

                  <Link
                    href={`/departments/${(dept.code || "cse").toLowerCase()}`}
                    className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#225eaa] hover:text-[#022448] transition-colors"
                  >
                    <span className="uppercase tracking-wider text-[10px]">Department Overview</span>
                    <ArrowRight size={16} />
                  </Link>
                </ContentCard>
              ))}
            </div>
          </div>
        </div>

        {/* Admission Routes */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 bg-slate-50 border-y border-slate-200">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              badge="SELECTION PROCESS"
              title="Admission Routes & Counseling Procedure"
              align="left"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              {ADMISSION_ROUTES.map((route, idx) => (
                <ContentCard key={route.title} variant="white" hover={false} delay={idx * 0.1}>
                  <div>
                    <div className="inline-block text-[10px] font-bold text-[#225eaa] bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full uppercase tracking-wider mb-4">
                      {route.exam}
                    </div>
                    <h3 className="text-2xl font-bold font-serif text-[#022448] mb-3">{route.title}</h3>
                    <p className="text-sm text-[#43474e] leading-relaxed font-medium mb-8">{route.desc}</p>

                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#022448] mb-4 pb-2 border-b border-slate-100">
                      Counseling & Admission Steps
                    </h4>
                    <ul className="space-y-4">
                      {route.steps.map((st, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-[#43474e] font-medium">
                          <CheckCircle2 size={20} className="text-[#225eaa] shrink-0" />
                          <span>{st}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ContentCard>
              ))}
            </div>
          </div>
        </div>

        {/* Required Documents for Physical Reporting */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-16">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#225eaa] flex items-center justify-center shrink-0">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-serif text-[#022448]">
                    Required Verification Documents
                  </h3>
                  <p className="text-sm text-slate-500 font-medium mt-1">
                    Original documents along with 2 sets of self-attested photocopies required during physical reporting.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {REQUIRED_DOCUMENTS.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-4 text-sm font-medium text-[#022448] hover:bg-white transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#022448] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-md">
                      {idx + 1}
                    </div>
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>

    </UnifiedPageLayout>
  );
}
