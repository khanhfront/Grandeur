import { checkUserLogin } from "@/serverActions/authActions";
import { UserAboutField } from "@/components/common/detail/user/profile-field/user-about-field";
import { UserAddressField } from "@/components/common/detail/user/profile-field/user-address-field";
import { UserAvatarField } from "@/components/common/detail/user/profile-field/user-avatar-field";
import { UserDobField } from "@/components/common/detail/user/profile-field/user-dob-field-info";
import { UserEmailField } from "@/components/common/detail/user/profile-field/user-email-field-info";
import { UserGenderField } from "@/components/common/detail/user/profile-field/user-gender-field";
import { UserNameInfoField } from "@/components/common/detail/user/profile-field/user-name-field-info";
import { UserPhoneField } from "@/components/common/detail/user/profile-field/user-phone-field-info";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import RightBar from "./right-bar";
interface UserProfile {
  userId: number;
  userFirstName: string;
  userLastName: string;
  avatarImageUrl: string;
  emailAddress: string;
  phoneNumber: string;
  genderId: number;
  userDob: string; // Nếu muốn xử lý ngày giờ dưới dạng Date, bạn có thể dùng kiểu Date thay vì string
  userAbout: string;
  userPassword: string;
  districtName: string;
  provinceName: string;
  districtId: number;
  accountStatus: string;
}

const ProfilePage = async () => {
  const { isLoggedIn, role, userId } = await checkUserLogin();
  if (!isLoggedIn) {
    toast("Bạn cần đăng nhập để tiếp tục!");
    return redirect("/login");
  }
  if (role === "admin") {
    toast(
      "Role admin không có quyền vào trang này, đang chuyển qua trang quản trị"
    );
    return redirect("/dashboard");
  }
  const res = await fetch(`http://localhost:5280/api/useraccounts/${userId}`, {
    next: {
      tags: [`user-${userId}`],
    },
  });
  if (!res.ok) {
    return <div>Lỗi khi lấy dữ liệu người dùng</div>;
  }
  const User: UserProfile = await res.json();
  return (
    <div>
      <Label className="text-sm md:text-lg">Thông tin cá nhân</Label>
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-2 md:gap-4 pt-2 col-span-full md:col-span-2">
          <UserAvatarField
            userId={User.userId}
            userLastName={User.userLastName}
            avatarImageUrl={User.avatarImageUrl}
          />
          <UserNameInfoField
            userId={userId}
            firstName={User.userFirstName}
            lastName={User.userLastName}
          />
          <UserEmailField
            emailAddress={User.emailAddress}
            userId={User.userId}
          />
          <UserPhoneField phoneNumber={User.phoneNumber} userId={User.userId} />
          <UserDobField userDob={User.userDob} userId={User.userId} />
          <UserGenderField genderId={User.genderId} userId={User.userId} />
          <UserAboutField userAbout={User.userAbout} userId={User.userId} />
          {/* Các field này để tôi làm */}
          <UserAddressField districtId={User.districtId} userId={User.userId} />
        </div>
        <div className="md:flex flex-col hidden col-span-1">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
