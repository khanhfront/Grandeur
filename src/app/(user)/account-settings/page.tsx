import { checkUserLogin } from "@/serverActions/authActions";
import { ReloadButton } from "@/components/common/button/reload-button";
import { Metadata } from "next";
import AccountSettings from "./account-setting";
import { UserRequiredPage } from "@/components/common/auth/user-required";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Cài đặt tài khoản",
  description: "Trang cài đặt tài khoản trên Grandeur.",
};

export interface CheckLoginResponse {
  isLoggedIn: boolean;
  role?: string;
  userId?: number;
}

export default async function Page() {
  const { role, userId } = await checkUserLogin();
  if (!userId || role !== "user") {
    return <UserRequiredPage />;
  }

  let userInfo;

  try {
    const res = await fetch(`http://localhost:5280/api/useraccounts/${userId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch user data");
    }

    userInfo = await res.json();
  } catch (error) {
    return (
      <div>
        Lỗi lấy dữ liệu: {`${error}`} <ReloadButton />
      </div>
    );
  }

  if (!userInfo) {
    return <div>Đang tải thông tin người dùng...</div>;
  }

  return (
    <>
      <Label className="mt-2">Tài Khoản</Label>
      <AccountSettings
        name={userInfo.userFirstName + " " + userInfo.userLastName}
        email={userInfo.emailAddress}
        userId={userId}
      />
    </>
  );
}
