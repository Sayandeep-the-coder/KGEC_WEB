import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/middlewares/auth";
import { storageClient } from "@/lib/services/storage";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { handleApiError } from "@/lib/errors";
import crypto from "crypto";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_DOC_SIZE = 10 * 1024 * 1024; // 10 MB

const DISALLOWED_EXTENSIONS = [
  ".html", ".htm", ".svg", ".js", ".jsx", ".ts", ".tsx",
  ".exe", ".php", ".py", ".sh", ".bat", ".cmd", ".vbs", ".jar", ".ps1"
];

function validateMagicBytes(buffer: Buffer, mimeType: string): boolean {
  if (buffer.length < 4) return false;

  // PDF magic bytes: %PDF- (0x25 0x50 0x44 0x46 0x2D)
  if (mimeType.includes("pdf") || mimeType.includes("octet-stream")) {
    if (buffer.slice(0, 5).toString("ascii") === "%PDF-") return true;
  }

  // PNG magic bytes: 0x89 0x50 0x4E 0x47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    return true;
  }

  // JPEG magic bytes: 0xFF 0xD8 0xFF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return true;
  }

  // WEBP magic bytes: RIFF ... WEBP
  if (
    buffer.slice(0, 4).toString("ascii") === "RIFF" &&
    buffer.slice(8, 12).toString("ascii") === "WEBP"
  ) {
    return true;
  }

  // Office documents (.doc, .docx) or fallback allowed if PDF header matched
  if (
    mimeType.includes("msword") ||
    mimeType.includes("officedocument") ||
    mimeType.includes("document")
  ) {
    return true;
  }

  return false;
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const bucket = (formData.get("bucket") as string) || "notices";

    const ALLOWED_BUCKETS = ["notices", "downloads", "gallery", "news", "staff", "recruiters"];
    if (!ALLOWED_BUCKETS.includes(bucket)) {
      return NextResponse.json(
        { error: `Invalid bucket. Allowed: ${ALLOWED_BUCKETS.join(", ")}` },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const ext = "." + (file.name.split(".").pop() || "").toLowerCase();
    if (DISALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { error: "Executable and script file uploads are strictly prohibited." },
        { status: 400 }
      );
    }

    const isImage = file.type.startsWith("image/");
    const maxSize = isImage ? MAX_IMAGE_SIZE : MAX_DOC_SIZE;

    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `File size exceeds maximum limit of ${maxSize / (1024 * 1024)}MB` },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (!validateMagicBytes(buffer, file.type)) {
      return NextResponse.json(
        { error: "File content signature validation failed. Invalid file format." },
        { status: 400 }
      );
    }

    // Generate safe UUID-based storage key
    const sanitizedExt = ext.replace(/[^a-z0-9.]/g, "");
    const safeUuid = crypto.randomUUID();
    const key = `${safeUuid}${sanitizedExt}`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: file.type || "application/octet-stream",
    });

    await storageClient.send(command);

    const supabaseUrl = process.env.SUPABASE_URL || "https://wekqgjampevtlfigznet.supabase.co";
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${key}`;

    const res = NextResponse.json(
      {
        data: {
          url: publicUrl,
          name: file.name,
          size: file.size,
          type: file.type,
          key,
        },
      },
      { status: 201 }
    );

    res.headers.set("X-Content-Type-Options", "nosniff");
    return res;
  } catch (error) {
    return handleApiError(error, "POST /api/v1/upload");
  }
}
