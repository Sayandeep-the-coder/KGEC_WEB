import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { galleryImages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { gallerySchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { writeAuditLog } from "@/lib/audit";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const album = searchParams.get("album");
    const limit = Math.min(parseInt(searchParams.get("limit") || "40", 10), 100);
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);

    const whereClause = album ? eq(galleryImages.album, album) : undefined;

    const items = await db
      .select()
      .from(galleryImages)
      .where(whereClause)
      .limit(limit)
      .offset((page - 1) * limit);

    return NextResponse.json({ data: items });
  } catch (error) {
    console.error("GET /api/v1/gallery error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const body = await req.json();
    const result = gallerySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const [newImage] = await db
      .insert(galleryImages)
      .values(result.data)
      .returning();

    await writeAuditLog({
      adminId: auth.admin!.id,
      adminEmail: auth.admin!.email,
      action: "create",
      resource: "gallery",
      resourceId: newImage.id,
    });

    revalidatePath("/gallery");

    return NextResponse.json({ data: newImage }, { status: 201 });
  } catch (error) {
    console.error("POST /api/v1/gallery error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
