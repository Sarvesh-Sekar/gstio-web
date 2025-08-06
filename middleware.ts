import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.has("AuthToken");
  

  const protectedRoutes = ["/home", "/addInvoice" ,"/dashboard" ,"/home"];

  if ((protectedRoutes.includes(pathname) || pathname === "/") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  if (
    !!isAuthenticated &&
    (pathname === "/login" || pathname === "/signup" || pathname === "/")
  ) {
    console.log(`Redirecting authenticated user from ${pathname} to /home`);
    return NextResponse.redirect(new URL("/home", request.url));
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
