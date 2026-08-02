import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema";
import { contactSchema } from "@/lib/validators";
import { checkContactRateLimit } from "@/lib/middlewares/ratelimit";
import { sendContactNotification } from "@/lib/services/email";
import { handleApiError } from "@/lib/errors";
import { requireAdmin } from "@/lib/middlewares/auth";
import { desc, eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const data = await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.submittedAt));

    return NextResponse.json({ data });
  } catch (error) {
    return handleApiError(error, "GET /api/v1/contact");
  }
}

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

export async function DELETE(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing message id" }, { status: 400 });
    }

    await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleApiError(error, "DELETE /api/v1/contact");
  }
}
