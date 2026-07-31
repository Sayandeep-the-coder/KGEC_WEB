import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { checkRateLimit, RateLimitTier } from "@/lib/middlewares/ratelimit";

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const { pathname } = nextUrl;

  let rateLimitHeaders: Record<string, string> | null = null;

  // 1. Rate Limiting for API & Auth routes
  if (pathname.startsWith("/api/")) {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    let tier: RateLimitTier = "public";

    const isSessionCheck = pathname.endsWith("/session");

    if (!isSessionCheck && (pathname.startsWith("/api/v1/auth") || pathname.startsWith("/api/auth"))) {
      tier = "auth";
    } else if (pathname.startsWith("/api/v1/admin") || isLoggedIn) {
      tier = "admin";
    } else if (pathname === "/api/v1/contact") {
      tier = "contact";
    }

    const { success, limit, remaining, reset } = await checkRateLimit(ip, tier);

    if (!success) {
      const retryAfterSec = Math.ceil(Math.max((reset - Date.now()) / 1000, 1));
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfterSeconds: retryAfterSec,
        },
        {
          status: 429,
          headers: {
            "Retry-After": retryAfterSec.toString(),
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": reset.toString(),
          },
        }
      );
    }

    rateLimitHeaders = {
      "X-RateLimit-Limit": limit.toString(),
      "X-RateLimit-Remaining": remaining.toString(),
      "X-RateLimit-Reset": reset.toString(),
    };
  }

  // 2. Admin Portal Route Protection
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";
  const isAccessDeniedPage = pathname === "/admin/access-denied";

  if (isAdminRoute) {
    if (isLoginPage || isAccessDeniedPage) {
      const res = NextResponse.next();
      if (rateLimitHeaders) {
        Object.entries(rateLimitHeaders).forEach(([k, v]) => res.headers.set(k, v));
      }
      return res;
    }

    if (!isLoggedIn) {
      const loginUrl = new URL("/admin/login", nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }
  }

  const res = NextResponse.next();
  if (rateLimitHeaders) {
    Object.entries(rateLimitHeaders).forEach(([k, v]) => res.headers.set(k, v));
  }
  return res;
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
