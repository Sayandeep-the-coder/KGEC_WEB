import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StaffProfileCard, { StaffProfile } from "@/components/StaffProfileCard";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Building2,
  Users,
  Home,
  Briefcase,
  Layers,
  ArrowRight,
  Mail,
} from "lucide-react";
import { db } from "@/lib/db";
import { staff } from "@/lib/db/schema";
import { asc } from "drizzle-orm";

export const metadata = {
  title: "Institute Administration & Leadership | Kalyani Government Engineering College",
  description:
    "Explore the governance, executive leadership, academic heads, and administrative officials of Kalyani Government Engineering College.",
};

const WINGS = [
  {
    title: "Office of the Principal",
    role: "principal",
    slug: "/administration/principal",
    icon: Building2,
    badge: "Executive Leadership",
    desc: "Executive leadership, strategic vision, and institutional governance.",
  },
  {
    title: "Office of the Registrar",
    role: "registrar",
    slug: "/administration/registrar",
    icon: ShieldCheck,
    badge: "Academic Governance",
    desc: "Academic affairs, university affiliations, statutory records, and admissions coordination.",
  },
  {
    title: "Accounts & Financial Office",
    role: "accounts_officer",
    slug: "/administration/accounts-officer",
    icon: Briefcase,
    badge: "Finance & Treasury",
    desc: "State budget management, institutional allocations, research grants, and student fees.",
  },
  {
    title: "Heads of Academic Departments (HODs)",
    role: "hod",
    slug: "/administration/hods",
    icon: Layers,
    badge: "Academic Leadership",
    desc: "Departmental academic leadership, curriculum execution, and faculty administration.",
  },
  {
    title: "Hostel Administration & Superintendence",
    role: "hostel_super",
    slug: "/administration/hostel-super",
    icon: Home,
    badge: "Residential Welfare",
    desc: "Student residential welfare, campus dining facilities, and hall discipline.",
  },
  {
    title: "Campus Caretaker & Estate Management",
    role: "caretaker",
    slug: "/administration/caretaker",
    icon: Users,
    badge: "Estate & Operations",
    desc: "Physical infrastructure maintenance, utilities management, and civil amenities.",
  },
];

async function getAllStaff(): Promise<StaffProfile[]> {
  try {
    const rows = await db.select().from(staff).orderBy(asc(staff.role), asc(staff.name));
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      email: r.email,
      employeeId: r.employeeId,
      photoUrl: r.photoUrl,
      role: r.role,
      department: r.department,
      education: r.education as Array<{ degree: string; institution: string; year?: number }> | null,
      researchPaperLinks: r.researchPaperLinks as Array<{ title: string; url: string }> | null,
    }));
  } catch (err) {
    console.error("Error fetching all staff from DB:", err);
    return [];
  }
}

export default async function AdministrationDirectoryPage() {
  const staffMembers = await getAllStaff();

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>Institutional Governance & Leadership</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight">
                Administration & Leadership Directory
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
                Meet the visionary leaders, administrative officers, department heads, and operational directors dedicated to academic excellence at Kalyani Government Engineering College.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E5C9E] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <Mail size={16} />
                  <span>Contact Administrative Office</span>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors backdrop-blur-md"
                >
                  <Building2 size={16} />
                  <span>About KGEC</span>
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
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Public Institution</p>
                    <p className="text-xl font-bold font-serif">State Governance</p>
                  </div>
                </div>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  Administered under the Department of Higher Education, Government of West Bengal, adhering to AICTE and MAKAUT mandates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Administrative Wings Directory */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2E5C9E] block">
              INSTITUTIONAL WINGS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              Administrative Offices & Key Portfolios
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WINGS.map((w) => {
              const Icon = w.icon;
              return (
                <div
                  key={w.title}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between hover:border-[#2E5C9E] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#2E5C9E] flex items-center justify-center">
                        <Icon size={22} />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {w.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#1A1A1A] mb-2">{w.title}</h3>
                    <p className="text-xs text-[#6B7280] leading-relaxed mb-6">{w.desc}</p>
                  </div>

                  <Link
                    href={w.slug}
                    className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2E5C9E] hover:underline"
                  >
                    <span>View Officials & Office Page</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* Live Staff Profiles Directory */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2E5C9E] block">
              OFFICIAL RECORDS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              All Administrative Staff & Faculty Heads
            </h2>
          </div>

          {staffMembers.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
              Staff records are currently being synchronized with the state administrative portal.
            </div>
          ) : (
            <div className="space-y-6">
              {staffMembers.map((member) => (
                <StaffProfileCard key={member.id} staff={member} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
