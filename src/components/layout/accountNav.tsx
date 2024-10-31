"use client";
import { Button } from "../common/button/custom-header-button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { AlignJustify } from "lucide-react";
import { useEffect, useState, useMemo, Suspense } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoutLink } from "../common/link/logout-link";
import {
  CheckLoginResponse,
  checkUserLogin,
} from "@/serverActions/authActions";
import { usePathname, useRouter } from "next/navigation";
import { ProtectedButton } from "../common/button/protected-btn";
import { toast } from "sonner";

// Các route cho auth, user, admin
const authRoutes = [
  { name: "Đăng ký", path: "/register" },
  { name: "Đăng nhập", path: "/login" },
];

const userRoutes = [
  { name: "Thông tin cá nhân", path: "/account-settings/profile" },
  { name: "Đổi mật khẩu", path: "/account-settings/login-and-security" },
  { name: "Lịch sử đặt phòng", path: "/booking-history" },
  { name: "Cài đặt tài khoản", path: "/account-settings" },
  { name: "Danh sách yêu thích", path: "/favorites" },
];

const adminRoutes = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Quản lý người dùng", path: "/dashboard/user-accounts" },
  { name: "Quản lý đặt phòng", path: "/dashboard/bookings" },
  { name: "Thống kê", path: "/dashboard/statistics" },
];

export function AccountDropdownMenu() {
  const [routeNav, setRouteNav] = useState(authRoutes); // Quản lý các route
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Trạng thái đăng nhập
  const [user, setUser] = useState<UserAccount | null>(null); // Thông tin người dùng
  const pathName = usePathname(); // Để theo dõi sự thay đổi đường dẫn

  // Memo hóa avatar URL để tránh tính toán lại mỗi lần render
  const imgUrl = useMemo(
    () => user?.avatarImageUrl || "/avatar-svgrepo-com.svg",
    [user]
  );

  // Sử dụng useEffect để kiểm tra đăng nhập chỉ khi đường dẫn thay đổi
  useEffect(() => {
    const fetchUser = async () => {
      const loginData: CheckLoginResponse = await checkUserLogin();

      if (loginData && loginData.isLoggedIn) {
        setIsAuthenticated(true);
        if (loginData.role) {
          setRouteNav(loginData.role === "admin" ? adminRoutes : userRoutes);
        }

        if (loginData.role && loginData.role !== "admin") {
          try {
            const response = await fetch(
              `http://localhost:5280/api/UserAccounts/${loginData.userId}`
            );
            if (!response.ok) {
              throw new Error("Không thể lấy thông tin người dùng");
            }
            const userData: UserAccount = await response.json();
            setUser(userData);
          } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng:", error);
            setUser(null);
          }
        }
      } else {
        setIsAuthenticated(false);
        setRouteNav(authRoutes);
        setUser(null);
      }
    };

    fetchUser().catch((error) =>
      console.error("Lỗi khi kiểm tra đăng nhập:", error)
    );
  }, [pathName]); // Chỉ chạy khi đường dẫn thay đổi

  // Memo hóa các route để tránh render lại không cần thiết
  const memoizedRoutes = useMemo(
    () =>
      routeNav.map((route) => (
        <DropdownMenuItem key={route.path} asChild>
          <Link href={route.path} className="text-sm sm:text-base">
            {route.name}
          </Link>
        </DropdownMenuItem>
      )),
    [routeNav]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          aria-label="user account"
          className="hidden rounded-full p-0.5 sm:py-1 sm:px-3 border border-border hover:border-background md:flex items-center"
        >
          <AlignJustify className="h-4 w-4 md:h-5 md:w-5" />
          <Avatar className="ml-2 w-6 h-6 sm:w-9 sm:h-9">
            <AvatarImage
              src={imgUrl} // Không tính toán lại URL
              alt="user avatar"
              className="w-6 h-6 sm:w-9 sm:h-9"
            />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-md:hidden">
        <DropdownMenuGroup>
          {memoizedRoutes} {/* Render các route đã memo hóa */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="https://github.com" className="text-sm sm:text-base">
            GitHub
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/support" className="text-sm sm:text-base">
            Support
          </Link>
        </DropdownMenuItem>
        {isAuthenticated && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LogoutLink />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function MAccountDropdownMenu() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserAccount | null>(null);
  const pathName = usePathname();

  // Memo hóa avatar URL để tránh tính toán lại mỗi lần render
  const imgUrl = useMemo(
    () => user?.avatarImageUrl || "/avatar-svgrepo-com.svg",
    [user]
  );

  // Sử dụng useEffect để kiểm tra đăng nhập chỉ khi đường dẫn thay đổi
  useEffect(() => {
    const fetchUser = async () => {
      const loginData: CheckLoginResponse = await checkUserLogin();

      if (loginData.isLoggedIn) {
        setIsAuthenticated(true);

        if (loginData.role !== "admin") {
          try {
            const response = await fetch(
              `http://localhost:5280/api/UserAccounts/${loginData.userId}`
            );
            if (!response.ok) {
              throw new Error("Không thể lấy thông tin người dùng");
            }
            const userData: UserAccount = await response.json();
            setUser(userData);
          } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng:", error);
            setUser(null);
          }
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    fetchUser().catch((error) =>
      console.error("Lỗi khi kiểm tra đăng nhập:", error)
    );
  }, [pathName]);

  const router = useRouter();
  const handlClick = () => {
    if (isAuthenticated && user && pathName !== "/account-settings") {
      router.push("/account-settings");
    } else toast("Bạn đang ở trang tài khoản");
  };

  return (
    <Suspense>
      <ProtectedButton
        onClick={handlClick}
        variant={"ghost"}
        loadingChildren={
          <>
            <Avatar className="w-4 h-4 min-[380px]:w-5 min-[380px]:h-5 min-[300px]:outline min-[300px]:outline-offset-2 min-[300px]:outline-[1px]">
              <AvatarImage
                src={imgUrl} // Không tính toán lại URL
                alt="user avatar"
                className="w-4 h-4 min-[380px]:w-5 min-[380px]:h-5"
              />
            </Avatar>
            <div className="text-xs mt-1 hidden min-[380px]:inline">Hồ sơ</div>
          </>
        }
        aria-label="user account"
        className=" inline-flex flex-col flex-1 w-full px-0 py-0 md:hidden items-center hover:bg-background hover:text-foreground"
      >
        <Avatar className="w-4 h-4 min-[380px]:w-5 min-[380px]:h-5 min-[300px]:outline min-[300px]:outline-offset-2 min-[300px]:outline-[1px]">
          <AvatarImage
            src={imgUrl} // Không tính toán lại URL
            alt="user avatar"
            className="w-4 h-4 min-[380px]:w-5 min-[380px]:h-5"
          />
        </Avatar>
        <div className="text-xs mt-1 hidden min-[380px]:inline">Hồ sơ</div>
      </ProtectedButton>
    </Suspense>
  );
}
