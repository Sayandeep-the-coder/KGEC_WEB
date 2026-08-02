import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { departmentDetails, staff } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { DepartmentDetail } from "@/lib/data/departmentsData";
import { requireAdmin } from "@/lib/middlewares/auth";
import { writeAuditLog } from "@/lib/audit";
import { revalidatePath } from "next/cache";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const deptKey = slug.toLowerCase();

    const [row] = await db
      .select()
      .from(departmentDetails)
      .where(eq(departmentDetails.slug, deptKey));

    if (!row) {
      return NextResponse.json({ error: "Department not found" }, { status: 404 });
    }

    // Fetch live faculty from staff table
    let liveFaculty: DepartmentDetail["faculty"] = [];
    const staffRows = await db
      .select()
      .from(staff)
      .where(eq(staff.department, deptKey as typeof staff.department.enumValues[number]));

    if (staffRows && staffRows.length > 0) {
      liveFaculty = staffRows.map((s) => ({
        id: s.id,
        name: s.name,
        designation: s.role,
        email: s.email,
        qualification: Array.isArray(s.education)
          ? (s.education as Array<{ degree?: string; institution?: string }>).map((e) => typeof e === "string" ? e : `${e.degree || ""}`).join(", ")
          : "Ph.D. / M.Tech",
        specialization: "Engineering & Applied Sciences",
        researchAreas: Array.isArray(s.researchPaperLinks)
          ? (s.researchPaperLinks as Array<{ title?: string; url?: string } | string>).map((r) => typeof r === "string" ? r : (r as { title?: string }).title || "").filter(Boolean)
          : [],
        publicationsCount: Array.isArray(s.researchPaperLinks)
          ? (s.researchPaperLinks as unknown[]).length
          : 12,
      }));
    }

    const data: DepartmentDetail = {
      slug: row.slug,
      name: row.name,
      code: row.code,
      established: row.established,
      degreesOffered: row.degreesOffered as string[],
      headOfDepartment: row.headOfDepartment,
      overview: row.overview,
      detailedOverview: row.detailedOverview as string[],
      vision: row.vision,
      mission: row.mission as string[],
      laboratories: row.laboratories as { name: string; description: string }[],
      seatMatrix: row.seatMatrix as DepartmentDetail["seatMatrix"],
      totalAnnualCapacity: row.totalAnnualCapacity,
      enrollment5Year: (row.enrollment5Year as DepartmentDetail["enrollment5Year"]) || [],
      placement5Year: (row.placement5Year as DepartmentDetail["placement5Year"]) || [],
      recentMetrics: (row.recentMetrics as DepartmentDetail["recentMetrics"]) || ({} as DepartmentDetail["recentMetrics"]),
      faculty: liveFaculty,
      studentAchievements: row.studentAchievements,
      achievementHighlights: (row.achievementHighlights as DepartmentDetail["achievementHighlights"]) || [],
    };

    return NextResponse.json({ data });
  } catch (error) {
    console.error("GET /api/v1/departments/[slug] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { slug } = await params;
    const deptKey = slug.toLowerCase();
    const body = await req.json();

    const [updated] = await db
      .insert(departmentDetails)
      .values({
        slug: deptKey,
        name: body.name || "Department",
        code: body.code || deptKey.toUpperCase(),
        established: body.established || "1995",
        degreesOffered: body.degreesOffered || ["B.Tech"],
        headOfDepartment: body.headOfDepartment || "Head of Department",
        overview: body.overview || "",
        detailedOverview: body.detailedOverview || [],
        vision: body.vision || "",
        mission: body.mission || [],
        laboratories: body.laboratories || [],
        seatMatrix: body.seatMatrix || [],
        totalAnnualCapacity: body.totalAnnualCapacity || 60,
        enrollment5Year: body.enrollment5Year || [],
        placement5Year: body.placement5Year || [],
        recentMetrics: body.recentMetrics || {},
        studentAchievements: body.studentAchievements || "",
        achievementHighlights: body.achievementHighlights || [],
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: departmentDetails.slug,
        set: {
          ...body,
          updatedAt: new Date(),
        },
      })
      .returning();

    await writeAuditLog({
      adminId: auth.admin!.id,
      adminEmail: auth.admin!.email,
      action: "update",
      resource: "department_details",
      resourceId: updated.id,
      metadata: { slug: deptKey },
    });

    revalidatePath(`/departments/${deptKey}`);
    revalidatePath("/departments");

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("PATCH /api/v1/departments/[slug] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
