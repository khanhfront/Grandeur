"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { handleLogout } from "@/utils/authService"; // Import hàm handleLogout
import Link from "next/link";

export function LogoutLink() {
  const router = useRouter();

  const onLogoutClick = async () => {
    const { success, message } = await handleLogout();

    if (success) {
      toast.success(message);

      // Chuyển hướng về trang chủ
      router.push("/");
      router.refresh();
    } else {
      toast.error(message);
      router.refresh();
    }
  };

  return (
    <Link
      href="/login" // Redirect to login page
      onClick={onLogoutClick}
      className="w-full text-sm sm:text-base"
    >
      Log out
    </Link>
  );
}
