import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Skip static files
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/favicon.ico") ||
    url.pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  const siteAllowed = process.env.NEXT_PUBLIC_SITE_ALLOWED === "true";

  if (!siteAllowed) {
    url.pathname = "/blocked"; // redirect to blocked page
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Apply to all pages except static files
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
