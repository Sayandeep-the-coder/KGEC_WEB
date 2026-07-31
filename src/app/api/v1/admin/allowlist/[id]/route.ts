import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { adminAllowlist } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { writeAuditLog } from "@/lib/audit";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { id } = await params;

    // Prevent self-removal
    if (id === auth.admin!.id) {
      return NextResponse.json(
        { error: "Cannot remove your own admin access" },
        { status: 400 }
      );
    }

    const [deleted] = await db
      .delete(adminAllowlist)
      .where(eq(adminAllowlist.id, id))
      .returning();

    if (!deleted) {
      return NextResponse.json(
        { error: "Allowlist entry not found" },
        { status: 404 }
      );
    }

    await writeAuditLog({
      adminId: auth.admin!.id,
      adminEmail: auth.admin!.email,
      action: "revoke",
      resource: "admin_allowlist",
      resourceId: id,
      metadata: { email: deleted.email },
    });

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    console.error("DELETE /api/v1/admin/allowlist/[id] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
