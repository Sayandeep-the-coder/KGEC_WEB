import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { adminAllowlist } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * Checks the current session via NextAuth and verifies the user's email is on the
 * admin_allowlist. Returns { user, admin, error }.
 *
 * - No session → 401
 * - Session but email not on allowlist → 403
 * - Allowlisted → { user, admin } with admin being the allowlist row
 */
export async function requireAdmin() {
  const session = await auth();

  if (!session || !session.user || !session.user.email) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      user: null,
      admin: null,
    };
  }

  const email = session.user.email;

  const [admin] = await db
    .select()
    .from(adminAllowlist)
    .where(eq(adminAllowlist.email, email.toLowerCase()));

  if (!admin) {
    return {
      error: NextResponse.json(
        { error: "This Google account is not authorized for admin access" },
        { status: 403 }
      ),
      user: null,
      admin: null,
    };
  }

  return { user: session.user, admin, error: null };
}
