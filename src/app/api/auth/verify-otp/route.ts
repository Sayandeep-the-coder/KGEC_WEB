import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { passwordResetOtps } from "@/db/schema";
import { eq, and, gt } from "drizzle-orm";
import { verifyOtpSchema } from "@/lib/validators";
import { checkAuthRateLimit, incrementAuthBackoff } from "@/lib/ratelimit";

const MAX_ATTEMPTS = 5;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = verifyOtpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const { email, otp } = result.data;
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";

    const rateLimit = await checkAuthRateLimit(ip, email);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": rateLimit.retryAfter?.toString() || "60" } }
      );
    }

    // Find the latest unexpired OTP for this email
    const [otpRecord] = await db
      .select()
      .from(passwordResetOtps)
      .where(
        and(
          eq(passwordResetOtps.email, email),
          gt(passwordResetOtps.expiresAt, new Date())
        )
      )
      .limit(1);

    if (!otpRecord) {
      await incrementAuthBackoff(ip, email);
      return NextResponse.json(
        { error: "OTP expired or not found. Please request a new one." },
        { status: 400 }
      );
    }

    // Check attempt limit
    if (otpRecord.attempts >= MAX_ATTEMPTS) {
      // Delete the OTP to force a new request
      await db.delete(passwordResetOtps).where(eq(passwordResetOtps.id, otpRecord.id));
      return NextResponse.json(
        { error: "Too many failed attempts. Please request a new OTP." },
        { status: 429 }
      );
    }

    // Increment attempts
    await db
      .update(passwordResetOtps)
      .set({ attempts: otpRecord.attempts + 1 })
      .where(eq(passwordResetOtps.id, otpRecord.id));

    // Verify OTP
    if (otpRecord.otp !== otp) {
      await incrementAuthBackoff(ip, email);
      return NextResponse.json(
        { error: "Invalid OTP. Please try again." },
        { status: 400 }
      );
    }

    // Mark as verified
    await db
      .update(passwordResetOtps)
      .set({ verified: true })
      .where(eq(passwordResetOtps.id, otpRecord.id));

    return NextResponse.json({
      data: { verified: true, message: "OTP verified. You can now reset your password." },
    });
  } catch (error) {
    console.error("POST /api/auth/verify-otp error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
