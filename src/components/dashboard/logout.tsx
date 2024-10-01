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

      router.push("/login");
    } else {
      toast.error(message);
    }
  };

  return (
    <button
      onClick={onLogoutClick}
      className="bg-background flex flex-1 items-center gap-2 py-1 pl-1 pt-2 sticky bottom-0 hover:bg-accent rounded-lg"
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
