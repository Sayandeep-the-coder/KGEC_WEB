import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { adminAllowlist } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { writeAuditLog } from "@/lib/audit";
import { handleApiError } from "@/lib/errors";
import { validateUuid } from "@/lib/utils";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { id } = await params;
    const invalid = validateUuid(id);
    if (invalid) return invalid;

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
    return handleApiError(error, "DELETE /api/v1/admin/allowlist/[id]");
  }
}
