"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { handleLogout } from "@/utils/authService"; // Import hàm handleLogout

export default function LogoutButton() {
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

  return <Button onClick={onLogoutClick}>Đăng xuất</Button>;
}
