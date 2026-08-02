import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StaffProfileCard, { StaffProfile } from "@/components/StaffProfileCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Building2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { db } from "@/lib/db";
import { staff } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

const ROLE_MAP: Record<string, { roleKey: string; title: string; desc: string; badge: string }> = {
  principal: {
    roleKey: "principal",
    title: "Office of the Principal",
    desc: "Executive leadership, strategic vision, and institutional governance of Kalyani Government Engineering College.",
    badge: "Executive Leadership",
  },
  registrar: {
    roleKey: "registrar",
    title: "Office of the Registrar",
    desc: "Academic governance, university coordination, statutory compliance, student records, and institutional administration.",
    badge: "Academic Governance",
  },
  "accounts-officer": {
    roleKey: "accounts_officer",
    title: "Office of the Accounts Officer",
    desc: "Fiscal planning, state budget allocation, research grant disbursements, student fees, and audit compliance.",
    badge: "Financial Administration",
  },
  hods: {
    roleKey: "hod",
    title: "Heads of Academic Departments (HODs)",
    desc: "Departmental academic leadership, curriculum execution, laboratory administration, and faculty coordination.",
    badge: "Academic Leadership",
  },
  "hostel-super": {
    roleKey: "hostel_super",
    title: "Hostel Administration & Superintendence",
    desc: "Student residential welfare, campus dining facilities, hall superintendence, and student life discipline.",
    badge: "Student Residential Welfare",
  },
  caretaker: {
    roleKey: "caretaker",
    title: "Campus Caretaker & Estate Management",
    desc: "Campus physical infrastructure maintenance, utilities management, civil amenities, and campus estate upkeep.",
    badge: "Estate & Infrastructure",
  },
};

interface PageProps {
  params: Promise<{ role: string }>;
}

export function generateStaticParams() {
  return [
    { role: "principal" },
    { role: "registrar" },
    { role: "accounts-officer" },
    { role: "hods" },
    { role: "hostel-super" },
    { role: "caretaker" },
  ];
}

async function getStaffByRole(roleKey: string): Promise<StaffProfile[]> {
  try {
    const rows = await db
      .select()
      .from(staff)
      .where(eq(staff.role, roleKey as typeof staff.role.enumValues[number]));

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
    console.error("Error fetching staff profiles from DB:", err);
    return [];
  }
}

export default async function AdministrationRolePage({ params }: PageProps) {
  const { role } = await params;
  const config = ROLE_MAP[role];

  if (!config) {
    notFound();
  }

  const staffList = await getStaffByRole(config.roleKey);

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <Link
            href="/administration/principal"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-200 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            <span>Administration Directory</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>{config.badge}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight">
                {config.title}
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
                {config.desc}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2E5C9E] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  <span>Contact Office</span>
                  <ArrowRight size={16} />
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
                    <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Governance</p>
                    <p className="text-xl font-bold font-serif">State Administration</p>
                  </div>
                </div>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  Committed to transparent academic leadership, efficient administrative operations, and student welfare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-12">
        <section className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider">
              Staff Profiles
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#1B2A4A]">
              Administrative Officials & Officers
            </h2>
          </div>

          {staffList.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
              Official records for this section are being updated by the administrative office. Please check back shortly or visit the contact directory.
            </div>
          ) : (
            <div className="space-y-6">
              {staffList.map((staffMember) => (
                <StaffProfileCard key={staffMember.id} staff={staffMember} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
