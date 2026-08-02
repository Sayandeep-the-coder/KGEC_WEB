import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  Sparkles,
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
    <div className="flex flex-col min-h-screen bg-[#F4F6F9] font-sans w-full text-[#1A1A1A]">
      <Header />

      {/* Hero Banner */}
      <section className="w-full bg-[#1B2A4A] text-white pt-12 pb-16 px-6 relative overflow-hidden border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
            <Sparkles size={14} className="text-blue-300" />
            <span>DEPARTMENT OF {dept.code} • ESTD. {dept.established}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-serif leading-tight">
                {dept.name}
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base md:text-lg mt-4 max-w-2xl leading-relaxed">
                {dept.overview}
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-6">
                {dept.degreesOffered.map((deg) => (
                  <span
                    key={deg}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium border border-white/10"
                  >
                    <GraduationCap size={14} className="text-blue-300" />
                    <span>{deg}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                <div className="text-[11px] text-blue-200 uppercase font-bold">Annual Intake</div>
                <div className="text-2xl font-black text-white mt-1">{dept.totalAnnualCapacity} Seats</div>
                <div className="text-[10px] text-slate-300">Sanctioned Capacity</div>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
                <div className="text-[11px] text-blue-200 uppercase font-bold">Recent Placement</div>
                <div className="text-2xl font-black text-amber-400 mt-1">{dept.recentMetrics.placementRate}</div>
                <div className="text-[10px] text-slate-300">{dept.recentMetrics.totalOffers}</div>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-4 backdrop-blur-md col-span-2">
                <div className="text-[11px] text-blue-200 uppercase font-bold">Highest Package</div>
                <div className="text-2xl font-black text-white mt-1">{dept.recentMetrics.highestPackage}</div>
                <div className="text-[10px] text-slate-300">{dept.recentMetrics.highestPackageDetails || "Top Echelon Offer"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 space-y-16">
        
        {/* ──────────────────────────────────────────────────────────────────
            1. OVERVIEW TEXT SECTION
        ────────────────────────────────────────────────────────────────── */}
        <section id="overview" className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen size={14} />
              <span>Section 1 • Academic Overview</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1B2A4A]">
              About the Department of {dept.code}
            </h2>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
            {dept.detailedOverview.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#2E5C9E] flex items-center justify-center mb-3">
                <Compass size={20} />
              </div>
              <h3 className="text-base font-bold text-[#1B2A4A] mb-2">Department Vision</h3>
              <p className="text-xs text-slate-600 leading-relaxed italic">
                &ldquo;{dept.vision}&rdquo;
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#2E5C9E] flex items-center justify-center mb-3">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-base font-bold text-[#1B2A4A] mb-2">Department Mission</h3>
              <ul className="space-y-2">
                {dept.mission.map((m, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 size={14} className="text-[#2E5C9E] shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Laboratories Grid */}
          <div>
            <h3 className="text-lg font-bold font-serif text-[#1B2A4A] mb-4 flex items-center gap-2">
              <FlaskConical size={20} className="text-[#2E5C9E]" />
              <span>Specialized Laboratory Facilities</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dept.laboratories.map((lab) => (
                <div key={lab.name} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <h4 className="text-xs font-bold text-[#1B2A4A] mb-1">{lab.name}</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{lab.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────
            2. SEAT MATRIX SECTION
        ────────────────────────────────────────────────────────────────── */}
        <section id="seat-matrix">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider mb-2">
                <Layers size={14} />
                <span>Section 2 • Seat Distribution</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1B2A4A]">
                Seat Matrix & Intake Capacity
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
                Official approved seat allocations under WBJEE, JELET, GATE/PGET, and WBJECA.
              </p>
            </div>
            <div className="px-4 py-2 bg-white rounded-2xl border border-slate-200 shadow-sm text-right shrink-0">
              <div className="text-[10px] uppercase font-bold text-slate-500">Total Sanctioned Seats</div>
              <div className="text-2xl font-black text-[#1B2A4A]">{dept.totalAnnualCapacity} Annual Seats</div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] uppercase font-bold text-slate-600 tracking-wider">
                    <th className="py-4 px-6">Program / Quota Category</th>
                    <th className="py-4 px-6">Entrance Exam</th>
                    <th className="py-4 px-6">Eligibility Criteria</th>
                    <th className="py-4 px-6 text-right">Intake Seats</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {dept.seatMatrix.map((item, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                      <td className="py-4 px-6 font-bold text-[#1B2A4A]">{item.category}</td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full bg-blue-50 text-[#2E5C9E] font-semibold text-[11px]">
                          {item.entranceExam}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-600 max-w-md">{item.eligibility}</td>
                      <td className="py-4 px-6 font-mono font-bold text-base text-[#1B2A4A] text-right">
                        {item.intake}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50/80 font-bold border-t-2 border-slate-200 text-xs">
                    <td className="py-4 px-6 text-[#1B2A4A]" colSpan={3}>
                      Total Approved Annual Student Intake Capacity
                    </td>
                    <td className="py-4 px-6 font-mono font-black text-lg text-[#2E5C9E] text-right">
                      {dept.totalAnnualCapacity} Seats
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────
            3. 5-YEAR CHART ANALYSIS (STUDENTS NUMBERS & PLACEMENT STATS)
        ────────────────────────────────────────────────────────────────── */}
        <section id="analytics-charts">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider mb-2">
              <TrendingUp size={14} />
              <span>Section 3 • 5-Year Trend Analysis</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1B2A4A]">
              5-Year Student Intake & Placement Analytics
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
              Side-by-side comparative analysis of student enrollment numbers (left) and 5-year placement conversion trends (right).
            </p>
          </div>

          <DepartmentCharts
            departmentName={dept.name}
            departmentCode={dept.code}
            enrollmentData={dept.enrollment5Year}
            placementData={dept.placement5Year}
          />
        </section>

        {/* ──────────────────────────────────────────────────────────────────
            4. RECENT YEAR PLACEMENT METRICS (HIGHEST, MEDIAN, TOTAL OFFERS)
        ────────────────────────────────────────────────────────────────── */}
        <section id="recent-placement-metrics">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider mb-2">
              <Award size={14} />
              <span>Section 4 • Recent Placement Highlights</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1B2A4A]">
              Recent Year ({dept.recentMetrics.year}) Placement Data
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
              Key compensation packages, total offer numbers, and placement metrics for the recent graduating batch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Highest Package */}
            <div className="bg-[#1B2A4A] text-white rounded-3xl p-6 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300 block mb-1">
                  HIGHEST PACKAGE
                </span>
                <div className="text-3xl sm:text-4xl font-black text-amber-400 mt-2">
                  {dept.recentMetrics.highestPackage}
                </div>
              </div>
              <div className="text-xs text-blue-100 mt-4 pt-4 border-t border-blue-800">
                {dept.recentMetrics.highestPackageDetails || "Top Tier Placement"}
              </div>
            </div>

            {/* Median Package */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#2E5C9E] block mb-1">
                  MEDIAN PACKAGE
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[#1B2A4A] mt-2">
                  {dept.recentMetrics.medianPackage}
                </div>
              </div>
              <div className="text-xs text-slate-500 mt-4 pt-4 border-t border-slate-100">
                Batch 50th Percentile Compensation
              </div>
            </div>

            {/* Average Package */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#2E5C9E] block mb-1">
                  AVERAGE PACKAGE
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[#1B2A4A] mt-2">
                  {dept.recentMetrics.averagePackage}
                </div>
              </div>
              <div className="text-xs text-slate-500 mt-4 pt-4 border-t border-slate-100">
                Mean Compensation Across Placed Students
              </div>
            </div>

            {/* Total Offers & Placement % */}
            <div className="bg-blue-50 rounded-3xl border border-blue-200 p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#2E5C9E] block mb-1">
                  TOTAL OFFERS & RATE
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[#1B2A4A] mt-2">
                  {dept.recentMetrics.totalOffers}
                </div>
              </div>
              <div className="text-xs font-bold text-[#2E5C9E] mt-4 pt-4 border-t border-blue-200 flex items-center justify-between">
                <span>Placement Rate:</span>
                <span className="text-sm font-black">{dept.recentMetrics.placementRate}</span>
              </div>
            </div>
          </div>

          {/* Hiring Partners Strip */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B2A4A]">
                Key Hiring Partners Recruiting from {dept.code}
              </h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {dept.recentMetrics.topRecruiters.map((rec) => (
                  <span
                    key={rec}
                    className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold"
                  >
                    {rec}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="/training-and-placement/statistics"
              className="px-5 py-2.5 rounded-full bg-[#1B2A4A] hover:bg-[#2E5C9E] text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 shrink-0 self-start md:self-auto"
            >
              <span>Full T&P Dashboard</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────
            5. ALL FACULTIES CARDS SECTION
        ────────────────────────────────────────────────────────────────── */}
        <section id="faculty-cards">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 text-[#2E5C9E] text-xs font-bold uppercase tracking-wider mb-2">
                <Users size={14} />
                <span>Section 5 • Faculty Directory</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1B2A4A]">
                Department Faculty & Academic Staff
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
                Distinguished professors, research supervisors, and teaching faculty of the Department of {dept.code}.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dept.faculty.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#1B2A4A] text-white flex items-center justify-center font-serif text-lg font-bold shrink-0 shadow-sm border-2 border-blue-100">
                      {member.name.split(" ").map(n => n[0]).filter(Boolean).slice(0, 2).join("")}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold text-[#1A1A1A] leading-tight truncate">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#2E5C9E] mt-0.5">
                        {member.designation}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                        {member.qualification}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-700 py-3 border-t border-slate-100">
                    <div>
                      <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wide">
                        Specialization:
                      </span>
                      <p className="text-slate-600 text-xs mt-0.5">{member.specialization}</p>
                    </div>

                    {member.researchAreas && member.researchAreas.length > 0 && (
                      <div>
                        <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wide">
                          Research Areas:
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {member.researchAreas.map((area) => (
                            <span
                              key={area}
                              className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-700 font-medium"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600 truncate">
                    <Mail size={13} className="text-[#2E5C9E] shrink-0" />
                    <a href={`mailto:${member.email}`} className="text-[11px] hover:underline truncate">
                      {member.email}
                    </a>
                  </div>
                  {member.publicationsCount && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#2E5C9E] shrink-0">
                      {member.publicationsCount} Papers
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ──────────────────────────────────────────────────────────────────
            6. HARDCODED TEXT OF DEPARTMENT STUDENT ACHIEVEMENTS PARAGRAPH
        ────────────────────────────────────────────────────────────────── */}
        <section id="student-achievements" className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Trophy size={14} className="text-amber-600" />
              <span>Section 6 • Student Achievements & Milestones</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-[#1B2A4A]">
              Student Achievements & Hall of Fame — Department of {dept.code}
            </h2>
          </div>

          {/* Hardcoded Paragraph */}
          <div className="bg-slate-50/80 rounded-2xl p-6 sm:p-8 border border-slate-200">
            <p className="text-xs sm:text-sm md:text-base text-slate-800 leading-relaxed font-normal">
              {dept.studentAchievements}
            </p>
          </div>

          {/* Achievement Highlights Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {dept.achievementHighlights.map((ach) => (
              <div
                key={ach.label}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-black text-[#1B2A4A]">{ach.metric}</div>
                  <div className="text-xs font-bold text-[#2E5C9E] mt-1">{ach.label}</div>
                </div>
                <div className="text-[11px] text-slate-500 mt-2">{ach.detail}</div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ──────────────────────────────────────────────────────────────────
          7. FOOTER (PAGE END)
      ────────────────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}
