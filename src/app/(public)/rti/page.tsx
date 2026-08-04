import DownloadsTable from "@/components/DownloadsTable";
import Link from "next/link";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentCard from "@/components/ui/ContentCard";
import {
  FileText,
  Sparkles,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  ArrowRight,
  UserCheck
} from "lucide-react";

export const metadata = {
  title: "Right to Information (RTI) Act | Kalyani Government Engineering College",
  description:
    "Statutory disclosures under Section 4(1)(b) of the Right to Information Act, SPIO contacts, Appellate Authority details, and RTI application procedures at KGEC.",
};

const STATUTORY_OFFICERS = [
  {
    role: "State Public Information Officer (SPIO)",
    name: "Registrar / Designated SPIO",
    dept: "Administrative Section, KGEC",
    email: "registrar@kgec.edu.in",
    phone: "033-2582-1309",
    address: "Kalyani Government Engineering College, Kalyani, Nadia, West Bengal - 741235",
  },
  {
    role: "First Appellate Authority (FAA)",
    name: "Principal, KGEC",
    dept: "Office of the Principal",
    email: "principal@kgec.edu.in",
    phone: "033-2582-6680",
    address: "Administrative Building, KGEC, Kalyani, Nadia, West Bengal - 741235",
  },
];

const RTI_PROCEDURE = [
  "Submit written application in English, Bengali, or Hindi addressed to the State Public Information Officer (SPIO).",
  "Attach the statutory RTI application fee as prescribed by the Government of West Bengal.",
  "Specify precise information sought along with clear contact information and postal communication address.",
  "Information will be provided within the statutory 30-day period from the date of receipt of the application.",
];

export default function RTIPage() {
  return (
    <UnifiedPageLayout>

      {/* Hero Banner */}
      <PageHero
        badge="Statutory Compliance"
        title="Right to Information (RTI) Act"
        subtitle="Upholding transparency, public accountability, and citizen access to institutional information under the Right to Information Act, 2005."
      >
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#022448] rounded-full px-6 py-3 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors shadow-lg"
          >
            <span>Contact Directory</span>
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-3 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            <Building2 size={16} />
            <span>About College</span>
          </Link>
        </div>
      </PageHero>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
        
        {/* SPIO & FAA Officers Cards */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Designated Authorities"
                title="RTI Officers & Appellate Authorities"
                align="left"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {STATUTORY_OFFICERS.map((officer, idx) => (
                  <ContentCard key={idx} variant="white" delay={idx * 0.1}>
                    <div className="flex items-center justify-between mb-5">
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-[#225eaa] border border-blue-100 font-bold text-xs uppercase tracking-wider">
                        {officer.role}
                      </span>
                      <UserCheck size={20} className="text-[#225eaa]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#022448] mb-1">{officer.name}</h3>
                    <p className="text-xs font-semibold text-slate-500 mb-5">{officer.dept}</p>

                    <div className="space-y-3 text-sm text-[#43474e] font-medium border-t border-slate-100 pt-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                          <Mail size={14} className="text-[#225eaa]" />
                        </div>
                        <a href={`mailto:${officer.email}`} className="hover:text-[#225eaa] transition-colors">
                          {officer.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                          <Phone size={14} className="text-[#225eaa]" />
                        </div>
                        <span>{officer.phone}</span>
                      </div>
                      <div className="text-xs text-slate-500 pt-2 leading-relaxed ml-11">
                        {officer.address}
                      </div>
                    </div>
                  </ContentCard>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Application Procedure */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 bg-slate-50 border-y border-slate-200">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              badge="Filing Guidelines"
              title="How to File an RTI Application"
              align="left"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {RTI_PROCEDURE.map((step, idx) => (
                <ContentCard key={idx} variant="muted" hover={false} delay={idx * 0.1}>
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm text-[#022448] flex items-center justify-center font-black text-lg mb-4">
                    {idx + 1}
                  </div>
                  <p className="text-sm text-[#43474e] leading-relaxed font-medium">{step}</p>
                </ContentCard>
              ))}
            </div>
          </div>
        </div>

        {/* Mandatory Disclosures Downloads Table */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-16">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              badge="Statutory Records"
              title="Section 4(1)(b) Proactive Disclosures"
              align="left"
            />
            <div className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <DownloadsTable category="mandatory_disclosure" title="RTI Disclosures & Statutory Records" />
            </div>
          </div>
        </div>

      </main>
    </UnifiedPageLayout>
  );
}
