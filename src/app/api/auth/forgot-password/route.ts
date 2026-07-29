import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { passwordResetOtps } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { forgotPasswordSchema } from "@/lib/validators";
import { sendPasswordResetOtp } from "@/lib/services/email";
import { createAdminClient } from "@/lib/config/supabase/admin";
import { checkAuthRateLimit, incrementAuthBackoff } from "@/lib/middlewares/ratelimit";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = forgotPasswordSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const { email } = result.data;
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";

    const rateLimit = await checkAuthRateLimit(ip, email);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": rateLimit.retryAfter?.toString() || "60" } }
      );
    }

    // Immediately increment backoff since an OTP request is an auth flow initiation
    await incrementAuthBackoff(ip, email);

    // Verify the email belongs to a registered Supabase Auth user
    const supabaseAdmin = createAdminClient();
    const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
    const userExists = usersData?.users?.some((u) => u.email === email);

    if (!userExists) {
      // Return success even if user doesn't exist to prevent email enumeration
      return NextResponse.json({
        data: { message: "If an account with that email exists, an OTP has been sent." },
      });
    }

    // Delete any existing unexpired OTPs for this email
    await db.delete(passwordResetOtps).where(eq(passwordResetOtps.email, email));

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Store OTP with 10-minute expiry
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await db.insert(passwordResetOtps).values({
      email,
      otp,
      expiresAt,
    });

    // Send OTP via Gmail
    await sendPasswordResetOtp(email, otp);

    return NextResponse.json({
      data: { message: "If an account with that email exists, an OTP has been sent." },
    });
  } catch (error) {
    console.error("POST /api/auth/forgot-password error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
