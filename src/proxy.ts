import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isLoginPage = nextUrl.pathname === "/admin/login";
  const isAccessDeniedPage = nextUrl.pathname === "/admin/access-denied";

  if (isAdminRoute) {
    if (isLoginPage || isAccessDeniedPage) {
      return NextResponse.next();
    }

    if (!isLoggedIn) {
      const loginUrl = new URL("/admin/login", nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
