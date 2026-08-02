import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { departmentDetails } from "@/lib/db/schema";

export async function GET() {
  try {
    const rows = await db.select().from(departmentDetails);
    const list = rows.map((r) => ({
      slug: r.slug,
      name: r.name,
      code: r.code,
      established: r.established,
      degreesOffered: r.degreesOffered as string[],
      totalAnnualCapacity: r.totalAnnualCapacity,
      recentMetrics: r.recentMetrics,
    }));

    return NextResponse.json({ data: list });
  } catch (error) {
    console.error("GET /api/v1/departments error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
