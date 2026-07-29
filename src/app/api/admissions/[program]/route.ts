import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { admissions, admissionProgramEnum } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { admissionsPatchSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { checkPublicRateLimit } from "@/lib/ratelimit";
import { headers } from "next/headers";


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ program: string }> }
) {

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  const rateLimit = await checkPublicRateLimit(`public_${ip}`);
  if (!rateLimit.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }


  try {
    const { program } = await params;
    
    if (!(admissionProgramEnum.enumValues as string[]).includes(program)) {
      return NextResponse.json({ error: "Invalid admission program" }, { status: 400 });
    }

    const [item] = await db
      .select()
      .from(admissions)
      .where(eq(admissions.program, program as (typeof admissionProgramEnum.enumValues)[number]));

    if (!item) {
      return NextResponse.json(
        { data: { program, seatMatrix: null, importantDates: null } }
      );
    }

    return NextResponse.json({
      data: {
        id: item.id,
        program: item.program,
        seatMatrix: item.seatMatrix,
        importantDates: item.importantDates,
      },
    });
  } catch (error) {
    console.error("GET /api/admissions/[program] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ program: string }> }
) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const { program } = await params;

    if (!(admissionProgramEnum.enumValues as string[]).includes(program)) {
      return NextResponse.json({ error: "Invalid admission program" }, { status: 400 });
    }

    const body = await req.json();
    const result = admissionsPatchSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const validProgram = program as (typeof admissionProgramEnum.enumValues)[number];

    const [updated] = await db
      .insert(admissions)
      .values({
        program: validProgram,
        seatMatrix: result.data.seatMatrix ?? {},
        importantDates: result.data.importantDates ?? {},
      })
      .onConflictDoUpdate({
        target: admissions.program,
        set: {
          ...(result.data.seatMatrix !== undefined ? { seatMatrix: result.data.seatMatrix } : {}),
          ...(result.data.importantDates !== undefined ? { importantDates: result.data.importantDates } : {}),
        },
      })
      .returning();

    revalidatePath(`/admissions/${program}`);
    revalidatePath("/admissions");

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("PATCH /api/admissions/[program] error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
