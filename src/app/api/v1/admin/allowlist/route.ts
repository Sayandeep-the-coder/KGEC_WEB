import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { adminAllowlist } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/middlewares/auth";
import { allowlistSchema } from "@/lib/validators";
import { writeAuditLog } from "@/lib/audit";
import { handleApiError } from "@/lib/errors";

export async function GET() {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const data = await db.select().from(adminAllowlist);

    return NextResponse.json({ data });
  } catch (error) {
    return handleApiError(error, "GET /api/v1/admin/allowlist");
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const body = await req.json();
    const result = allowlistSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const [newEntry] = await db
      .insert(adminAllowlist)
      .values({
        email: result.data.email.toLowerCase(),
        name: result.data.name ?? null,
        addedBy: auth.admin!.id,
      })
      .returning();

    await writeAuditLog({
      adminId: auth.admin!.id,
      adminEmail: auth.admin!.email,
      action: "grant",
      resource: "admin_allowlist",
      resourceId: newEntry.id,
      metadata: { email: result.data.email },
    });

    return NextResponse.json({ data: newEntry }, { status: 201 });
  } catch (error) {
    return handleApiError(error, "POST /api/v1/admin/allowlist");
  }
}
