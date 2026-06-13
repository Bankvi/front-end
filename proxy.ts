import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./i18n";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export default function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Support ?lang=fr ou ?lang=en
  const langParam = searchParams.get("lang");
  if (langParam && locales.includes(langParam as "fr" | "en")) {
    const pathWithoutLocale = pathname.replace(/^\/(fr|en)/, "") || "/";
    const url = request.nextUrl.clone();
    url.pathname = `/${langParam}${pathWithoutLocale}`;
    url.searchParams.delete("lang");
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
