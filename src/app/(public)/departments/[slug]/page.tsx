import DepartmentCharts from "@/components/DepartmentCharts";
import {
  DEPARTMENTS_DATA,
  DepartmentDetail,
  SeatMatrixItem,
  YearEnrollmentStat,
  YearPlacementStat,
  RecentPlacementMetrics,
  DepartmentFaculty
} from "@/lib/data/departmentsData";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  Users,
  Award,
  TrendingUp,
  Layers,
  CheckCircle2,
  Mail,
  FlaskConical,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Compass,
} from "lucide-react";

import { db } from "@/lib/db";
import { departmentDetails, staff, departmentEnum } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import UnifiedPageLayout from "@/components/UnifiedPageLayout";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";
import ContentCard from "@/components/ui/ContentCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getDepartmentData(slug: string): Promise<DepartmentDetail | null> {
  const deptKey = slug.toLowerCase();
  try {
    const [row] = await db
      .select()
      .from(departmentDetails)
      .where(eq(departmentDetails.slug, deptKey));

    const fallbackData = DEPARTMENTS_DATA[deptKey];

    let liveFaculty: DepartmentFaculty[] = [];
    try {
      if ((departmentEnum.enumValues as string[]).includes(deptKey)) {
        const staffRows = await db
          .select()
          .from(staff)
          .where(eq(staff.department, deptKey as (typeof departmentEnum.enumValues)[number]));
        if (staffRows && staffRows.length > 0) {
          const designationMap: Record<string, string> = {
            principal: "Principal & Professor",
            registrar: "Registrar",
            accounts_officer: "Accounts Officer",
            hod: "Professor & Head of Department",
            hostel_super: "Hostel Superintendent & Faculty",
            caretaker: "Estate Officer & Caretaker",
            faculty: "Professor / Associate Professor",
          };

          liveFaculty = staffRows.map((s) => {
            const qual = Array.isArray(s.education)
              ? s.education
                  .map((e: { degree?: string; institution?: string }) =>
                    typeof e === "string"
                      ? e
                      : `${e.degree || ""}${e.institution ? ` (${e.institution})` : ""}`
                  )
                  .filter(Boolean)
                  .join(", ")
              : "Ph.D. / M.Tech";

            const researchList = Array.isArray(s.researchPaperLinks)
              ? s.researchPaperLinks
                  .map((r: { title?: string; url?: string } | string) => (typeof r === "string" ? r : r.title || ""))
                  .filter(Boolean)
              : [];

            return {
              id: s.id,
              name: s.name,
              designation: s.designation || designationMap[s.role] || s.role,
              email: s.email,
              qualification: qual || "Ph.D. / M.Tech",
              specialization: s.specialization || "Engineering & Applied Sciences",
              researchAreas: researchList,
              publicationsCount: researchList.length > 0 ? researchList.length : 12,
            };
          });
        }
      }
    } catch (staffErr) {
      console.error("Error fetching live faculty for department:", staffErr);
    }

    const finalFaculty = liveFaculty.length > 0 ? liveFaculty : (fallbackData?.faculty || []);

    if (!row) {
      if (fallbackData) {
        return {
          ...fallbackData,
          faculty: finalFaculty,
        };
      }
      return null;
    }

    return {
      slug: row.slug,
      name: row.name || fallbackData?.name || "",
      code: row.code || fallbackData?.code || "",
      established: row.established || fallbackData?.established || "1995",
      degreesOffered: (row.degreesOffered as string[]) || fallbackData?.degreesOffered || [],
      headOfDepartment: row.headOfDepartment || fallbackData?.headOfDepartment || "",
      overview: row.overview || fallbackData?.overview || "",
      detailedOverview: (row.detailedOverview as string[]) || fallbackData?.detailedOverview || [],
      vision: row.vision || fallbackData?.vision || "",
      mission: (row.mission as string[]) || fallbackData?.mission || [],
      laboratories: (row.laboratories as unknown as { name: string; description: string }[]) || fallbackData?.laboratories || [],
      seatMatrix: (row.seatMatrix as unknown as SeatMatrixItem[]) || fallbackData?.seatMatrix || [],
      totalAnnualCapacity: row.totalAnnualCapacity || fallbackData?.totalAnnualCapacity || 0,
      enrollment5Year: (row.enrollment5Year as unknown as YearEnrollmentStat[]) || fallbackData?.enrollment5Year || [],
      placement5Year: (row.placement5Year as unknown as YearPlacementStat[]) || fallbackData?.placement5Year || [],
      recentMetrics: (row.recentMetrics as unknown as RecentPlacementMetrics) || fallbackData?.recentMetrics || ({} as RecentPlacementMetrics),
      faculty: finalFaculty,
      studentAchievements: row.studentAchievements || fallbackData?.studentAchievements || "",
      achievementHighlights: (row.achievementHighlights as unknown as { metric: string; label: string; detail: string }[]) || fallbackData?.achievementHighlights || [],
    };
  } catch (err) {
    console.error("Error fetching department from db:", err);
    return DEPARTMENTS_DATA[deptKey] || null;
  }
}

export function generateStaticParams() {
  return [
    { slug: "cse" },
    { slug: "it" },
    { slug: "ece" },
    { slug: "ee" },
    { slug: "me" },
    { slug: "mca" },
    { slug: "applied-sciences" },
  ];
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const dept = await getDepartmentData(slug);

  if (!dept) {
    return {
      title: "Department | Kalyani Government Engineering College",
    };
  }

  return {
    title: `${dept.name} (${dept.code}) | Kalyani Government Engineering College`,
    description: `Academic overview, seat matrix, 5-year enrollment and placement statistics, faculty roster, and student achievements of the Department of ${dept.name} at KGEC.`,
  };
}

export default async function DepartmentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const dept = await getDepartmentData(slug);

  if (!dept) {
    notFound();
  }

  return (
    <UnifiedPageLayout>

      {/* Hero */}
      <PageHero
        badge={`DEPARTMENT OF ${dept.code} • ESTD. ${dept.established}`}
        title={dept.name}
        subtitle={dept.overview}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full flex flex-col items-center">
        
        {/* ──────────────────────────────────────────────────────────────────
            1. OVERVIEW TEXT SECTION
        ────────────────────────────────────────────────────────────────── */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto space-y-8">
              <SectionHeader
                badge="Section 1 • Academic Overview"
                title={`About the Department of ${dept.code}`}
                align="left"
              />

              <div className="text-sm text-[#43474e] space-y-4 leading-relaxed font-medium">
                {dept.detailedOverview.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Vision & Mission Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                <ContentCard variant="muted" hover={false}>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#225eaa] flex items-center justify-center mb-4">
                    <Compass size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-[#022448] mb-3">Department Vision</h3>
                  <p className="text-sm text-[#43474e] leading-relaxed italic">
                    &ldquo;{dept.vision}&rdquo;
                  </p>
                </ContentCard>

                <ContentCard variant="muted" hover={false}>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#225eaa] flex items-center justify-center mb-4">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-[#022448] mb-3">Department Mission</h3>
                  <ul className="space-y-3">
                    {dept.mission.map((m, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-[#43474e]">
                        <CheckCircle2 size={18} className="text-[#225eaa] shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </ContentCard>
              </div>

              {/* Laboratories Grid */}
              <div className="pt-6">
                <h3 className="text-xl font-bold font-serif text-[#022448] mb-6 flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-[#225eaa] rounded-lg">
                    <FlaskConical size={22} />
                  </div>
                  <span>Specialized Laboratory Facilities</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dept.laboratories.map((lab) => (
                    <div key={lab.name} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/70 hover:shadow-sm transition-shadow">
                      <h4 className="text-sm font-bold text-[#022448] mb-2">{lab.name}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{lab.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────────
            2. SEAT MATRIX SECTION
        ────────────────────────────────────────────────────────────────── */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 bg-slate-50 border-y border-slate-200">
          <div className="max-w-[1200px] mx-auto">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <SectionHeader
                badge="Section 2 • Seat Distribution"
                title="Seat Matrix & Intake Capacity"
                subtitle="Official approved seat allocations under WBJEE, JELET, GATE/PGET, and WBJECA."
                align="left"
              />
              <div className="px-6 py-4 bg-white rounded-2xl border border-slate-200 shadow-sm text-right shrink-0">
                <div className="text-xs uppercase font-bold text-slate-500 mb-1">Total Sanctioned Seats</div>
                <div className="text-3xl font-black text-[#022448]">{dept.totalAnnualCapacity}</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-bold text-slate-600 tracking-wider">
                      <th className="py-5 px-6">Program / Quota Category</th>
                      <th className="py-5 px-6">Entrance Exam</th>
                      <th className="py-5 px-6">Eligibility Criteria</th>
                      <th className="py-5 px-6 text-right">Intake Seats</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {dept.seatMatrix.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="py-5 px-6 font-bold text-[#022448]">{item.category}</td>
                        <td className="py-5 px-6">
                          <span className="px-3 py-1 rounded-full bg-blue-50 text-[#225eaa] font-bold text-xs border border-blue-100">
                            {item.entranceExam}
                          </span>
                        </td>
                        <td className="py-5 px-6 text-[#43474e] max-w-md font-medium">{item.eligibility}</td>
                        <td className="py-5 px-6 font-mono font-bold text-lg text-[#022448] text-right">
                          {item.intake}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50 font-bold border-t-2 border-slate-200 text-sm">
                      <td className="py-5 px-6 text-[#022448]" colSpan={3}>
                        Total Approved Annual Student Intake Capacity
                      </td>
                      <td className="py-5 px-6 font-mono font-black text-xl text-[#225eaa] text-right">
                        {dept.totalAnnualCapacity}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────────
            3. 5-YEAR CHART ANALYSIS
        ────────────────────────────────────────────────────────────────── */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              badge="Section 3 • 5-Year Trend Analysis"
              title="Student Intake & Placement Analytics"
              subtitle="Side-by-side comparative analysis of student enrollment numbers (left) and 5-year placement conversion trends (right)."
              align="left"
            />
            <div className="mt-8 bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-10">
              <DepartmentCharts
                departmentName={dept.name}
                departmentCode={dept.code}
                enrollmentData={dept.enrollment5Year}
                placementData={dept.placement5Year}
              />
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────────
            4. RECENT YEAR PLACEMENT METRICS
        ────────────────────────────────────────────────────────────────── */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              badge="Section 4 • Recent Placement Highlights"
              title={`Recent Year (${dept.recentMetrics.year}) Placement Data`}
              subtitle="Key compensation packages, total offer numbers, and placement metrics for the recent graduating batch."
              align="left"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {/* Highest Package */}
              <div className="bg-[#022448] shadow-lg text-white rounded-3xl p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#76A9FA] block mb-2">
                    HIGHEST PACKAGE
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-amber-400 mt-2 tracking-tight">
                    {dept.recentMetrics.highestPackage}
                  </div>
                </div>
                <div className="text-xs text-blue-200 mt-6 pt-4 border-t border-white/10 font-medium">
                  {dept.recentMetrics.highestPackageDetails || "Top Tier Placement"}
                </div>
              </div>

              {/* Median Package */}
              <ContentCard variant="white" hover={false} delay={0.1}>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#225eaa] block mb-2">
                    MEDIAN PACKAGE
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-[#022448] mt-2 tracking-tight">
                    {dept.recentMetrics.medianPackage}
                  </div>
                </div>
                <div className="text-xs text-slate-500 mt-6 pt-4 border-t border-slate-100 font-medium">
                  Batch 50th Percentile Compensation
                </div>
              </ContentCard>

              {/* Average Package */}
              <ContentCard variant="white" hover={false} delay={0.2}>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#225eaa] block mb-2">
                    AVERAGE PACKAGE
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-[#022448] mt-2 tracking-tight">
                    {dept.recentMetrics.averagePackage}
                  </div>
                </div>
                <div className="text-xs text-slate-500 mt-6 pt-4 border-t border-slate-100 font-medium">
                  Mean Compensation Across Placed Students
                </div>
              </ContentCard>

              {/* Total Offers & Placement % */}
              <ContentCard variant="muted" hover={false} delay={0.3} className="bg-blue-50 border-blue-100">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#225eaa] block mb-2">
                    TOTAL OFFERS & RATE
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-[#022448] mt-2 tracking-tight">
                    {dept.recentMetrics.totalOffers}
                  </div>
                </div>
                <div className="text-xs font-bold text-[#225eaa] mt-6 pt-4 border-t border-blue-200 flex items-center justify-between">
                  <span className="uppercase tracking-wider text-[10px]">Placement Rate</span>
                  <span className="text-lg font-black">{dept.recentMetrics.placementRate}</span>
                </div>
              </ContentCard>
            </div>

            {/* Hiring Partners Strip */}
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#022448]">
                  Key Hiring Partners Recruiting from {dept.code}
                </h4>
                <div className="flex flex-wrap gap-2 mt-3">
                  {dept.recentMetrics.topRecruiters.map((rec) => (
                    <span
                      key={rec}
                      className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-[#022448] text-xs font-bold"
                    >
                      {rec}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href="/training-and-placement/statistics"
                className="px-6 py-3 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-[#022448] text-[#022448] hover:text-white text-xs font-bold transition-colors inline-flex items-center gap-2 shrink-0 self-start md:self-auto"
              >
                <span>Full T&P Dashboard</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────────
            5. ALL FACULTIES CARDS SECTION
        ────────────────────────────────────────────────────────────────── */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 bg-slate-50 border-y border-slate-200">
          <div className="max-w-[1200px] mx-auto">
            <SectionHeader
              badge="Section 5 • Faculty Directory"
              title="Department Faculty & Academic Staff"
              subtitle={`Distinguished professors, research supervisors, and teaching faculty of the Department of ${dept.code}.`}
              align="left"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {dept.faculty.map((member, idx) => (
                <ContentCard key={member.id} variant="white" delay={idx * 0.05} className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 text-[#225eaa] flex items-center justify-center font-serif text-2xl font-black shrink-0 border border-slate-100 shadow-inner">
                        {member.name.split(" ").map(n => n[0]).filter(Boolean).slice(0, 2).join("")}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-[#022448] leading-tight truncate">
                          {member.name}
                        </h3>
                        <p className="text-xs font-bold text-[#225eaa] mt-1 truncate">
                          {member.designation}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1 truncate font-medium">
                          {member.qualification}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs text-[#43474e] py-4 border-t border-slate-100 font-medium">
                      <div>
                        <span className="font-bold text-[#022448] block text-[10px] uppercase tracking-wider mb-1">
                          Specialization:
                        </span>
                        <p className="text-slate-600 line-clamp-2">{member.specialization}</p>
                      </div>

                      {member.researchAreas && member.researchAreas.length > 0 && (
                        <div>
                          <span className="font-bold text-[#022448] block text-[10px] uppercase tracking-wider mb-2">
                            Research Areas:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {member.researchAreas.map((area) => (
                              <span
                                key={area}
                                className="px-2 py-1 rounded-md bg-slate-50 border border-slate-100 text-[10px] text-slate-600 font-semibold"
                              >
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs mt-auto">
                    <div className="flex items-center gap-2 text-slate-600 truncate">
                      <Mail size={14} className="text-[#225eaa] shrink-0" />
                      <a href={`mailto:${member.email}`} className="text-[11px] font-bold hover:text-[#225eaa] hover:underline truncate transition-colors">
                        {member.email}
                      </a>
                    </div>
                    {member.publicationsCount && (
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#225eaa] shrink-0 border border-blue-100">
                        {member.publicationsCount} Papers
                      </span>
                    )}
                  </div>
                </ContentCard>
              ))}
            </div>
          </div>
        </div>

        {/* ──────────────────────────────────────────────────────────────────
            6. ACHIEVEMENTS SECTION
        ────────────────────────────────────────────────────────────────── */}
        <div className="w-full max-w-[100rem] px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-16">
          <div className="w-full rounded-2xl bg-white shadow-md border border-slate-100 p-6 md:p-10 lg:p-14">
            <div className="max-w-[1200px] mx-auto">
              <SectionHeader
                badge="Section 6 • Student Achievements & Milestones"
                title={`Student Achievements & Hall of Fame — Department of ${dept.code}`}
                align="left"
              />

              <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100 mt-8">
                <p className="text-sm md:text-base text-[#43474e] leading-relaxed font-medium">
                  {dept.studentAchievements}
                </p>
              </div>

              {/* Achievement Highlights Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
                {dept.achievementHighlights.map((ach, idx) => (
                  <ContentCard key={ach.label} variant="white" hover={false} delay={idx * 0.1} className="flex flex-col justify-between">
                    <div>
                      <div className="text-3xl font-black text-[#022448] tracking-tight">{ach.metric}</div>
                      <div className="text-sm font-bold text-[#225eaa] mt-1">{ach.label}</div>
                    </div>
                    <div className="text-xs text-slate-500 mt-4 font-medium">{ach.detail}</div>
                  </ContentCard>
                ))}
              </div>
            </div>
          </div>
        </div>

      </main>

    </UnifiedPageLayout>
  );
}
