import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloadsTable from "@/components/DownloadsTable";
import Link from "next/link";
import {
  FileText,
  Sparkles,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  ArrowRight,
  CheckCircle2,
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
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>Statutory Compliance</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight">
                Right to Information (RTI) Act
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
                Upholding transparency, public accountability, and citizen access to institutional information under the Right to Information Act, 2005.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E5C9E] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Contact Directory</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors backdrop-blur-md"
                >
                  <Building2 size={16} />
                  <span>About College</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 backdrop-blur-md text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Statutory Rights</p>
                    <p className="text-xl font-bold font-serif">RTI Act 2005</p>
                  </div>
                </div>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  Proactive disclosures under Section 4(1)(b) guaranteeing institutional transparency and timely grievance redressal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* SPIO & FAA Officers Cards */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
              Designated Authorities
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              RTI Officers & Appellate Authorities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STATUTORY_OFFICERS.map((officer, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-[#2E5C9E] border border-blue-100 font-bold text-xs">
                      {officer.role}
                    </span>
                    <UserCheck size={20} className="text-[#2E5C9E]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1B2A4A] mb-1">{officer.name}</h3>
                  <p className="text-xs text-slate-500 mb-4">{officer.dept}</p>

                  <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-[#2E5C9E]" />
                      <a href={`mailto:${officer.email}`} className="hover:text-blue-600 font-medium">
                        {officer.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-[#2E5C9E]" />
                      <span>{officer.phone}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 pt-1 leading-relaxed">
                      {officer.address}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Application Procedure */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
              Filing Guidelines
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              How to File an RTI Application
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {RTI_PROCEDURE.map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center font-bold text-xs">
                  {idx + 1}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed pt-2">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mandatory Disclosures Downloads Table */}
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
              Statutory Records
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              Section 4(1)(b) Proactive Disclosures & Mandatory Files
            </h2>
          </div>

          <DownloadsTable category="mandatory_disclosure" title="RTI Disclosures & Statutory Records" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
