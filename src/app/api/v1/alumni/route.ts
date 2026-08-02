import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { alumni } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/middlewares/auth";
import { writeAuditLog } from "@/lib/audit";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const query = db.select().from(alumni).orderBy(desc(alumni.batchYear));

    const dbRows = await query;
    let list = dbRows.map((r) => ({
      id: r.id,
      name: r.name,
      role: r.currentRole,
      category: r.category,
      highlight: r.bio || r.company,
      batchYear: r.batchYear,
      department: r.department,
      company: r.company,
      location: r.location,
      linkedinUrl: r.linkedinUrl,
      photoUrl: r.photoUrl,
    }));

    if (category && category !== "all") {
      list = list.filter((a) => a.category === category);
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.role.toLowerCase().includes(q) ||
          (a.company && a.company.toLowerCase().includes(q)) ||
          (a.highlight && a.highlight.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({ data: list });
  } catch (error) {
    console.error("GET /api/v1/alumni error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireAdmin();
    if (auth.error) return auth.error;

    const body = await req.json();

    const [created] = await db
      .insert(alumni)
      .values({
        name: body.name,
        batchYear: body.batchYear || new Date().getFullYear(),
        department: body.department || "General",
        currentRole: body.currentRole || body.role || "Alumni",
        company: body.company || "Enterprise",
        location: body.location,
        category: body.category || "general",
        bio: body.bio || body.highlight,
        photoUrl: body.photoUrl,
        linkedinUrl: body.linkedinUrl,
        featured: body.featured ?? false,
      })
      .returning();

    await writeAuditLog({
      adminId: auth.admin!.id,
      adminEmail: auth.admin!.email,
      action: "create",
      resource: "alumni",
      resourceId: created.id,
      metadata: { name: created.name },
    });

    revalidatePath("/alumni");

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (error) {
    console.error("POST /api/v1/alumni error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
