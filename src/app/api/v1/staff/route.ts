import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { staff, staffRoleEnum, departmentEnum } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { staffSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { writeAuditLog } from "@/lib/audit";
import { handleApiError } from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    const department = searchParams.get("department");
    const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 100);
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);

    const conditions = [];

    if (role && (staffRoleEnum.enumValues as string[]).includes(role)) {
      conditions.push(
        eq(staff.role, role as (typeof staffRoleEnum.enumValues)[number])
      );
    }

    if (
      department &&
      (departmentEnum.enumValues as string[]).includes(department)
    ) {
      conditions.push(
        eq(
          staff.department,
          department as (typeof departmentEnum.enumValues)[number]
        )
      );
    }

    const whereClause =
      conditions.length > 0 ? and(...conditions) : undefined;

    const items = await db
      .select()
      .from(staff)
      .where(whereClause)
      .limit(limit)
      .offset((page - 1) * limit);

    return NextResponse.json({ data: items });
  } catch (error) {
    return handleApiError(error, "GET /api/v1/staff");
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const body = await req.json();
    const result = staffSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const [newStaff] = await db
      .insert(staff)
      .values(result.data)
      .returning();

    await writeAuditLog({
      adminId: auth.admin!.id,
      adminEmail: auth.admin!.email,
      action: "create",
      resource: "staff",
      resourceId: newStaff.id,
    });

    revalidatePath("/staff");

    return NextResponse.json({ data: newStaff }, { status: 201 });
  } catch (error) {
    return handleApiError(error, "POST /api/v1/staff");
  }
}
