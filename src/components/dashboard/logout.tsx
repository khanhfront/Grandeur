"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { handleLogout } from "@/utils/authService"; // Import hàm handleLogout
import { LogOut } from "lucide-react";

interface logoutProp {
  isMinimized: boolean;
}

export default function LogoutButton({ isMinimized }: logoutProp) {
  const router = useRouter();

  const onLogoutClick = async () => {
    const { success, message } = await handleLogout();

    if (success) {
      toast.success(message);

      // Chuyển hướng về trang chủ
      router.push("/");
    } else {
      toast.error(message);
    }
  };

  return (
    <button
      onClick={onLogoutClick}
      className="bg-transparent flex flex-1 items-center gap-2 py-2 pl-1"
    >
      <LogOut className="size-4 flex-none" />
      <span
        className={`font-medium text-sm transition-opacity duration-500  ${
          !isMinimized ? "opacity-100" : "opacity-0"
        }`}
      >
        {!isMinimized ? "Đăng xuất" : ""}
      </span>
    </button>
  );
}
