import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/middlewares/auth";
import { getAdminDashboardData } from "@/lib/services/dashboard";

export async function GET() {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const data = await getAdminDashboardData();

    return NextResponse.json({ data });
  } catch (error) {
    console.error("GET /api/v1/admin/dashboard error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
