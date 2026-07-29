import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { galleryImages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { gallerySchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { checkPublicRateLimit } from "@/lib/middlewares/ratelimit";
import { headers } from "next/headers";


export async function GET(req: NextRequest) {

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  const rateLimit = await checkPublicRateLimit(`public_${ip}`);
  if (!rateLimit.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }


  try {
    const { searchParams } = new URL(req.url);
    const album = searchParams.get("album");

    const whereClause = album ? eq(galleryImages.album, album) : undefined;

    const items = await db
      .select()
      .from(galleryImages)
      .where(whereClause);

    return NextResponse.json({ data: items });
  } catch (error) {
    console.error("GET /api/gallery error:", error);
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

    revalidatePath("/gallery");

    return NextResponse.json({ data: newImage }, { status: 201 });
  } catch (error) {
    console.error("POST /api/gallery error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
