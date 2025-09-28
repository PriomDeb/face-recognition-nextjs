// // // // middleware.ts

// // // import { NextResponse } from "next/server";
// // // import type { NextRequest } from "next/server";

// // // export function middleware(req: NextRequest) {
// // //   const url = req.nextUrl.clone();

// // //   // Skip static files
// // //   if (
// // //     url.pathname.startsWith("/_next") ||
// // //     url.pathname.startsWith("/favicon.ico") ||
// // //     url.pathname.startsWith("/api")
// // //   ) {
// // //     return NextResponse.next();
// // //   }

// // //   const siteAllowed = process.env.NEXT_PUBLIC_SITE_ALLOWED === "true";

// // //   if (!siteAllowed) {
// // //     url.pathname = "/blocked"; // redirect to blocked page
// // //     return NextResponse.rewrite(url);
// // //   }

// // //   return NextResponse.next();
// // // }

// // // // Apply to all pages except static files
// // // export const config = {
// // //   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// // // };
// // // middleware.ts
// // import { NextResponse } from "next/server";
// // import type { NextRequest } from "next/server";
// // import jwt from "jsonwebtoken";

// // const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// // export function middleware(req: NextRequest) {
// //   const url = req.nextUrl.clone();

// //   // allow static assets, api, sign-in and sign-up without auth
// //   if (
// //     url.pathname.startsWith("/_next") ||
// //     url.pathname.startsWith("/favicon.ico") ||
// //     url.pathname.startsWith("/api") ||
// //     url.pathname.startsWith("/sign-in") ||
// //     url.pathname.startsWith("/sign-up")
// //   ) {
// //     return NextResponse.next();
// //   }

// //   // get token from cookies
// //   const token = req.cookies.get("token")?.value;

// //   if (!token) {
// //     // no token → redirect to sign-in
// //     url.pathname = "/sign-in";
// //     return NextResponse.redirect(url);
// //   }

// //   try {
// //     // verify JWT
// //     jwt.verify(token, JWT_SECRET);
// //     return NextResponse.next();
// //   } catch (err) {
// //     // invalid/expired token → redirect to sign-in
// //     url.pathname = "/sign-in";
// //     return NextResponse.redirect(url);
// //   }
// // }

// // // Apply middleware to all routes except static assets
// // export const config = {
// //   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// // };
// // middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// export function middleware(req: NextRequest) {
//   const url = req.nextUrl.clone();

//   // allow sign-in, sign-up, api, static files
//   if (
//     url.pathname.startsWith("/_next") ||
//     url.pathname.startsWith("/favicon.ico") ||
//     url.pathname.startsWith("/api") ||
//     url.pathname.startsWith("/sign-in") ||
//     url.pathname.startsWith("/sign-up")
//   ) {
//     return NextResponse.next();
//   }

//   // check cookie
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     url.pathname = "/sign-in";
//     return NextResponse.redirect(url);
//   }

//   try {
//     jwt.verify(token, JWT_SECRET);
//     return NextResponse.next();
//   } catch (err) {
//     url.pathname = "/sign-in";
//     return NextResponse.redirect(url);
//   }
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const COOKIE_NAME = "auth_token"; // ✅ same name

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/api") ||
    pathname === "/sign-in" ||
    pathname === "/sign-up"
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
