import { NextResponse } from "next/server";
import { seedAllData } from "@/lib/db/seed";
import { requireAdmin } from "@/lib/middlewares/auth";
import { handleApiError } from "@/lib/errors";

export async function POST() {
  try {
    // Allow seed in production but strictly require admin auth

    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    await seedAllData();
    return NextResponse.json({ success: true, message: "Database seeded successfully" });
  } catch (error) {
    return handleApiError(error, "POST /api/v1/seed");
  }
}

// Remove GET handler — seed should never be triggered by a simple browser visit
