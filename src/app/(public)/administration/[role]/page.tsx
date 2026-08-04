

import StaffProfileCard, { StaffProfile } from "@/components/StaffProfileCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { db } from "@/lib/db";
import { staff } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";

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
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge={config.badge}
        title={config.title}
        subtitle={config.desc}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-white/30 rounded-full px-6 py-3 text-white font-medium hover:bg-white/10 transition-colors"
          >
            Contact Office <ArrowRight size={16} />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-3 text-white/80 font-medium hover:bg-white/10 transition-colors"
          >
            About KGEC
          </Link>
        </div>
      </PageHero>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center">
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-16">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              badge="Staff Profiles"
              title="Administrative Officials & Officers"
              align="left"
            />

            <div className="mt-8">
              {staffList.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 text-sm shadow-sm font-medium">
                  Official records for this section are being updated by the administrative office. Please check back shortly or visit the contact directory.
                </div>
              ) : (
                <div className="space-y-6">
                  {staffList.map((staffMember) => (
                    <div key={staffMember.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                      <StaffProfileCard staff={staffMember} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      </UnifiedPageLayout>
  );
}
