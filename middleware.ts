import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
// import { userData } from "@/src/helpers/staticData";
// import { getCookie } from "@/src/helpers/cookieHelper";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("AuthToken")?.value;
  const user = request.cookies.get("userData");
  const userData = JSON?.parse(user?.value || "{}");

  const isAuthenticated =
    token === "null" || token === undefined ? false : true;

  const protectedRoutes = ["/home", "/addInvoice", "/dashboard", "/products"];

  // If not authenticated → redirect to /signIn
  if (
    !isAuthenticated &&
    (protectedRoutes.includes(pathname) || pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  // If authenticated but trying to access signIn/signup/root → redirect to dashboard
  if (
    isAuthenticated &&
    (pathname === "/signIn" || pathname === "/signup" || pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Optional: handle registration flow
  // if (isAuthenticated && !userData?.userId && pathname !== "/signup") {
  //   return NextResponse.redirect(new URL("/signup", request.url));
  // }

  return NextResponse.next();
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
