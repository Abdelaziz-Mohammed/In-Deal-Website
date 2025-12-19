import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localeDetection: true,
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const pathname = request.nextUrl.pathname;
  const locale = pathname.split("/")[1] || routing.defaultLocale;

  response.headers.set("x-locale", locale);

  return response;
}

export const config = {
  matcher: ["/((?!admin|api|trpc|_next|_vercel|.*\\..*).*)"],
};
