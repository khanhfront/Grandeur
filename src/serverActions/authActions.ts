"use server";
import { decodeToken, isTokenExpired } from "@/utils/authService";

import { cookies } from "next/headers";

export interface CheckLoginResponse {
  isLoggedIn: boolean;
  role?: string;
  userId?: number;
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
    userId: decodedToken.id,
  };
}
