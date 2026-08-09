import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { admissions, admissionProgramEnum } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { admissionsPatchSchema } from "@/lib/validators";
import { revalidatePath, revalidateTag } from "next/cache";
import { writeAuditLog } from "@/lib/audit";
import { handleApiError } from "@/lib/errors";

// ─── Cached query ──────────────────────────────────────────────────────────
const getCachedAdmission = unstable_cache(
  async (program: string) => {
    const [row] = await db
      .select()
      .from(admissions)
      .where(
        eq(
          admissions.program,
          program as (typeof admissionProgramEnum.enumValues)[number]
        )
      );

    if (!row) {
      return {
        id: program,
        program,
        seatMatrix: [],
        importantDates: [],
      };
    }

    return {
      id: row.id,
      program: row.program,
      seatMatrix: row.seatMatrix,
      importantDates: row.importantDates,
    };
  },
  ["admissions-program"],
  { revalidate: 3600, tags: ["admissions"] }
);

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ program: string }> }
) {
  try {
    const { program } = await params;

    if (!(admissionProgramEnum.enumValues as string[]).includes(program)) {
      return NextResponse.json(
        { error: "Invalid admission program" },
        { status: 400 }
      );
    }

    const data = await getCachedAdmission(program);

    return NextResponse.json({ data });
  } catch (error) {
    return handleApiError(error, "GET /api/v1/admissions/[program]");
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
      return NextResponse.json(
        { error: "Invalid admission program" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const result = admissionsPatchSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", issues: result.error.issues },
        { status: 400 }
      );
    }

    const validProgram =
      program as (typeof admissionProgramEnum.enumValues)[number];

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
          ...(result.data.seatMatrix !== undefined
            ? { seatMatrix: result.data.seatMatrix }
            : {}),
          ...(result.data.importantDates !== undefined
            ? { importantDates: result.data.importantDates }
            : {}),
        },
      })
      .returning();

    await writeAuditLog({
      adminId: auth.admin!.id,
      adminEmail: auth.admin!.email,
      action: "update",
      resource: "admissions",
      resourceId: updated.id,
      metadata: { program },
    });

    revalidateTag("admissions", "max");
    revalidatePath(`/admissions/${program}`);
    revalidatePath("/admissions");

    return NextResponse.json({ data: updated });
  } catch (error) {
    return handleApiError(error, "PATCH /api/v1/admissions/[program]");
  }
}
