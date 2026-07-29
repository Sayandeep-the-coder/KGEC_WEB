import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { checkAdminRateLimit } from "@/lib/ratelimit";
import { headers } from "next/headers";

export async function requireAdmin() {
  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const rateLimit = await checkAdminRateLimit(`admin_${ip}`);

  if (!rateLimit.success) {
    return {
      error: NextResponse.json({ error: "Too many requests" }, { status: 429 }),
      user: null,
    };
  }

  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      user: null,
    };
  }

  return { user, error: null };
}
