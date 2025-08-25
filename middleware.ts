import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = cookies();
  const isAuthenticated = request.cookies.has("AuthToken");
  const user = request.cookies.get("userData");
  const userData = JSON?.parse(user?.value || "{}");

  const protectedRoutes = ["/home", "/addInvoice", "/dashboard", "/home"];

  // if (!userData?.details && pathname !== "/register") {
  //   return NextResponse.redirect(new URL("/register", request.url));
  // }

  if (
    (protectedRoutes.includes(pathname) || pathname === "/") &&
    !isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  if (
    !!isAuthenticated &&
    (pathname === "/login" || pathname === "/signup" || pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - And any specific routes you want to exclude (e.g., login, public API routes)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|login).*)", // Matches everything except the listed
  ],
};
