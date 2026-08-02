import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/middlewares/auth";
import { getAdminDashboardData } from "@/lib/services/dashboard";
import { handleApiError } from "@/lib/errors";

export async function GET() {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const data = await getAdminDashboardData();

    return NextResponse.json({ data });
  } catch (error) {
    return handleApiError(error, "GET /api/v1/admin/dashboard");
  }
}
