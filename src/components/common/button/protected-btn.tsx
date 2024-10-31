"use client";

import { checkUserLogin } from "@/serverActions/authActions";
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
  loadingChildren?: ReactNode;
  variant?:
    | "link"
    | "destructive"
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  onClick?: () => void;
  type?: "submit" | "button" | "reset" | undefined;
  isAbleDisable?: boolean;
}

export function ProtectedButton({
  className,
  children,
  onClick = () => {},
  variant,
  loadingChildren,
  type,
  isAbleDisable = true,
}: protectedBtnProps) {
  const [btnState, setBtnState] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const handleClick = async () => {
    setBtnState(true);
    const isLogged = await checkUserLogin();

    if (isLogged.isLoggedIn && isLogged.role === "user") {
      onClick();
      setBtnState(false);
    } else if (isLogged.isLoggedIn) {
      const msg =
        "Role " +
        isLogged.role +
        " không thể thực hiện hành động này, đăng xuất để tiếp tục";
      toast.error(msg, {
        action: <RefreshLogoutButton />,
      });
      setBtnState(false);
    } else {
      if (!pathname.startsWith("/login")) {
        const searchParamsUrl = new URLSearchParams(
          searchParams.get("redirect")?.toString()
        );
        console.log(searchParamsUrl.toString());
        searchParamsUrl.set("redirect", pathname);
        console.log(searchParamsUrl.toString());
        router.push(`/login?${searchParamsUrl}`);
      } else {
        toast.message("Bạn cần đăng nhập trước");
      }
      setBtnState(false);
    }
  };
  return (
    <Button
      type={type}
      variant={variant ? variant : "default"}
      className={className}
      disabled={isAbleDisable ? btnState : false}
      onClick={handleClick}
    >
      {btnState && isAbleDisable ? loadingChildren || "Loading" : children}
    </Button>
  );
}
