

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
        subtitle="Join one of Eastern India&apos;s highest-ranked engineering colleges through WBJEE and JELET centralized counseling."
      />

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
        {/* Department Seat Matrix */}
        <section>
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2E5C9E] block mb-1">
              APPROVED INTAKE
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1B2A4A]">
              B.Tech Departments & Seat Matrix
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
              KGEC offers undergraduate engineering education across 5 core & high-tech branches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seatMatrix.map((dept) => (
              <div
                key={dept.code || dept.department}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:border-[#2E5C9E] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-[#2E5C9E] font-black text-xs">
                      {dept.code}
                    </span>
                    <span className="text-xs font-bold text-slate-500">{dept.duration}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#1A1A1A] mb-2">{dept.department}</h3>
                  <div className="text-2xl font-black text-[#1B2A4A] mb-2">
                    {dept.seats} <span className="text-xs font-normal text-slate-500">Seats</span>
                  </div>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{dept.eligibility}</p>
                </div>

                <Link
                  href={`/departments/${(dept.code || "cse").toLowerCase()}`}
                  className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2E5C9E] hover:underline"
                >
                  <span>Department Overview</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Admission Routes */}
        <section className="space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#2E5C9E] block mb-1">
              SELECTION PROCESS
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1B2A4A]">
              Admission Routes & Counseling Procedure
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {ADMISSION_ROUTES.map((route) => (
              <div
                key={route.title}
                className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block text-xs font-bold text-[#2E5C9E] bg-blue-50 px-3 py-1 rounded-md uppercase tracking-wider mb-3">
                    {route.exam}
                  </div>
                  <h3 className="text-xl font-bold font-serif text-[#1B2A4A] mb-2">{route.title}</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed mb-6">{route.desc}</p>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                    Counseling & Admission Steps:
                  </h4>
                  <ul className="space-y-2.5">
                    {route.steps.map((st, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{st}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Required Documents for Physical Reporting */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <FileText size={24} className="text-[#2E5C9E]" />
            <div>
              <h3 className="text-xl font-bold font-serif text-[#1B2A4A]">
                Required Verification Documents
              </h3>
              <p className="text-xs text-[#6B7280]">
                Original documents along with 2 sets of self-attested photocopies required during physical reporting.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REQUIRED_DOCUMENTS.map((doc, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center gap-3 text-xs text-slate-800"
              >
                <div className="w-6 h-6 rounded-full bg-blue-100 text-[#1B2A4A] font-bold text-[11px] flex items-center justify-center shrink-0">
                  {idx + 1}
                </div>
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      </UnifiedPageLayout>
  );
}
