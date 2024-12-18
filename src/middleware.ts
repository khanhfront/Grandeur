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
  const adminPaths = ["/dashboard"];
  const userPaths = ["/account-settings", "/message", "/payment"];
  const currentPath = request.nextUrl.pathname;

  if (!token) {
    if (
      adminPaths.some((path) => request.nextUrl.pathname.startsWith(path)) &&
      !isAuthPage
    ) {
      return handleUnauthorizedRedirect(request, currentPath, "/login");
    } else if (
      userPaths.some((path) => request.nextUrl.pathname.startsWith(path)) &&
      !isAuthPage
    ) {
      return handleUnauthorizedRedirect(request, currentPath, "/login");
    }
  } else {
    const decoded = decodeToken(token);

    if (!decoded || isTokenExpired(decoded)) {
      return handleUnauthorizedRedirect(request, currentPath, "/login");
    }

    if (decoded && isAuthPage && !isTokenExpired(decoded)) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    const userRole = decoded.role;

    if (
      adminPaths.some((path) => request.nextUrl.pathname.startsWith(path)) &&
      userRole !== "admin"
    ) {
      return handleUnauthorizedRedirect(request, currentPath, "/login");
    }

    if (
      userPaths.some((path) => request.nextUrl.pathname.startsWith(path)) &&
      userRole !== "user"
    ) {
      return handleUnauthorizedRedirect(request, currentPath, "/login");
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/account-settings/:path*",
    "/message/:path*",
    "/payment/:path*",
    "/login",
    "/register",
  ],
};
