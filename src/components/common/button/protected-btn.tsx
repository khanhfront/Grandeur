"use client";

import { checkUserLogin } from "@/actions/serverActions";
import { Button } from "@/components/ui/button";
import { handleLogout } from "@/utils/authService";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

function RefreshLogoutButton() {
  const router = useRouter();

  const onLogoutClick = async () => {
    const { success, message } = await handleLogout();

    if (success) {
      toast.success(message);
      router.refresh();
    } else {
      toast.error(message);
    }
  };

  return <Button onClick={onLogoutClick}>Đăng xuất</Button>;
}

interface protectedBtnProps {
  className?: string;
  children?: ReactNode;
  onClick: () => void;
}

export function ProtectedButton({
  className,
  children,
  onClick,
}: protectedBtnProps) {
  const [btnState, setBtnState] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleClick = async () => {
    setBtnState(true);
    const isLogged = await checkUserLogin();
    setBtnState(false);
    if (isLogged.isLoggedIn && isLogged.role === "user") {
      onClick();
    } else if (isLogged.isLoggedIn) {
      const msg =
        "Role " +
        isLogged.role +
        " không thể thực hiện hành động này, đăng xuất để tiếp tục";
      toast.error(msg, {
        action: <RefreshLogoutButton />,
      });
    } else {
      const searchParamsUrl = new URLSearchParams(
        searchParams.get("redirect")?.toString()
      );
      searchParamsUrl.set("redirect", pathname);
      router.push(`/login?${searchParamsUrl}`);
    }
  };
  return (
    <Button className={className} disabled={btnState} onClick={handleClick}>
      {btnState ? "Loading" : children}
    </Button>
  );
}
