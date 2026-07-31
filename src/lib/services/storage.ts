import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Supabase Storage exposes an S3-compatible API.
// Generate S3 access keys from: Supabase Dashboard → Settings → S3 Access Keys
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const s3AccessKeyId = process.env.SUPABASE_S3_ACCESS_KEY || "placeholder-access-key";
const s3SecretAccessKey = process.env.SUPABASE_S3_SECRET_KEY || "placeholder-secret-key";
const s3Region = process.env.SUPABASE_S3_REGION || "us-east-1";

// Supabase S3 endpoint: https://<project-ref>.supabase.co/storage/v1/s3
const s3Endpoint = `${supabaseUrl}/storage/v1/s3`;

export const storageClient = new S3Client({
  region: s3Region,
  endpoint: s3Endpoint,
  credentials: {
    accessKeyId: s3AccessKeyId,
    secretAccessKey: s3SecretAccessKey,
  },
  forcePathStyle: true, // required for Supabase S3 compatibility
});

/**
 * Generates a presigned PUT URL for direct client-side upload to Supabase Storage.
 * The `bucket` param maps to a Supabase Storage bucket (notices, downloads, gallery, news).
 * The file is keyed under `<bucket>/<timestamp>-<sanitised-filename>`.
 */
export async function getPresignedUploadUrl(bucket: string, filename: string, contentType: string) {
  const key = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  });

  const uploadUrl = await getSignedUrl(storageClient, command, { expiresIn: 3600 });

  // Public URL for Supabase Storage public buckets:
  // https://<project-ref>.supabase.co/storage/v1/object/public/<bucket>/<key>
  const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${key}`;

  return { uploadUrl, publicUrl, key };
}
