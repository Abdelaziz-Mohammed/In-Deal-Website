import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localeDetection: true,
});

const publicAdminRoutes = ["/admin/auth/login", "/admin/auth/register"];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin routes (non-localized)
  if (pathname.startsWith("/admin")) {
    // Allow public admin auth routes
    if (publicAdminRoutes.includes(pathname)) {
      return NextResponse.next();
    }

    // Require token for protected admin routes
    const token = request.cookies.get("access_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/auth/login", request.url));
    }

    return NextResponse.next();
  }

  // Localized routes (non-admin)
  const response = intlMiddleware(request);
  const locale = pathname.split("/")[1] || routing.defaultLocale;
  response.headers.set("x-locale", locale);
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
