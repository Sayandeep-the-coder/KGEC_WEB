import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { checkPublicRateLimit } from "@/lib/middlewares/ratelimit";

/**
 * Extracts the client IP from `x-forwarded-for` and checks the public rate limit.
 * Returns `null` if the request is allowed, or a 429 `NextResponse` if rate-limited.
 *
 * Usage in a route handler:
 * ```ts
 * const rateLimited = await enforcePublicRateLimit();
 * if (rateLimited) return rateLimited;
 * ```
 */
export async function enforcePublicRateLimit(): Promise<NextResponse | null> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  const { success } = await checkPublicRateLimit(`public_${ip}`);

  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  return null;
}
