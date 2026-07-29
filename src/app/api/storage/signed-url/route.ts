import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { signedUrlSchema } from "@/lib/validators";
import { getPresignedUploadUrl } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const body = await req.json();
    const result = signedUrlSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const { bucket, filename, contentType } = result.data;
    const { uploadUrl, publicUrl, key } = await getPresignedUploadUrl(bucket, filename, contentType);

    return NextResponse.json({
      data: {
        uploadUrl,
        publicUrl,
        key,
      },
    });
  } catch (error) {
    console.error("POST /api/storage/signed-url error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
