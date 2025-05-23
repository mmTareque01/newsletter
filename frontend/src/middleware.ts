import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("refreshToken")?.value;
  const pathname = request.nextUrl.pathname;

  const authPages = ["/signin", "/signup"];
  const isAuthPage = authPages.includes(pathname);
  const isProtectedRoute = pathname.startsWith("/dashboard");

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", // matches all /dashboard pages
    "/signin",
    "/signup",
  ],
};
