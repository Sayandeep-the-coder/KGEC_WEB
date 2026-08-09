import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { instituteEnrollmentStats, departmentEnrollment } from "@/lib/db/schema";
import { asc, desc } from "drizzle-orm";
import StudentStrengthClient, { DeptEnrollmentRow, GenderRatioEntry } from "./StudentStrengthClient";

export const metadata: Metadata = {
  title: "Student Demographics | Kalyani Government Engineering College",
  description: "Explore KGEC student strength, department-wise intake, and gender ratio statistics.",
};

const getCachedEnrollmentStats = unstable_cache(
  async () => {
    return db.select().from(instituteEnrollmentStats).orderBy(asc(instituteEnrollmentStats.year));
  },
  ["enrollment-stats-all"],
  { revalidate: 3600, tags: ["enrollment"] }
);

const getCachedEnrollmentDepartments = unstable_cache(
  async () => {
    return db.select().from(departmentEnrollment).orderBy(desc(departmentEnrollment.year));
  },
  ["enrollment-departments-all"],
  { revalidate: 3600, tags: ["enrollment"] }
);

export default async function StudentStrengthPage() {
  const [statsData, deptData] = await Promise.all([
    getCachedEnrollmentStats(),
    getCachedEnrollmentDepartments(),
  ]);

  let totalIntake = 0;
  let maleRatio = "0";
  let femaleRatio = "0";
  let genderRatio: GenderRatioEntry[] = [];

  const latestStats = statsData[statsData.length - 1];
  if (latestStats) {
    totalIntake = latestStats.totalStudents;
    const m = latestStats.totalMale;
    const f = latestStats.totalFemale;
    const mPct = latestStats.maleRatio || (m + f > 0 ? ((m / (m + f)) * 100).toFixed(1) : "0");
    const fPct = latestStats.femaleRatio || (m + f > 0 ? ((f / (m + f)) * 100).toFixed(1) : "0");
    
    maleRatio = String(mPct);
    femaleRatio = String(fPct);

    genderRatio = [
      { name: `Male Students (${mPct}%)`, id: "male", value: m, fill: "var(--color-male)" },
      { name: `Female Students (${fPct}%)`, id: "female", value: f, fill: "var(--color-female)" },
    ];
  }

  const ugs: DeptEnrollmentRow[] = [];
  const pgs: DeptEnrollmentRow[] = [];

  const deptNames: Record<string, string> = {
    cse: "Computer Science & Engineering",
    it: "Information Technology",
    ece: "Electronics & Communication",
    ee: "Electrical Engineering",
    me: "Mechanical Engineering",
    mca: "Master of Computer Applications",
    mtech: "M.Tech Programs",
  };

  // Only take latest year data for departments (assume first N rows are latest if we group, but we can just filter by latest year)
  const latestYear = deptData.length > 0 ? deptData[0].year : new Date().getFullYear();
  const currentYearDepts = deptData.filter((d) => d.year === latestYear);

  currentYearDepts.forEach((item) => {
    const code = item.department.toUpperCase();
    const lower = item.department.toLowerCase();
    const row: DeptEnrollmentRow = {
      department: code,
      fullName: deptNames[lower] || code,
      total: item.totalStudents || (item.maleStudents + item.femaleStudents),
      male: item.maleStudents,
      female: item.femaleStudents,
    };

    if (lower === "mtech" || lower === "pe") {
      pgs.push(row);
    } else {
      ugs.push(row);
    }
  });

  return (
    <StudentStrengthClient
      ugData={ugs}
      pgData={pgs}
      genderRatio={genderRatio}
      totalIntake={totalIntake}
      maleRatio={maleRatio}
      femaleRatio={femaleRatio}
    />
  );
}
