"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { handleLogout } from "@/utils/authService";
import Link from "next/link";

export function LogoutLink() {
  const router = useRouter();

  const onLogoutClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của link
    const { success, message } = await handleLogout();

    if (success) {
      router.push("/login");
      toast.success(message, {
        duration: 1000,
      });
    } else {
      toast.error(message);
      router.refresh();
    }
  };

  return (
    <Link
      href="/" // Redirect to login page
      onClick={onLogoutClick}
      className="w-full text-sm sm:text-base"
    >
      Log out
    </Link>
  );
}
