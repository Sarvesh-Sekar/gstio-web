import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { userData } from "@/src/helpers/staticData";
import { getCookie } from "@/src/helpers/cookieHelper";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = cookies();
  const isAuthenticate = request.cookies.has("AuthToken");
  const isAuthenticated = getCookie("AuthToken")!==null;
  const user = request.cookies.get("userData");
  const userData = JSON?.parse(user?.value || "{}");

  const protectedRoutes = ["/home", "/addInvoice", "/dashboard", "/home"];

  // if (!userData?.details && pathname !== "/register") {
  //   return NextResponse.redirect(new URL("/register", request.url));
  // }

  console.log(isAuthenticated)

  if (!!isAuthenticated) {
    // Case 0: If userData is missing completely → go to signIn
    console.log(!userData?.userId + " userData  " + userData);

    if(protectedRoutes.includes(pathname) || pathname === "/")
    {
          return NextResponse.redirect(new URL("/signIn", request.url));
    }
  

    if (!userData?.userId && pathname !== "/signup") {
      return NextResponse.redirect(new URL("/signup", request.url));
    }

    // Case 1: Protected routes and root require login
    // else if (protectedRoutes.includes(pathname) || pathname === "/") {
    //   return NextResponse.redirect(new URL("/signIn", request.url));
    // }

    // Case 2: If user has no userId → also go to signIn
    else if (!userData && !userData?.details && pathname !== "/register") {
      return NextResponse.redirect(new URL("/register", request.url));
    }

    // Case 3: User must complete registration
   else  if (!userData && !userData?.details && !userData?.verified && pathname !== "/generateOtp") {
      return NextResponse.redirect(new URL("/generateOtp", request.url));
    }

    // Case 4: User must verify account
    // else if (
    //   userData?.details &&
    //   !userData?.verified &&
    //   pathname !== "/generateOtp"
    // ) {
    //   return NextResponse.redirect(new URL("/generateOtp", request.url));
    // }
  }

  // Case 4: Authenticated user should not see login/signup/root
  if (
    isAuthenticated &&
    (pathname === "/signIn" || pathname === "/signup" || pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

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
