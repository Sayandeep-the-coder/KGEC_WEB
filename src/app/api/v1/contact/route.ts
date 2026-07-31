import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";
import { contactSchema } from "@/lib/validators";
import { checkContactRateLimit } from "@/lib/middlewares/ratelimit";
import { sendContactNotification } from "@/lib/services/email";
import { handleApiError } from "@/lib/errors";

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const { success } = await checkContactRateLimit(ip);

    if (!success) {
      return NextResponse.json(
        {
          error: "Too many contact form submissions. Please try again later.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const [submission] = await db
      .insert(contactSubmissions)
      .values(result.data)
      .returning();

    // Async email notification (non-blocking)
    sendContactNotification(
      submission.name,
      submission.email,
      submission.message
    ).catch((err) => {
      console.error("Async contact notification error:", err);
    });

    return NextResponse.json(
      { data: { id: submission.id, success: true } },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error, "POST /api/v1/contact");
  }
}
