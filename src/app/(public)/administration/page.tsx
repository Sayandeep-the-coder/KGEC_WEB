import StaffProfileCard, { StaffProfile } from "@/components/StaffProfileCard";
import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  Users,
  Home,
  Briefcase,
  Layers,
  ArrowRight,
} from "lucide-react";
import { db } from "@/lib/db";
import { staff } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentCard from "@/components/ui/ContentCard";

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
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge="Institutional Governance & Leadership"
        title="Administration & Leadership Directory"
        subtitle="Meet the visionary leaders, administrative officers, department heads, and operational directors dedicated to academic excellence at Kalyani Government Engineering College."
      >
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#022448] rounded-full px-6 py-3 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors shadow-lg"
          >
            <span>Contact Administrative Office</span> <ArrowRight size={16} />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-3 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors backdrop-blur-sm"
          >
            About KGEC
          </Link>
        </div>
      </PageHero>

      {/* Main Container */}
      <main className="flex-1 w-full flex flex-col items-center">
        
        {/* Administrative Wings Directory */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="INSTITUTIONAL WINGS"
                title="Administrative Offices & Key Portfolios"
                subtitle="Explore the various administrative departments that keep the institution running smoothly."
                align="left"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {WINGS.map((w, idx) => {
                  const Icon = w.icon;
                  return (
                    <Link key={w.title} href={w.slug} className="block h-full">
                      <ContentCard variant="white" delay={idx * 0.1} className="h-full flex flex-col justify-between group hover:border-[#225eaa]">
                        <div>
                          <div className="flex items-center justify-between mb-5">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#225eaa] flex items-center justify-center group-hover:bg-[#225eaa] group-hover:text-white transition-colors">
                              <Icon size={24} />
                            </div>
                            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 uppercase tracking-wider border border-slate-200">
                              {w.badge}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-[#022448] mb-3 group-hover:text-[#225eaa] transition-colors">{w.title}</h3>
                          <p className="text-sm text-[#43474e] leading-relaxed mb-6 font-medium">{w.desc}</p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#225eaa] group-hover:text-[#022448] mt-auto transition-colors">
                          <span className="uppercase tracking-wider text-[10px]">View Officials & Office Page</span>
                          <ArrowRight size={16} />
                        </div>
                      </ContentCard>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Live Staff Profiles Directory */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-16 bg-slate-50 border-y border-slate-200">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              badge="OFFICIAL RECORDS"
              title="All Administrative Staff & Faculty Heads"
              align="left"
            />

            <div className="mt-8">
              {staffMembers.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-500 text-sm shadow-sm font-medium">
                  Staff records are currently being synchronized with the state administrative portal.
                </div>
              ) : (
                <div className="space-y-6">
                  {staffMembers.map((member) => (
                    <div key={member.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                      <StaffProfileCard staff={member} />
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
