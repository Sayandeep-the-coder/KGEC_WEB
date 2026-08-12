import { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { placementStats, placementDepartments, placementRecruiters } from "@/lib/db/schema";
import { asc, desc, eq } from "drizzle-orm";
import PlacementStatisticsClient from "./PlacementStatisticsClient";

export const metadata: Metadata = {
  title: "Placement Statistics & Analytics | Kalyani Government Engineering College",
  description: "Comprehensive recruitment statistics, department-wise CTC packages, placement conversion rates, and 5-year hiring records.",
};

const getCachedStats = unstable_cache(
  async () => {
    return db.select().from(placementStats).orderBy(asc(placementStats.year));
  },
  ["placement-stats-all"],
  { revalidate: 3600, tags: ["placements"] }
);

const getCachedDepartments = unstable_cache(
  async (year: number) => {
    return db
      .select()
      .from(placementDepartments)
      .where(eq(placementDepartments.year, year))
      .orderBy(desc(placementDepartments.studentsPlaced));
  },
  ["placement-departments-year"],
  { revalidate: 3600, tags: ["placements"] }
);

const getCachedRecruiters = unstable_cache(
  async (year: number) => {
    return db
      .select()
      .from(placementRecruiters)
      .where(eq(placementRecruiters.year, year))
      .orderBy(desc(placementRecruiters.offers))
      .limit(200);
  },
  ["placement-recruiters-year"],
  { revalidate: 3600, tags: ["placements"] }
);

const DEPT_FULL_NAMES: Record<string, string> = {
  CSE: "Computer Science & Engineering",
  IT: "Information Technology",
  ECE: "Electronics & Communication",
  EE: "Electrical Engineering",
  ME: "Mechanical Engineering",
  MCA: "Master of Computer Applications",
};

const DEPT_ORDER = ["CSE", "IT", "ECE", "EE", "ME", "MCA"];

export default async function PlacementStatisticsPage() {
  const DEFAULT_YEAR = 2024;

  let statsData: any[] = [];
  let deptData: any[] = [];
  let recData: any[] = [];

  try {
    [statsData, deptData, recData] = await Promise.all([
      getCachedStats(),
      getCachedDepartments(DEFAULT_YEAR),
      getCachedRecruiters(DEFAULT_YEAR),
    ]);
  } catch (err) {
    console.warn("Database connection failed for placement statistics, serving fallback data:", err);
  }

  const initialTrends = statsData.map((item) => ({
    year: item.year,
    studentsPlaced: item.studentsPlaced || 0,
    highestLPA: item.highestSalary ? Number((item.highestSalary / 100000).toFixed(1)) : 0,
    avgLPA: item.medianSalary ? Number((item.medianSalary / 100000).toFixed(1)) : 0,
  }));

  const initialDepts = deptData.map((d) => {
    const deptCode = d.department.toUpperCase();
    return {
      department: deptCode,
      fullName: DEPT_FULL_NAMES[deptCode] || deptCode,
      placementRate: d.placementRate ? Number(d.placementRate) : 0,
      placed: d.studentsPlaced || 0,
      totalOffers: d.totalOffers || d.studentsPlaced || 0,
      highestLPA: d.highestSalary ? Number((d.highestSalary / 100000).toFixed(1)) : 0,
      avgLPA: d.medianSalary ? Number((d.medianSalary / 100000).toFixed(1)) : 0,
    };
  });

  initialDepts.sort((a, b) => {
    const idxA = DEPT_ORDER.indexOf(a.department);
    const idxB = DEPT_ORDER.indexOf(b.department);
    return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
  });

  const initialRecruiters = recData.map((r) => ({
    name: r.company,
    type: "Recruiting Partner",
    highest: "Tier 1 Offer",
    offers: r.offers || 0,
  }));

  return (
    <PlacementStatisticsClient
      initialTrends={initialTrends}
      initialDepts={initialDepts}
      initialRecruiters={initialRecruiters}
      initialYear={DEFAULT_YEAR}
    />
  );
}
