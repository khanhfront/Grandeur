import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getToken,
  decodeToken,
  isTokenExpired,
  handleUnauthorizedRedirect,
} from "@/utils/authService";

export function middleware(request: NextRequest) {
  const token = getToken(request);
  const isAuthPage =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register";
  const currentPath = request.nextUrl.pathname;

  if (!token) {
    if (request.nextUrl.pathname.startsWith("/dashboard") && !isAuthPage) {
      return handleUnauthorizedRedirect(request, currentPath, "/login");
    } else if (request.nextUrl.pathname.startsWith("/user") && !isAuthPage) {
      return handleUnauthorizedRedirect(request, currentPath, "/login");
    }
  } else {
    const decoded = decodeToken(token);

    if (!decoded || isTokenExpired(decoded)) {
      return handleUnauthorizedRedirect(request, currentPath, "/login");
    }

    if (token && isAuthPage) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    const userRole = decoded.role;

    const adminPaths = ["/dashboard"];
    const userPaths = ["/user"];

    if (
      adminPaths.some((path) => request.nextUrl.pathname.startsWith(path)) &&
      userRole !== "admin"
    ) {
      return handleUnauthorizedRedirect(request, currentPath, "/unauthorized");
    }

    if (
      userPaths.some((path) => request.nextUrl.pathname.startsWith(path)) &&
      userRole !== "user"
    ) {
      return handleUnauthorizedRedirect(request, currentPath, "/unauthorized");
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/user/:path*", "/login", "/register"],
};
