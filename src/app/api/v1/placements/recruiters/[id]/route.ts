import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { placementRecruiters } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { recruiterLogoPatchSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { writeAuditLog } from "@/lib/audit";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { id } = await params;
    const body = await req.json();
    const result = recruiterLogoPatchSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const [updated] = await db
      .update(placementRecruiters)
      .set({ logoUrl: result.data.logoUrl })
      .where(eq(placementRecruiters.id, id))
      .returning();

    if (!updated) {
      return NextResponse.json(
        { error: "Recruiter not found" },
        { status: 404 }
      );
    }

    await writeAuditLog({
      adminId: auth.admin!.id,
      adminEmail: auth.admin!.email,
      action: "update",
      resource: "placement_recruiters",
      resourceId: id,
      metadata: { logoUrl: result.data.logoUrl },
    });

    revalidatePath("/training-and-placement");
    revalidatePath("/placements");

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("PATCH /api/v1/placements/recruiters/[id] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
