import { toast } from "sonner";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { cookies } from "next/headers";

export async function handleLogin(
  email: string,
  password: string,
  router: AppRouterInstance,
  redirect: string | null
) {
  const res = await fetch("http://localhost:5280/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Email: email,
      Password: password,
    }),
    credentials: "include",
  });

  if (res.ok) {
    const data = await res.json();
    const userRole = data.role;

    if (redirect) {
      // Kiểm tra xem phần đầu của redirect là /dashboard hoặc /user
      if (redirect.startsWith("/dashboard") && userRole !== "admin") {
        toast.error("Bạn không có quyền truy cập trang này.");
        router.push("/"); // Chuyển hướng đến trang không có quyền
      } else if (redirect.startsWith("/user") && userRole !== "user") {
        toast.error("Bạn không có quyền truy cập trang này.");
        router.push("/"); // Chuyển hướng đến trang không có quyền
      } else {
        router.push(redirect); // Chuyển hướng đến trang mong muốn
        toast.success(data.message || "Đăng nhập thành công");
      }
    } else {
      // Điều hướng mặc định dựa trên role
      const defaultRedirectUrl = userRole === "admin" ? "/dashboard" : "/user";
      router.push(defaultRedirectUrl);
      toast.success(data.message || "Welcome back!");
    }
  } else {
    const data = await res.json();
    toast.error(data.message || "Đăng nhập thất bại");
  }
}

// utils/authService.ts
export const handleLogout = async () => {
  const res = await fetch("http://localhost:5280/api/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (res.ok) {
    const data = await res.json();
    return { success: true, message: data.message || "Đăng xuất thành công" };
  } else {
    return { success: false, message: "Oops, đã có lỗi xảy ra khi đăng xuất!" };
  }
};

// authService.ts
export function getToken(request: NextRequest): string | null {
  const token = request.cookies.get("token")?.value;
  return token || null;
}

export function decodeToken(token: string): any {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    return null;
  }
}

export function isTokenExpired(decodedToken: any): boolean {
  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
}

export function handleUnauthorizedRedirect(
  request: NextRequest,
  currentPath: string,
  redirectPath: string
) {
  const url = request.nextUrl.clone();
  url.pathname = redirectPath;
  url.searchParams.set("redirect", currentPath);

  const response = NextResponse.redirect(url);

  if (redirectPath === "/login" || redirectPath === "/register") {
    response.cookies.set("token", "", { maxAge: -1, path: "/" });
  }

  return response;
}
