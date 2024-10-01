"use server";
import { decodeToken, isTokenExpired } from "@/utils/authService";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

interface CheckLoginResponse {
  isLoggedIn: boolean;
  role?: string;
}

export async function checkUserLogin(): Promise<CheckLoginResponse> {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return { isLoggedIn: false };
  }
  const decodedToken = decodeToken(token);
  if (isTokenExpired(decodedToken)) {
    return { isLoggedIn: false };
  }
  return {
    isLoggedIn: true,
    role: decodedToken.role,
  };
}

export async function revalidateF(tag: string) {
  revalidateTag(tag);
}
