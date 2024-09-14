import { Button } from "../button/custom-header-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link"; // Import Next.js Link
import { AlignJustify } from "lucide-react";
import { cookies } from "next/headers"; // Lấy cookies từ request headers
import { a } from "@/utils/antiSSL";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { decodeToken, isTokenExpired } from "@/utils/authService";
import { LogoutLink } from "../link/logout-link";

const authRoutes: Route[] = [
  { name: "Đăng ký", path: "/register" },
  { name: "Đăng nhập", path: "/login" },
];

const protectedRoutes: Route[] = [
  { name: "Thông tin cá nhân", path: "/profile" },
  { name: "Đổi mật khẩu", path: "/change-password" },
  { name: "Lịch sử đặt phòng", path: "/booking-history" },
  { name: "Cài đặt tài khoản", path: "/account-settings" },
  { name: "Danh sách yêu thích", path: "/favorites" },
];

export async function AccountDropdownMenu() {
  let routeNav: Route[];
  let isAuthenticated = false;
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  let user: UserAccount | null = null;
  if (token?.value) {
    const decoded = decodeToken(token.value);
    if (isTokenExpired(decoded)) {
      routeNav = authRoutes;
    } else {
      routeNav = protectedRoutes;
      isAuthenticated = true;
      if (decoded.id) {
        const response = await a.get(
          `https://localhost:7209/api/UserAccounts/${decoded.id}`
        );
        if (response.status === 200) {
          user = response.data;
        }
      }
    }
  } else {
    routeNav = authRoutes;
  }
  const imgUrl = user?.avatarImageUrl || "/avatar.jpg";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className="hidden rounded-full p-0.5 sm:py-1 sm:px-3 border border-border hover:border-background md:flex items-center"
        >
          <AlignJustify className="h-4 w-4 md:h-5 md:w-5" />
          <Avatar className="ml-2 w-6 h-6 sm:w-9 sm:h-9">
            <AvatarImage src={imgUrl} />
            <AvatarFallback className="text-blue-500">
              {user?.userLastName[0] || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          {routeNav.map((route) => (
            <DropdownMenuItem key={route.path} asChild>
              <Link href={route.path} className="text-sm sm:text-base">
                {route.name}
                {/* Có thể thêm DropdownMenuShortcut nếu cần */}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
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
              <DropdownMenuItem asChild>
                <Link href="/team" className="text-sm sm:text-base">
                  Team
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="text-sm sm:text-base">
                  Invite users
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/invite/email"
                        className="text-sm sm:text-base"
                      >
                        Email
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/invite/message"
                        className="text-sm sm:text-base"
                      >
                        Message
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/invite/more"
                        className="text-sm sm:text-base"
                      >
                        More...
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem asChild>
                <Link href="/team/new" className="text-sm sm:text-base">
                  New Team
                  <DropdownMenuShortcut className="text-xs sm:text-sm">
                    ⌘+T
                  </DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
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
