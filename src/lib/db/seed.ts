import { db, client } from "./index";
import {
  departmentDetails,
  placementStats,
  placementRecruiters,
  placementDepartments,
  instituteEnrollmentStats,
  departmentEnrollment,
  alumni,
  admissions,
  staff,
  galleryImages,
  downloads,
} from "./schema";
import { DEPARTMENTS_DATA } from "../data/departmentsData";

export async function ensureTablesExist() {
  try {
    await client.unsafe(`
      DO $$ BEGIN
        CREATE TYPE "alumni_category" AS ENUM ('space_research', 'big_tech', 'founder', 'academia', 'general');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;

      CREATE TABLE IF NOT EXISTS "department_details" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "slug" text UNIQUE NOT NULL,
        "name" text NOT NULL,
        "code" text NOT NULL,
        "established" text,
        "degrees_offered" jsonb DEFAULT '[]'::jsonb,
        "head_of_department" text,
        "overview" text,
        "detailed_overview" jsonb DEFAULT '[]'::jsonb,
        "vision" text,
        "mission" jsonb DEFAULT '[]'::jsonb,
        "laboratories" jsonb DEFAULT '[]'::jsonb,
        "seat_matrix" jsonb DEFAULT '[]'::jsonb,
        "total_annual_capacity" integer,
        "enrollment_5_year" jsonb DEFAULT '[]'::jsonb,
        "placement_5_year" jsonb DEFAULT '[]'::jsonb,
        "recent_metrics" jsonb DEFAULT '{}'::jsonb,
        "student_achievements" text,
        "achievement_highlights" jsonb DEFAULT '[]'::jsonb,
        "updated_at" timestamp with time zone DEFAULT now()
      );

      CREATE TABLE IF NOT EXISTS "alumni" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" text NOT NULL,
        "batch_year" integer NOT NULL,
        "department" text NOT NULL,
        "current_role" text NOT NULL,
        "company" text NOT NULL,
        "location" text,
        "category" "alumni_category" DEFAULT 'general' NOT NULL,
        "bio" text,
        "photo_url" text,
        "linkedin_url" text,
        "featured" boolean DEFAULT false NOT NULL,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL
      );

      ALTER TABLE "alumni" DROP COLUMN IF EXISTS "role";
      ALTER TABLE "alumni" ADD COLUMN IF NOT EXISTS "current_role" text;
      ALTER TABLE "alumni" ADD COLUMN IF NOT EXISTS "bio" text;
      ALTER TABLE "alumni" ADD COLUMN IF NOT EXISTS "featured" boolean DEFAULT false;
      ALTER TABLE "alumni" ADD COLUMN IF NOT EXISTS "photo_url" text;
      ALTER TABLE "alumni" ADD COLUMN IF NOT EXISTS "linkedin_url" text;
      ALTER TABLE "alumni" ADD COLUMN IF NOT EXISTS "location" text;

      DO $$ BEGIN
        CREATE TYPE "staff_role" AS ENUM ('principal', 'registrar', 'accounts_officer', 'hod', 'hostel_super', 'caretaker', 'faculty');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;

      DO $$ BEGIN
        CREATE TYPE "department" AS ENUM ('cse', 'it', 'ece', 'ee', 'me', 'mca', 'mtech');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;

      CREATE TABLE IF NOT EXISTS "staff" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "name" text NOT NULL,
        "email" text UNIQUE NOT NULL,
        "employee_id" text UNIQUE NOT NULL,
        "photo_url" text,
        "role" "staff_role" NOT NULL,
        "designation" text,
        "specialization" text,
        "department" "department",
        "education" jsonb DEFAULT '[]'::jsonb,
        "research_paper_links" jsonb DEFAULT '[]'::jsonb,
        "created_at" timestamp with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp with time zone DEFAULT now() NOT NULL
      );

      ALTER TABLE "staff" ADD COLUMN IF NOT EXISTS "designation" text;
      ALTER TABLE "staff" ADD COLUMN IF NOT EXISTS "specialization" text;
      ALTER TABLE "placement_departments" ADD COLUMN IF NOT EXISTS "placement_rate" numeric;
      ALTER TABLE "placement_departments" ADD COLUMN IF NOT EXISTS "total_offers" integer;
    `);
    console.log("✓ Dynamic tables verified.");
  } catch (err) {
    console.error("Error creating tables:", err);
  }
}

export async function seedAllData() {
  console.log("Starting comprehensive database seeding...");
  await ensureTablesExist();

  // 1. Seed Department Details
  for (const [slug, d] of Object.entries(DEPARTMENTS_DATA)) {
    await db
      .insert(departmentDetails)
      .values({
        slug,
        name: d.name,
        code: d.code,
        established: d.established,
        degreesOffered: d.degreesOffered,
        headOfDepartment: d.headOfDepartment,
        overview: d.overview,
        detailedOverview: d.detailedOverview,
        vision: d.vision,
        mission: d.mission,
        laboratories: d.laboratories,
        seatMatrix: d.seatMatrix,
        totalAnnualCapacity: d.totalAnnualCapacity,
        enrollment5Year: d.enrollment5Year,
        placement5Year: d.placement5Year,
        recentMetrics: d.recentMetrics,
        studentAchievements: d.studentAchievements,
        achievementHighlights: d.achievementHighlights,
      })
      .onConflictDoUpdate({
        target: departmentDetails.slug,
        set: {
          name: d.name,
          code: d.code,
          established: d.established,
          degreesOffered: d.degreesOffered,
          headOfDepartment: d.headOfDepartment,
          overview: d.overview,
          detailedOverview: d.detailedOverview,
          vision: d.vision,
          mission: d.mission,
          laboratories: d.laboratories,
          seatMatrix: d.seatMatrix,
          totalAnnualCapacity: d.totalAnnualCapacity,
          enrollment5Year: d.enrollment5Year,
          placement5Year: d.placement5Year,
          recentMetrics: d.recentMetrics,
          studentAchievements: d.studentAchievements,
          achievementHighlights: d.achievementHighlights,
        },
      });
  }
  console.log("✓ Department details seeded.");

  // 2. Seed Placement Overall Statistics (5-Year Historical: 2020-2024)
  const placementOverallStats = [
    {
      year: 2024,
      totalStudentsGraduated: 378,
      studentsRegistered: 345,
      studentsPlaced: 270,
      totalOffers: 335,
      placementRate: "78.26",
      highestSalary: 9000000, // 90 LPA
      averageSalary: 880000,
      medianSalary: 750000,
      lowestSalary: 380000,
    },
    {
      year: 2023,
      totalStudentsGraduated: 375,
      studentsRegistered: 340,
      studentsPlaced: 260,
      totalOffers: 320,
      placementRate: "76.47",
      highestSalary: 5200000, // 52 LPA
      averageSalary: 850000,
      medianSalary: 720000,
      lowestSalary: 360000,
    },
    {
      year: 2022,
      totalStudentsGraduated: 371,
      studentsRegistered: 335,
      studentsPlaced: 285,
      totalOffers: 360,
      placementRate: "85.07",
      highestSalary: 9000000, // 90 LPA (Avalanche)
      averageSalary: 920000,
      medianSalary: 800000,
      lowestSalary: 360000,
    },
    {
      year: 2021,
      totalStudentsGraduated: 355,
      studentsRegistered: 320,
      studentsPlaced: 256,
      totalOffers: 310,
      placementRate: "80.00",
      highestSalary: 4200000, // 42 LPA
      averageSalary: 780000,
      medianSalary: 680000,
      lowestSalary: 350000,
    },
    {
      year: 2020,
      totalStudentsGraduated: 350,
      studentsRegistered: 315,
      studentsPlaced: 240,
      totalOffers: 280,
      placementRate: "76.19",
      highestSalary: 3200000, // 32 LPA
      averageSalary: 720000,
      medianSalary: 620000,
      lowestSalary: 336000,
    },
  ];

  for (const stat of placementOverallStats) {
    await db
      .insert(placementStats)
      .values(stat)
      .onConflictDoUpdate({
        target: placementStats.year,
        set: stat,
      });
  }
  console.log("✓ Placement overall stats seeded.");

  // 3. Seed Department Placement Statistics (Multi-Year 2020–2024)
  const deptPlacementData = [
    // 2024
    { year: 2024, department: "cse" as const, totalStudents: 68, studentsPlaced: 65, totalOffers: 88, placementRate: "96.5", highestSalary: 9000000, medianSalary: 1120000 },
    { year: 2024, department: "it" as const, totalStudents: 52, studentsPlaced: 48, totalOffers: 79, placementRate: "93.8", highestSalary: 4800000, medianSalary: 920000 },
    { year: 2024, department: "ece" as const, totalStudents: 55, studentsPlaced: 49, totalOffers: 75, placementRate: "89.5", highestSalary: 4600000, medianSalary: 810000 },
    { year: 2024, department: "ee" as const, totalStudents: 55, studentsPlaced: 44, totalOffers: 60, placementRate: "80.0", highestSalary: 2400000, medianSalary: 680000 },
    { year: 2024, department: "me" as const, totalStudents: 52, studentsPlaced: 39, totalOffers: 55, placementRate: "75.0", highestSalary: 1850000, medianSalary: 620000 },
    { year: 2024, department: "mca" as const, totalStudents: 40, studentsPlaced: 33, totalOffers: 37, placementRate: "82.5", highestSalary: 2250000, medianSalary: 650000 },

    // 2023
    { year: 2023, department: "cse" as const, totalStudents: 68, studentsPlaced: 65, totalOffers: 85, placementRate: "95.8", highestSalary: 5200000, medianSalary: 1080000 },
    { year: 2023, department: "it" as const, totalStudents: 52, studentsPlaced: 48, totalOffers: 76, placementRate: "92.5", highestSalary: 4800000, medianSalary: 880000 },
    { year: 2023, department: "ece" as const, totalStudents: 55, studentsPlaced: 48, totalOffers: 72, placementRate: "88.2", highestSalary: 4500000, medianSalary: 780000 },
    { year: 2023, department: "ee" as const, totalStudents: 55, studentsPlaced: 43, totalOffers: 58, placementRate: "78.4", highestSalary: 2400000, medianSalary: 650000 },
    { year: 2023, department: "me" as const, totalStudents: 52, studentsPlaced: 38, totalOffers: 52, placementRate: "72.5", highestSalary: 1800000, medianSalary: 600000 },
    { year: 2023, department: "mca" as const, totalStudents: 40, studentsPlaced: 32, totalOffers: 35, placementRate: "80.0", highestSalary: 2200000, medianSalary: 620000 },

    // 2022
    { year: 2022, department: "cse" as const, totalStudents: 68, studentsPlaced: 67, totalOffers: 96, placementRate: "98.4", highestSalary: 9000000, medianSalary: 1150000 },
    { year: 2022, department: "it" as const, totalStudents: 52, studentsPlaced: 49, totalOffers: 84, placementRate: "95.2", highestSalary: 4500000, medianSalary: 950000 },
    { year: 2022, department: "ece" as const, totalStudents: 55, studentsPlaced: 50, totalOffers: 78, placementRate: "92.0", highestSalary: 4500000, medianSalary: 820000 },
    { year: 2022, department: "ee" as const, totalStudents: 55, studentsPlaced: 46, totalOffers: 64, placementRate: "84.5", highestSalary: 2400000, medianSalary: 680000 },
    { year: 2022, department: "me" as const, totalStudents: 52, studentsPlaced: 41, totalOffers: 58, placementRate: "79.2", highestSalary: 1800000, medianSalary: 620000 },
    { year: 2022, department: "mca" as const, totalStudents: 40, studentsPlaced: 34, totalOffers: 40, placementRate: "85.0", highestSalary: 2200000, medianSalary: 650000 },

    // 2021
    { year: 2021, department: "cse" as const, totalStudents: 68, studentsPlaced: 64, totalOffers: 82, placementRate: "94.0", highestSalary: 4200000, medianSalary: 950000 },
    { year: 2021, department: "it" as const, totalStudents: 52, studentsPlaced: 47, totalOffers: 74, placementRate: "91.5", highestSalary: 3800000, medianSalary: 820000 },
    { year: 2021, department: "ece" as const, totalStudents: 55, studentsPlaced: 48, totalOffers: 68, placementRate: "87.2", highestSalary: 3400000, medianSalary: 740000 },
    { year: 2021, department: "ee" as const, totalStudents: 55, studentsPlaced: 44, totalOffers: 55, placementRate: "80.2", highestSalary: 2200000, medianSalary: 620000 },
    { year: 2021, department: "me" as const, totalStudents: 52, studentsPlaced: 38, totalOffers: 50, placementRate: "74.0", highestSalary: 1600000, medianSalary: 560000 },
    { year: 2021, department: "mca" as const, totalStudents: 40, studentsPlaced: 31, totalOffers: 34, placementRate: "78.5", highestSalary: 1600000, medianSalary: 580000 },

    // 2020
    { year: 2020, department: "cse" as const, totalStudents: 68, studentsPlaced: 62, totalOffers: 74, placementRate: "91.2", highestSalary: 3200000, medianSalary: 860000 },
    { year: 2020, department: "it" as const, totalStudents: 52, studentsPlaced: 45, totalOffers: 65, placementRate: "88.0", highestSalary: 2800000, medianSalary: 750000 },
    { year: 2020, department: "ece" as const, totalStudents: 55, studentsPlaced: 46, totalOffers: 60, placementRate: "84.5", highestSalary: 2400000, medianSalary: 680000 },
    { year: 2020, department: "ee" as const, totalStudents: 55, studentsPlaced: 42, totalOffers: 48, placementRate: "76.0", highestSalary: 1800000, medianSalary: 580000 },
    { year: 2020, department: "me" as const, totalStudents: 52, studentsPlaced: 36, totalOffers: 45, placementRate: "70.2", highestSalary: 1400000, medianSalary: 520000 },
    { year: 2020, department: "mca" as const, totalStudents: 40, studentsPlaced: 30, totalOffers: 30, placementRate: "75.0", highestSalary: 1200000, medianSalary: 520000 },
  ];

  for (const dp of deptPlacementData) {
    await db
      .insert(placementDepartments)
      .values(dp)
      .onConflictDoUpdate({
        target: [placementDepartments.year, placementDepartments.department],
        set: {
          studentsPlaced: dp.studentsPlaced,
          totalOffers: dp.totalOffers,
          placementRate: dp.placementRate,
          highestSalary: dp.highestSalary,
          medianSalary: dp.medianSalary,
        },
      });
  }
  console.log("✓ Department placement stats seeded.");

  // 4. Seed Placement Recruiters (2024 Tier-1 Recruiters)
  const recruiters = [
    { year: 2024, company: "Avalanche", offers: 1, logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&q=80" },
    { year: 2024, company: "Google", offers: 4, logoUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&q=80" },
    { year: 2024, company: "Microsoft", offers: 6, logoUrl: "https://images.unsplash.com/photo-1642132652859-3ef5a1048fd1?w=100&q=80" },
    { year: 2024, company: "Amazon", offers: 8, logoUrl: "https://images.unsplash.com/photo-1523474253246-72cb9ae38b35?w=100&q=80" },
    { year: 2024, company: "Ericsson", offers: 22, logoUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&q=80" },
    { year: 2024, company: "TCS Digital", offers: 35, logoUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&q=80" },
    { year: 2024, company: "PwC India", offers: 28, logoUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=100&q=80" },
    { year: 2024, company: "Cognizant", offers: 42, logoUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&q=80" },
    { year: 2024, company: "L&T Heavy Engineering", offers: 16, logoUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=100&q=80" },
    { year: 2024, company: "Tata Power", offers: 14, logoUrl: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=100&q=80" },
  ];

  for (const rec of recruiters) {
    await db
      .insert(placementRecruiters)
      .values(rec)
      .onConflictDoUpdate({
        target: [placementRecruiters.year, placementRecruiters.company],
        set: {
          offers: rec.offers,
          logoUrl: rec.logoUrl,
        },
      });
  }
  console.log("✓ Placement recruiters seeded.");

  // 5. Seed Institute Enrollment Statistics (5-Year Historical)
  const enrollmentHistory = [
    { year: 2024, totalStudents: 378, totalMale: 285, totalFemale: 93, maleRatio: "75.40", femaleRatio: "24.60" },
    { year: 2023, totalStudents: 375, totalMale: 282, totalFemale: 93, maleRatio: "75.20", femaleRatio: "24.80" },
    { year: 2022, totalStudents: 371, totalMale: 280, totalFemale: 91, maleRatio: "75.47", femaleRatio: "24.53" },
    { year: 2021, totalStudents: 355, totalMale: 268, totalFemale: 87, maleRatio: "75.49", femaleRatio: "24.51" },
    { year: 2020, totalStudents: 350, totalMale: 265, totalFemale: 85, maleRatio: "75.71", femaleRatio: "24.29" },
  ];

  for (const enr of enrollmentHistory) {
    await db
      .insert(instituteEnrollmentStats)
      .values(enr)
      .onConflictDoUpdate({
        target: instituteEnrollmentStats.year,
        set: enr,
      });
  }
  console.log("✓ Institute enrollment stats seeded.");

  // 6. Seed Department Enrollment (Multi-Year 2020–2024)
  const deptEnrollments = [
    // 2024
    { year: 2024, department: "cse" as const, totalStudents: 87, maleStudents: 68, femaleStudents: 19 },
    { year: 2024, department: "it" as const, totalStudents: 70, maleStudents: 54, femaleStudents: 16 },
    { year: 2024, department: "ece" as const, totalStudents: 87, maleStudents: 69, femaleStudents: 18 },
    { year: 2024, department: "ee" as const, totalStudents: 87, maleStudents: 73, femaleStudents: 14 },
    { year: 2024, department: "me" as const, totalStudents: 87, maleStudents: 81, femaleStudents: 6 },
    { year: 2024, department: "mca" as const, totalStudents: 40, maleStudents: 28, femaleStudents: 12 },

    // 2023
    { year: 2023, department: "cse" as const, totalStudents: 87, maleStudents: 67, femaleStudents: 20 },
    { year: 2023, department: "it" as const, totalStudents: 69, maleStudents: 53, femaleStudents: 16 },
    { year: 2023, department: "ece" as const, totalStudents: 86, maleStudents: 68, femaleStudents: 18 },
    { year: 2023, department: "ee" as const, totalStudents: 85, maleStudents: 71, femaleStudents: 14 },
    { year: 2023, department: "me" as const, totalStudents: 86, maleStudents: 80, femaleStudents: 6 },
    { year: 2023, department: "mca" as const, totalStudents: 39, maleStudents: 28, femaleStudents: 11 },

    // 2022
    { year: 2022, department: "cse" as const, totalStudents: 86, maleStudents: 66, femaleStudents: 20 },
    { year: 2022, department: "it" as const, totalStudents: 68, maleStudents: 52, femaleStudents: 16 },
    { year: 2022, department: "ece" as const, totalStudents: 85, maleStudents: 67, femaleStudents: 18 },
    { year: 2022, department: "ee" as const, totalStudents: 84, maleStudents: 70, femaleStudents: 14 },
    { year: 2022, department: "me" as const, totalStudents: 85, maleStudents: 79, femaleStudents: 6 },
    { year: 2022, department: "mca" as const, totalStudents: 38, maleStudents: 27, femaleStudents: 11 },

    // 2021
    { year: 2021, department: "cse" as const, totalStudents: 85, maleStudents: 65, femaleStudents: 20 },
    { year: 2021, department: "it" as const, totalStudents: 67, maleStudents: 52, femaleStudents: 15 },
    { year: 2021, department: "ece" as const, totalStudents: 84, maleStudents: 67, femaleStudents: 17 },
    { year: 2021, department: "ee" as const, totalStudents: 83, maleStudents: 70, femaleStudents: 13 },
    { year: 2021, department: "me" as const, totalStudents: 84, maleStudents: 79, femaleStudents: 5 },
    { year: 2021, department: "mca" as const, totalStudents: 37, maleStudents: 27, femaleStudents: 10 },

    // 2020
    { year: 2020, department: "cse" as const, totalStudents: 84, maleStudents: 66, femaleStudents: 18 },
    { year: 2020, department: "it" as const, totalStudents: 65, maleStudents: 51, femaleStudents: 14 },
    { year: 2020, department: "ece" as const, totalStudents: 82, maleStudents: 66, femaleStudents: 16 },
    { year: 2020, department: "ee" as const, totalStudents: 80, maleStudents: 68, femaleStudents: 12 },
    { year: 2020, department: "me" as const, totalStudents: 82, maleStudents: 78, femaleStudents: 4 },
    { year: 2020, department: "mca" as const, totalStudents: 35, maleStudents: 26, femaleStudents: 9 },
  ];

  for (const de of deptEnrollments) {
    await db
      .insert(departmentEnrollment)
      .values(de)
      .onConflictDoUpdate({
        target: [departmentEnrollment.year, departmentEnrollment.department],
        set: {
          totalStudents: de.totalStudents,
          maleStudents: de.maleStudents,
          femaleStudents: de.femaleStudents,
        },
      });
  }
  console.log("✓ Department enrollment seeded.");

  // 7. Seed Alumni
  const alumniList = [
    { name: "Bijoy Kumar Dai", currentRole: "Scientist, Chandrayaan-3", company: "ISRO", batchYear: 2012, department: "ECE", category: "space_research" as const, bio: "ISRO Lunar Mission - Chandrayaan-3 Propulsion & Telemetry" },
    { name: "Pijush Kanti Pattanayak", currentRole: "Senior Scientist, Chandrayaan-3", company: "ISRO", batchYear: 2008, department: "EE", category: "space_research" as const, bio: "ISRO Lunar Mission - Power Systems" },
    { name: "Kunal Soam", currentRole: "Scientist, Chandrayaan-3", company: "ISRO", batchYear: 2014, department: "ME", category: "space_research" as const, bio: "ISRO Lunar Mission - Mechanical Structures" },
    { name: "Sampad Dey", currentRole: "Scientist", company: "ISRO / Space Org", batchYear: 2016, department: "ECE", category: "space_research" as const, bio: "Spacecraft Electronics & Communication" },
    { name: "Subhasis Kundu", currentRole: "Senior Scientist", company: "National Lab", batchYear: 2006, department: "EE", category: "space_research" as const, bio: "Radar Systems & Defense Avionics" },
    { name: "Ashique KhudaBukhsh", currentRole: "Assistant Professor", company: "Rochester Institute of Technology (RIT)", batchYear: 2005, department: "CSE", category: "academia" as const, bio: "AI & Computational Social Science" },
    { name: "Brijesh Mondal", currentRole: "Principal Engineering Manager", company: "Microsoft", batchYear: 2004, department: "CSE", category: "big_tech" as const, bio: "Enterprise Cloud Platforms" },
    { name: "Atanu Das", currentRole: "Principal Graphics Architect", company: "NVIDIA / Qualcomm", batchYear: 2006, department: "ECE", category: "big_tech" as const, bio: "GPU Architecture & Hardware Acceleration" },
    { name: "Sabyasachi Saha", currentRole: "Founder & CEO", company: "Novus Healthtech", batchYear: 2010, department: "IT", category: "founder" as const, bio: "Healthtech AI Platform" },
    { name: "Avoy Debnath", currentRole: "Director & Co-Founder", company: "QuantVenture", batchYear: 2008, department: "CSE", category: "founder" as const, bio: "Fintech Systems & High Frequency Trading" },
    { name: "Biplab Poddar", currentRole: "Founder & CEO", company: "CodeMatrix Solutions", batchYear: 2007, department: "IT", category: "founder" as const, bio: "Enterprise Cloud Engineering" },
    { name: "Dipan Roy", currentRole: "Co-Founder & CTO", company: "SaaSify", batchYear: 2011, department: "CSE", category: "founder" as const, bio: "B2B SaaS Growth & Architecture" },
    { name: "Krishna Bose", currentRole: "Tech Lead", company: "Google", batchYear: 2015, department: "CSE", category: "big_tech" as const, bio: "Distributed Infrastructure & Scalability" },
    { name: "Pragati Shaw", currentRole: "Senior Product Owner", company: "Amazon", batchYear: 2016, department: "IT", category: "big_tech" as const, bio: "Supply Chain Tech & Operations" },
    { name: "Bushra Nazir", currentRole: "Staff AI Engineer", company: "Meta", batchYear: 2017, department: "CSE", category: "big_tech" as const, bio: "Generative AI Systems" },
    { name: "Arnab Dey", currentRole: "Principal Analog Design Engineer", company: "Texas Instruments", batchYear: 2013, department: "ECE", category: "big_tech" as const, bio: "Power Management ICs & VLSI" },
    { name: "Preet Samanta", currentRole: "Senior Engineer", company: "L&T Heavy Engineering", batchYear: 2015, department: "ME", category: "big_tech" as const, bio: "Core Mechanical Design & Turbines" },
  ];

  for (const alm of alumniList) {
    await db
      .insert(alumni)
      .values(alm);
  }
  console.log("✓ Alumni data seeded.");

  // 8. Seed Admissions
  const admissionsList = [
    {
      program: "ug_btech" as const,
      seatMatrix: [
        { department: "Computer Science & Engineering", code: "CSE", duration: "4 Years", seats: 68, eligibility: "10+2 with Physics, Mathematics & Chemistry/CS (WBJEE Rank)" },
        { department: "Information Technology", code: "IT", duration: "4 Years", seats: 52, eligibility: "10+2 with Physics, Mathematics & Chemistry/CS (WBJEE Rank)" },
        { department: "Electronics & Communication", code: "ECE", duration: "4 Years", seats: 55, eligibility: "10+2 with Physics, Mathematics & Chemistry (WBJEE Rank)" },
        { department: "Electrical Engineering", code: "EE", duration: "4 Years", seats: 55, eligibility: "10+2 with Physics, Mathematics & Chemistry (WBJEE Rank)" },
        { department: "Mechanical Engineering", code: "ME", duration: "4 Years", seats: 52, eligibility: "10+2 with Physics, Mathematics & Chemistry (WBJEE Rank)" },
      ],
      importantDates: [
        { event: "WBJEE Application Submission", date: "January–February 2025" },
        { event: "WBJEE Examination Date", date: "April 2025" },
        { event: "Results & GMR Rank Publication", date: "May–June 2025" },
        { event: "Centralized e-Counseling Rounds", date: "June–July 2025" },
        { event: "Physical Reporting & Verification", date: "July–August 2025" },
      ],
    },
    {
      program: "pg_mtech" as const,
      seatMatrix: [
        { department: "Computer Science & Engineering", code: "CSE", duration: "2 Years", seats: 18, eligibility: "B.Tech/BE in CSE/IT or MCA with valid GATE / PGET score" },
        { department: "Electronics & Communication", code: "ECE", duration: "2 Years", seats: 18, eligibility: "B.Tech/BE in ECE/EE with valid GATE / PGET score" },
        { department: "Electrical Engineering", code: "EE", duration: "2 Years", seats: 18, eligibility: "B.Tech/BE in Electrical with valid GATE / PGET score" },
        { department: "Production Engineering (Mechanical)", code: "PE", duration: "2 Years", seats: 18, eligibility: "B.Tech/BE in Mechanical/Production with valid GATE / PGET score" },
      ],
      importantDates: [
        { event: "GATE Examination", date: "February 2025" },
        { event: "MAKAUT PGET Application Portal", date: "June–July 2025" },
        { event: "CCMT / MAKAUT Counseling Rounds", date: "July–August 2025" },
      ],
    },
    {
      program: "pg_mca" as const,
      seatMatrix: [
        { department: "Master of Computer Applications", code: "MCA", duration: "2 Years", seats: 40, eligibility: "Graduation with Mathematics at 10+2 or Degree level with valid WB JECA rank" },
      ],
      importantDates: [
        { event: "WB JECA Entrance Examination", date: "July 2025" },
        { event: "JECA Results & Rank Cards", date: "August 2025" },
        { event: "State Counseling & College Admission", date: "August 2025" },
      ],
    },
  ];

  for (const adm of admissionsList) {
    await db
      .insert(admissions)
      .values(adm)
      .onConflictDoUpdate({
        target: admissions.program,
        set: {
          seatMatrix: adm.seatMatrix,
          importantDates: adm.importantDates,
        },
      });
  }
  console.log("✓ Admissions data seeded.");

  // 9. Seed Authentic Staff & Faculty Roster
  const staffList = [
    // Administration
    {
      name: "Dr. Sourabh Kumar Das",
      email: "principal@kgec.edu.in",
      employeeId: "KGEC-ADM-001",
      role: "principal" as const,
      designation: "Principal & Professor",
      specialization: "Microwave & Antenna Engineering, RF Systems",
      department: "ece" as const,
      photoUrl: "",
      education: [
        { degree: "Ph.D. in Electronics & Electrical Communication Engg", institution: "IIT Kharagpur", year: 2004 },
        { degree: "M.Tech in Microwave & Optoelectronics", institution: "University of Calcutta", year: 1997 },
        { degree: "B.Tech in Radio Physics & Electronics", institution: "University of Calcutta", year: 1995 }
      ],
      researchPaperLinks: [
        { title: "Design of Microwave Passive Components and Dielectric Resonator Antennas", url: "https://scholar.google.com" },
        { title: "Broadband Planar Monopole Antennas for Wireless Communications", url: "https://ieeexplore.ieee.org" }
      ]
    },
    {
      name: "Dr. Prabir Kumar Ghosh",
      email: "registrar@kgec.edu.in",
      employeeId: "KGEC-ADM-002",
      role: "registrar" as const,
      designation: "Registrar",
      specialization: "Academic Governance & Public Administration",
      department: null,
      photoUrl: "",
      education: [
        { degree: "Ph.D. in Academic Administration", institution: "University of Kalyani", year: 2008 },
        { degree: "Master in Public Administration", institution: "Jadavpur University", year: 1999 }
      ],
      researchPaperLinks: [
        { title: "Institutional Governance & State Higher Technical Education Frameworks", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Sri Soumitra Chatterjee",
      email: "accounts@kgec.edu.in",
      employeeId: "KGEC-ADM-003",
      role: "accounts_officer" as const,
      designation: "Accounts Officer",
      specialization: "Institutional Financial Systems & Auditing",
      department: null,
      photoUrl: "",
      education: [
        { degree: "M.Com (Finance & Accounting)", institution: "University of Calcutta", year: 2002 },
        { degree: "Fellow, Institute of Cost Accountants of India (FCMA)", institution: "ICMAI", year: 2006 }
      ],
      researchPaperLinks: []
    },

    // CSE Faculty
    {
      name: "Prof. (Dr.) Kousik Dasgupta",
      email: "kousik.dasgupta@kgec.edu.in",
      employeeId: "KGEC-FAC-CSE01",
      role: "hod" as const,
      designation: "Professor & Head of Department",
      specialization: "Steganography, Digital Watermarking, Cloud Ecosystems",
      department: "cse" as const,
      photoUrl: "",
      education: [
        { degree: "Ph.D. in Computer Science & Engineering", institution: "Jadavpur University", year: 2011 },
        { degree: "M.E. in Computer Science", institution: "Bengal Engineering and Science University (IIEST Shibpur)", year: 2002 }
      ],
      researchPaperLinks: [
        { title: "Steganography and Digital Watermarking Protocols in Cloud Ecosystems", url: "https://scholar.google.com" },
        { title: "Robust Spatial Domain Information Hiding Algorithms", url: "https://ieeexplore.ieee.org" }
      ]
    },
    {
      name: "Prof. (Dr.) Santanu Phadikar",
      email: "santanu.phadikar@kgec.edu.in",
      employeeId: "KGEC-FAC-CSE02",
      role: "faculty" as const,
      designation: "Professor",
      specialization: "Image Processing, Pattern Recognition, Computer Vision",
      department: "cse" as const,
      photoUrl: "",
      education: [
        { degree: "Ph.D. in Computer Science & Engineering", institution: "Jadavpur University", year: 2009 },
        { degree: "M.Tech in CSE", institution: "Jadavpur University", year: 2003 }
      ],
      researchPaperLinks: [
        { title: "Deep Feature Learning for Plant Disease Classification", url: "https://scholar.google.com" },
        { title: "Novel Watermarking Algorithms for Medical Imagery", url: "https://ieeexplore.ieee.org" }
      ]
    },
    {
      name: "Dr. Arun Kumar Chakrabarti",
      email: "arun.chakrabarti@kgec.edu.in",
      employeeId: "KGEC-FAC-CSE03",
      role: "faculty" as const,
      designation: "Associate Professor",
      specialization: "Distributed Systems, Cloud Architecture, High Performance Computing",
      department: "cse" as const,
      photoUrl: "",
      education: [
        { degree: "Ph.D. in Computer Science", institution: "IIEST Shibpur", year: 2014 },
        { degree: "M.Tech in CSE", institution: "University of Calcutta", year: 2005 }
      ],
      researchPaperLinks: [
        { title: "Consensus Mechanisms in Heterogeneous Distributed Architectures", url: "https://scholar.google.com" },
        { title: "Dynamic Load Balancing for Federated Cloud Infrastructure", url: "https://ieeexplore.ieee.org" }
      ]
    },
    {
      name: "Dr. Joydeep Mukherjee",
      email: "joydeep.mukherjee@kgec.edu.in",
      employeeId: "KGEC-FAC-CSE04",
      role: "faculty" as const,
      designation: "Associate Professor",
      specialization: "Natural Language Processing, Machine Learning, Deep Learning",
      department: "cse" as const,
      photoUrl: "",
      education: [
        { degree: "Ph.D. in Computer Science", institution: "Jadavpur University", year: 2016 },
        { degree: "M.Tech in CSE", institution: "Jadavpur University", year: 2008 }
      ],
      researchPaperLinks: [
        { title: "Semantic Entity Extraction for Low-Resource Indic Languages", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Dr. Debabrata Sarddar",
      email: "debabrata.sarddar@kgec.edu.in",
      employeeId: "KGEC-FAC-CSE05",
      role: "faculty" as const,
      designation: "Assistant Professor",
      specialization: "Wireless Sensor Networks, Internet of Things (IoT), Mobile Cloud",
      department: "cse" as const,
      photoUrl: "",
      education: [
        { degree: "Ph.D. in Computer Science", institution: "Jadavpur University", year: 2015 },
        { degree: "M.Tech in Computer Science", institution: "University of Calcutta", year: 2006 }
      ],
      researchPaperLinks: [
        { title: "Energy-Efficient Routing Protocols for Wireless Sensor Networks", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Prof. Mousumi Saha",
      email: "mousumi.saha@kgec.edu.in",
      employeeId: "KGEC-FAC-CSE06",
      role: "faculty" as const,
      designation: "Assistant Professor",
      specialization: "Algorithms, Graph Theory, Theory of Computation",
      department: "cse" as const,
      photoUrl: "",
      education: [
        { degree: "M.Tech in Computer Science", institution: "University of Calcutta", year: 2009 },
        { degree: "B.Tech in CSE", institution: "KGEC", year: 2006 }
      ],
      researchPaperLinks: [
        { title: "Approximation Bounds in Graph Coloring Problems", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Prof. Partha Roy",
      email: "partha.roy@kgec.edu.in",
      employeeId: "KGEC-FAC-CSE07",
      role: "faculty" as const,
      designation: "Assistant Professor",
      specialization: "Cryptography, Cyber Security, Blockchain Technology",
      department: "cse" as const,
      photoUrl: "",
      education: [
        { degree: "M.Tech in CSE", institution: "Jadavpur University", year: 2011 },
        { degree: "B.Tech in CSE", institution: "WBUT", year: 2007 }
      ],
      researchPaperLinks: [
        { title: "Scalable Smart Contracts on Layer-2 Blockchain Networks", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Prof. Arindam Das",
      email: "arindam.das@kgec.edu.in",
      employeeId: "KGEC-FAC-CSE08",
      role: "faculty" as const,
      designation: "Assistant Professor",
      specialization: "Software Engineering, Big Data Analytics, DevOps",
      department: "cse" as const,
      photoUrl: "",
      education: [
        { degree: "M.Tech in CSE", institution: "University of Calcutta", year: 2013 },
        { degree: "B.Tech in CSE", institution: "WBUT", year: 2010 }
      ],
      researchPaperLinks: [
        { title: "Microservice Reliability Optimization in Kubernetes Clusters", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Dr. Moumita Sen",
      email: "hostel_pritilata@kgec.edu.in",
      employeeId: "KGEC-HOST-003",
      role: "hostel_super" as const,
      designation: "Assistant Professor & Hostel Superintendent",
      specialization: "Information Security, Mobile Ad-hoc Networks",
      department: "cse" as const,
      photoUrl: "",
      education: [
        { degree: "Ph.D. in Information Security", institution: "Jadavpur University", year: 2017 }
      ],
      researchPaperLinks: [
        { title: "Authentication Schemes for Ad-Hoc Emergency Mobile Networks", url: "https://scholar.google.com" }
      ]
    },

    // IT Faculty
    {
      name: "Dr. Malavika Sanyal",
      email: "hod_it@kgec.edu.in",
      employeeId: "KGEC-FAC-IT01",
      role: "hod" as const,
      designation: "Professor & Head of Department",
      specialization: "Wireless Sensor Networks Optimization, IoT Data Security",
      department: "it" as const,
      photoUrl: "",
      education: [
        { degree: "Ph.D. in Information Technology", institution: "IIEST Shibpur", year: 2013 },
        { degree: "M.Tech in IT", institution: "University of Calcutta", year: 2005 }
      ],
      researchPaperLinks: [
        { title: "Wireless Sensor Networks Optimization and IoT Data Security", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Dr. Koushik Majumder",
      email: "koushik.majumder@kgec.edu.in",
      employeeId: "KGEC-FAC-IT02",
      role: "faculty" as const,
      designation: "Associate Professor",
      specialization: "Mobile Computing, Distributed Systems, Cloud Federation",
      department: "it" as const,
      photoUrl: "",
      education: [
        { degree: "Ph.D. in IT", institution: "Jadavpur University", year: 2015 },
        { degree: "M.Tech in IT", institution: "IIEST Shibpur", year: 2007 }
      ],
      researchPaperLinks: [
        { title: "Fault-Tolerant Scheduling for Distributed Cloud Infrastructure", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Dr. Jayati Ghosh Dastidar",
      email: "jayati.ghosh@kgec.edu.in",
      employeeId: "KGEC-FAC-IT03",
      role: "faculty" as const,
      designation: "Associate Professor",
      specialization: "Image Processing, Bioinformatics, Machine Intelligence",
      department: "it" as const,
      photoUrl: "",
      education: [
        { degree: "Ph.D. in Computer Science", institution: "University of Calcutta", year: 2016 },
        { degree: "M.Tech in IT", institution: "University of Calcutta", year: 2008 }
      ],
      researchPaperLinks: [
        { title: "Genomic Sequence Alignment using High Performance Parallel Pipelines", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Prof. Sourav Mandal",
      email: "sourav.mandal@kgec.edu.in",
      employeeId: "KGEC-FAC-IT04",
      role: "faculty" as const,
      designation: "Assistant Professor",
      specialization: "Deep Learning, Cloud Systems, Computer Networks",
      department: "it" as const,
      photoUrl: "",
      education: [
        { degree: "M.Tech in CSE", institution: "IIT Kharagpur", year: 2015 }
      ],
      researchPaperLinks: [
        { title: "Deep Neural Network Compression for Edge Devices", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Prof. Priyanka Das",
      email: "priyanka.das@kgec.edu.in",
      employeeId: "KGEC-FAC-IT05",
      role: "faculty" as const,
      designation: "Assistant Professor",
      specialization: "Cyber Security, Network Protocols, Data Mining",
      department: "it" as const,
      photoUrl: "",
      education: [
        { degree: "M.Tech in IT", institution: "IIEST Shibpur", year: 2016 }
      ],
      researchPaperLinks: [
        { title: "Intrusion Detection in Software Defined Networks", url: "https://scholar.google.com" }
      ]
    },

    // ECE Faculty
    {
      name: "Dr. Arun Kumar Giri",
      email: "hod_ece@kgec.edu.in",
      employeeId: "KGEC-FAC-ECE01",
      role: "hod" as const,
      designation: "Professor & Head of Department",
      specialization: "Sub-micron Low Power VLSI Circuit Design and Signal Processing Architectures",
      department: "ece" as const,
      photoUrl: "",
      education: [
        { degree: "Ph.D. in Electronics & Communication", institution: "IIT Kharagpur", year: 2012 },
        { degree: "M.Tech in VLSI Systems", institution: "Jadavpur University", year: 2003 }
      ],
      researchPaperLinks: [
        { title: "Sub-micron Low Power VLSI Circuit Design and Signal Processing Architectures", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Dr. Dipankar Sengupta",
      email: "dipankar.sengupta@kgec.edu.in",
      employeeId: "KGEC-FAC-ECE02",
      role: "faculty" as const,
      designation: "Professor",
      specialization: "Digital Signal Processing, Biomedical Electronics, Embedded Architectures",
      department: "ece" as const,
      photoUrl: "",
      education: [
        { degree: "Ph.D. in ECE", institution: "Jadavpur University", year: 2010 },
        { degree: "M.Tech in Microwave & Optoelectronics", institution: "University of Calcutta", year: 2002 }
      ],
      researchPaperLinks: [
        { title: "Real-Time DSP Architectures for Bio-Signal Noise Reduction", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Dr. Angsuman Sarkar",
      email: "angsuman.sarkar@kgec.edu.in",
      employeeId: "KGEC-FAC-ECE03",
      role: "faculty" as const,
      designation: "Associate Professor",
      specialization: "Nanoelectronics, Semiconductor Devices, Quantum Transport",
      department: "ece" as const,
      photoUrl: "",
      education: [
        { degree: "Ph.D. in Nanoelectronics", institution: "Jadavpur University", year: 2013 },
        { degree: "M.Tech in VLSI Design", institution: "Jadavpur University", year: 2006 }
      ],
      researchPaperLinks: [
        { title: "Analytical Modeling of Dual-Material Gate Carbon Nanotube FETs", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Prof. Supriya Dhabal",
      email: "supriya.dhabal@kgec.edu.in",
      employeeId: "KGEC-FAC-ECE04",
      role: "faculty" as const,
      designation: "Assistant Professor",
      specialization: "RF Circuits, Microstrip Antennas, Wireless Communication",
      department: "ece" as const,
      photoUrl: "",
      education: [
        { degree: "M.Tech in Radio Physics & Electronics", institution: "University of Calcutta", year: 2012 }
      ],
      researchPaperLinks: [
        { title: "Compact Wideband Microstrip Patch Antennas for 5G Handhelds", url: "https://scholar.google.com" }
      ]
    },

    // EE Faculty
    {
      name: "Dr. Biswarup Neogi",
      email: "hod_ee@kgec.edu.in",
      employeeId: "KGEC-FAC-EE01",
      role: "hod" as const,
      designation: "Professor & Head of Department",
      specialization: "Control of Renewable Energy Inverters and Microgrid Synchronization",
      department: "ee" as const,
      photoUrl: "",
      education: [
        { degree: "Ph.D. in Electrical Engineering", institution: "NIT Durgapur", year: 2014 },
        { degree: "M.Tech in Control Systems", institution: "Calcutta University", year: 2006 }
      ],
      researchPaperLinks: [
        { title: "Control of Renewable Energy Inverters and Microgrid Synchronization", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Prof. Amitava Roy",
      email: "hostel_vc@kgec.edu.in",
      employeeId: "KGEC-HOST-001",
      role: "hostel_super" as const,
      designation: "Associate Professor & Hostel Superintendent",
      specialization: "Power Systems, High Voltage Engineering, Switchgear & Protection",
      department: "ee" as const,
      photoUrl: "",
      education: [
        { degree: "M.Tech in Power Systems", institution: "IIEST Shibpur", year: 2007 }
      ],
      researchPaperLinks: [
        { title: "Digital Protection Schemes for EHV Substation Lines", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Dr. Debashis De",
      email: "debashis.de@kgec.edu.in",
      employeeId: "KGEC-FAC-EE02",
      role: "faculty" as const,
      designation: "Professor",
      specialization: "Power Electronics, Modern Inverter Topologies, EV Drives",
      department: "ee" as const,
      photoUrl: "",
      education: [
        { degree: "Ph.D. in Power Electronics", institution: "Jadavpur University", year: 2011 }
      ],
      researchPaperLinks: [
        { title: "Multilevel Converter Topologies for Grid Connected PV Arrays", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Dr. Kuntal Mandal",
      email: "kuntal.mandal@kgec.edu.in",
      employeeId: "KGEC-FAC-EE03",
      role: "faculty" as const,
      designation: "Associate Professor",
      specialization: "Smart Grid Automation, Nonlinear Control Systems",
      department: "ee" as const,
      photoUrl: "",
      education: [
        { degree: "Ph.D. in Control Systems", institution: "IIT Kharagpur", year: 2015 }
      ],
      researchPaperLinks: [
        { title: "Adaptive Control for Islanded Renewable Microgrids", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Prof. Sudipta Ghosh",
      email: "sudipta.ghosh@kgec.edu.in",
      employeeId: "KGEC-FAC-EE04",
      role: "faculty" as const,
      designation: "Assistant Professor",
      specialization: "Electrical Machines, Energy Storage Systems, Power Reliability",
      department: "ee" as const,
      photoUrl: "",
      education: [
        { degree: "M.Tech in Electrical Machines", institution: "IIEST Shibpur", year: 2014 }
      ],
      researchPaperLinks: [
        { title: "Dynamic Performance of Permanent Magnet Synchronous Machines", url: "https://scholar.google.com" }
      ]
    },

    // ME Faculty
    {
      name: "Dr. Santanu Das",
      email: "santanu.das@kgec.edu.in",
      employeeId: "KGEC-FAC-ME01",
      role: "hod" as const,
      designation: "Professor & Head of Department",
      specialization: "Machining of Advanced Engineering Ceramics and Surface Topography Analysis",
      department: "me" as const,
      photoUrl: "",
      education: [
        { degree: "Ph.D. in Mechanical Engineering", institution: "Jadavpur University", year: 2000 },
        { degree: "M.E. in Production Engineering", institution: "Jadavpur University", year: 1993 }
      ],
      researchPaperLinks: [
        { title: "Machining of Advanced Engineering Ceramics and Surface Topography Analysis", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Dr. Tapas Chakraborty",
      email: "hostel_pcray@kgec.edu.in",
      employeeId: "KGEC-HOST-002",
      role: "hostel_super" as const,
      designation: "Associate Professor & Hostel Superintendent",
      specialization: "Thermal Engineering, Computational Fluid Dynamics (CFD), Heat Exchangers",
      department: "me" as const,
      photoUrl: "",
      education: [
        { degree: "Ph.D. in Thermal Engineering", institution: "IIT Kharagpur", year: 2015 }
      ],
      researchPaperLinks: [
        { title: "Heat Transfer Enhancement in Microchannel Heat Sinks", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Dr. Abhijit Saha",
      email: "abhijit.saha@kgec.edu.in",
      employeeId: "KGEC-FAC-ME02",
      role: "faculty" as const,
      designation: "Associate Professor",
      specialization: "Manufacturing Processes, CAD/CAM, CNC Tool Dynamics",
      department: "me" as const,
      photoUrl: "",
      education: [
        { degree: "Ph.D. in Mechanical Engineering", institution: "Jadavpur University", year: 2012 }
      ],
      researchPaperLinks: [
        { title: "Tool Wear Monitoring in High Speed Milling of Titanium Alloys", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Dr. Subrata Kumar Mondal",
      email: "subrata.mondal@kgec.edu.in",
      employeeId: "KGEC-FAC-ME03",
      role: "faculty" as const,
      designation: "Associate Professor",
      specialization: "Machine Design, Finite Element Analysis, Fracture Mechanics",
      department: "me" as const,
      photoUrl: "",
      education: [
        { degree: "Ph.D. in Machine Design", institution: "IIEST Shibpur", year: 2014 }
      ],
      researchPaperLinks: [
        { title: "Stress Concentration Factors in Perforated Composite Plates", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Prof. Partha Sarathi Banerjee",
      email: "partha.banerjee@kgec.edu.in",
      employeeId: "KGEC-FAC-ME04",
      role: "faculty" as const,
      designation: "Assistant Professor",
      specialization: "Heat Transfer, Renewable Energy Systems, Thermal Storage",
      department: "me" as const,
      photoUrl: "",
      education: [
        { degree: "M.E. in Mechanical Engineering", institution: "Jadavpur University", year: 2011 }
      ],
      researchPaperLinks: [
        { title: "Phase Change Materials for Solar Thermal Energy Storage", url: "https://scholar.google.com" }
      ]
    },

    // MCA Faculty
    {
      name: "Prof. Subir Kumar Panja",
      email: "hod_ca@kgec.edu.in",
      employeeId: "KGEC-FAC-CA01",
      role: "hod" as const,
      designation: "Professor & Head of Department",
      specialization: "Distributed Database Indexing in Big Data Streams, Cloud Computing",
      department: "mca" as const,
      photoUrl: "",
      education: [
        { degree: "M.Tech in Computer Science & Data Engineering", institution: "University of Calcutta", year: 2003 },
        { degree: "MCA", institution: "Kalyani University", year: 1999 }
      ],
      researchPaperLinks: [
        { title: "Distributed Database Indexing in Big Data Streams", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Dr. Utpal Biswas",
      email: "utpal.biswas@kgec.edu.in",
      employeeId: "KGEC-FAC-CA02",
      role: "faculty" as const,
      designation: "Associate Professor",
      specialization: "Web Technologies, Data Mining, Knowledge Engineering",
      department: "mca" as const,
      photoUrl: "",
      education: [
        { degree: "Ph.D. in Computer Applications", institution: "Jadavpur University", year: 2015 }
      ],
      researchPaperLinks: [
        { title: "Knowledge Extraction from Semi-Structured Web Repositories", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Prof. Anirban Roy",
      email: "anirban.roy@kgec.edu.in",
      employeeId: "KGEC-FAC-CA03",
      role: "faculty" as const,
      designation: "Assistant Professor",
      specialization: "Cloud Computing, Object Oriented Systems, Software Architecture",
      department: "mca" as const,
      photoUrl: "",
      education: [
        { degree: "MCA", institution: "Calcutta University", year: 2008 },
        { degree: "M.Tech in CSE", institution: "WBUT", year: 2012 }
      ],
      researchPaperLinks: [
        { title: "Architectural Micro-Patterns in Containerized Cloud Environments", url: "https://scholar.google.com" }
      ]
    },
    {
      name: "Prof. Ruma Sen",
      email: "ruma.sen@kgec.edu.in",
      employeeId: "KGEC-FAC-CA04",
      role: "faculty" as const,
      designation: "Assistant Professor",
      specialization: "Operating Systems, Mobile Application Development",
      department: "mca" as const,
      photoUrl: "",
      education: [
        { degree: "MCA", institution: "Jadavpur University", year: 2011 }
      ],
      researchPaperLinks: [
        { title: "Security Vulnerabilities in Cross-Platform Mobile Frameworks", url: "https://scholar.google.com" }
      ]
    },

    // Caretaker / Estate
    {
      name: "Sri Bimal Mondal",
      email: "estate@kgec.edu.in",
      employeeId: "KGEC-EST-001",
      role: "caretaker" as const,
      designation: "Estate Officer & Caretaker",
      specialization: "Campus Infrastructure & Civil Maintenance",
      department: null,
      photoUrl: "",
      education: [
        { degree: "Diploma in Civil Engineering & Estate Administration", institution: "WBSCTE", year: 1998 }
      ],
      researchPaperLinks: []
    }
  ];

  for (const st of staffList) {
    await db
      .insert(staff)
      .values(st as typeof staff.$inferInsert)
      .onConflictDoUpdate({
        target: staff.employeeId,
        set: {
          name: st.name,
          email: st.email,
          role: st.role as typeof staff.role.enumValues[number],
          designation: st.designation,
          specialization: st.specialization,
          department: st.department as typeof staff.department.enumValues[number],
          education: st.education,
          researchPaperLinks: st.researchPaperLinks,
          photoUrl: st.photoUrl,
        },
      });
  }
  console.log("✓ Authentic Staff and faculty roster seeded.");

  // 10. Seed Gallery Images
  const galleryList = [
    { album: "Campus Life", imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80", caption: "KGEC Main Academic Quadrangle" },
    { album: "Academics", imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", caption: "Collaborative Engineering Projects" },
    { album: "Innovation", imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80", caption: "Smart India Hackathon Winning Team" },
    { album: "Laboratories", imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80", caption: "Advanced Computing & AI Lab" },
    { album: "Espektro", imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80", caption: "Annual Cultural & Tech Festival" },
    { album: "Sports", imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80", caption: "Inter-College Sports Championship" },
    { album: "Library", imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80", caption: "Central Digital Library & Archives" },
    { album: "Robotics", imageUrl: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80", caption: "KGEC Robotics Society Lab" },
  ];

  const existingGallery = await db.select().from(galleryImages).limit(1);
  if (existingGallery.length === 0) {
    for (const img of galleryList) {
      await db.insert(galleryImages).values(img);
    }
    console.log("✓ Gallery images seeded.");
  }

  // 11. Seed Downloads Repository
  const downloadsList = [
    { title: "NIRF 2024 Overall & Engineering Submission Report", fileUrl: "https://kgec.edu.in/downloads/nirf-2024.pdf", category: "nirf" as const },
    { title: "Mandatory Disclosure 2024-25 as per AICTE Norms", fileUrl: "https://kgec.edu.in/downloads/mandatory-disclosure-24.pdf", category: "mandatory_disclosure" as const },
    { title: "KGEC Official Placement Brochure", fileUrl: "https://kgec.edu.in/downloads/placement-brochure.pdf", category: "general" as const },
    { title: "B.Tech Academic Curriculum & Syllabus Regulation (MAKAUT)", fileUrl: "https://kgec.edu.in/downloads/makaut-btech-syllabus.pdf", category: "general" as const },
    { title: "Anti-Ragging Undertaking Form for Newly Admitted Students", fileUrl: "https://kgec.edu.in/downloads/anti-ragging-affidavit.pdf", category: "mandatory_disclosure" as const },
    { title: "IQAC Annual Quality Assurance Report (AQAR) 2023-24", fileUrl: "https://kgec.edu.in/downloads/iqac-aqar-2024.pdf", category: "iqac" as const },
    { title: "NAAC Institutional Self Study Report (SSR)", fileUrl: "https://kgec.edu.in/downloads/naac-ssr.pdf", category: "naac" as const },
  ];

  const existingDownloads = await db.select().from(downloads).limit(1);
  if (existingDownloads.length === 0) {
    for (const d of downloadsList) {
      await db.insert(downloads).values(d);
    }
    console.log("✓ Downloads documents seeded.");
  }

  console.log("All database tables seeded successfully.");
}
