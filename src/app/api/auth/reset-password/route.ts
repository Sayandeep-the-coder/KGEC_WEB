import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { passwordResetOtps } from "@/lib/db/schema";
import { eq, and, gt } from "drizzle-orm";
import { resetPasswordSchema } from "@/lib/validators";
import { createAdminClient } from "@/lib/config/supabase/admin";
import { checkAuthRateLimit, incrementAuthBackoff, clearAuthBackoff } from "@/lib/middlewares/ratelimit";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = resetPasswordSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const { email, otp, newPassword } = result.data;
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";

    const rateLimit = await checkAuthRateLimit(ip, email);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": rateLimit.retryAfter?.toString() || "60" } }
      );
    }

    // Find the verified, unexpired OTP for this email
    const [otpRecord] = await db
      .select()
      .from(passwordResetOtps)
      .where(
        and(
          eq(passwordResetOtps.email, email),
          eq(passwordResetOtps.verified, true),
          gt(passwordResetOtps.expiresAt, new Date())
        )
      )
      .limit(1);

    if (!otpRecord) {
      await incrementAuthBackoff(ip, email);
      return NextResponse.json(
        { error: "No verified OTP found. Please complete the verification step first." },
        { status: 400 }
      );
    }

    // Double-check OTP matches
    if (otpRecord.otp !== otp) {
      await incrementAuthBackoff(ip, email);
      return NextResponse.json(
        { error: "Invalid OTP." },
        { status: 400 }
      );
    }

    // Update password via Supabase Admin API
    const supabaseAdmin = createAdminClient();

    // Look up user by email
    const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
    const user = usersData?.users?.find((u) => u.email === email);

    if (!user) {
      await incrementAuthBackoff(ip, email);
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      password: newPassword,
    });

    if (updateError) {
      console.error("Supabase password update error:", updateError);
      await incrementAuthBackoff(ip, email);
      return NextResponse.json(
        { error: "Failed to update password. Please try again." },
        { status: 500 }
      );
    }

    // Clean up all OTP records for this email
    await db.delete(passwordResetOtps).where(eq(passwordResetOtps.email, email));
    
    // Clear backoff on complete success
    await clearAuthBackoff(ip, email);

    return NextResponse.json({
      data: {
        success: true,
        message: "Password updated successfully. Please log in with your new password.",
        redirectTo: "/admin/login",
      },
    });
  } catch (error) {
    console.error("POST /api/auth/reset-password error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
