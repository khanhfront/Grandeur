import ButtonLink from "@/components/common/button/link-button";
import LogoutButton from "@/components/common/button/logout-button";
import { maskEmail } from "@/utils/formatText";
import Link from "next/link";
import {
  FaUser,
  FaShieldAlt,
  FaMoneyBillWave,
  FaFileInvoice,
  FaBell,
  FaEye,
  FaGlobe,
  FaSuitcase,
  FaToolbox,
} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

export default function AccountSettings({
  name,
  email,
  userId,
}: {
  name: string;
  email: string;
  userId: number;
}) {
  const settings = [
    {
      icon: FaUser,
      title: "Thông tin cá nhân",
      description:
        "Cung cấp thông tin cá nhân và cách chúng tôi có thể liên hệ với bạn",
      url: "/account-settings/profile",
    },
    {
      icon: FaShieldAlt,
      title: "Đăng nhập & bảo mật",
      description: "Cập nhật mật khẩu và bảo mật tài khoản của bạn",
      url: "/account-settings/login-security",
    },
    {
      icon: FaMoneyBillWave,
      title: "Số dư và giao dịch",
      description:
        "Xem số dư, cân đối các khoản thanh toán, chi trả, phiếu quà tặng và thẻ quà tặng",
      url: "/account-settings/balance",
    },
    {
      icon: FaFileInvoice,
      title: "Thuế",
      description: "Quản lý thông tin người nộp thuế và tài liệu thuế",
      url: "/account-settings/taxes",
    },
    {
      icon: FaBell,
      title: "Thông báo",
      description: "Chọn tùy chọn thông báo và cách bạn muốn được liên hệ",
      url: "/account-settings/notifications",
    },
    {
      icon: FaEye,
      title: "Quyền riêng tư & chia sẻ",
      description:
        "Quản lý dữ liệu cá nhân, dịch vụ kết nối và cài đặt chia sẻ dữ liệu",
      url: "/account-settings/privacy-sharing",
    },
    {
      icon: FaGlobe,
      title: "Tùy chọn toàn cầu",
      description: "Đặt ngôn ngữ, tiền tệ và múi giờ mặc định của bạn",
      url: "/account-settings/global-preferences",
    },
    {
      icon: FaSuitcase,
      title: "Du lịch công việc",
      description:
        "Thêm email công việc để hưởng lợi ích trong các chuyến công tác",
      url: "/account-settings/travel-for-work",
    },
    {
      icon: FaToolbox,
      title: "Công cụ quản lý chuyên nghiệp",
      description:
        "Nhận công cụ chuyên nghiệp nếu bạn quản lý nhiều bất động sản trên Airbnb",
      url: "/account-settings/professional-hosting-tools",
    },
  ];

  return (
    <div className="bg-background text-foreground pb-2 md:pb-4">
      <div className="text-xs sm:text-sm xl:text-base sm:flex items-center justify-between pb-2">
        <div className="sm:flex items-center md:gap-4 gap-2">
          <div className="sm:flex gap-2 text-sm md:text-base xl:text-xl font-bold">
            <span className="truncate block max-sm:mt-2">{name}</span>
            <span className="font-normal block truncate">
              {maskEmail(email)}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center md:gap-4 gap-2 max-sm:mt-2">
            <ButtonLink
              url="/host"
              className="border border-foreground max-sm:mt-1"
            >
              Cho thuê ngay
            </ButtonLink>
            <Link
              href={`/users/show/${userId}`}
              className="max-sm:flex max-sm:justify-between max-sm:items-center max-sm:px-1
               max-sm:border-x max-sm:border-foreground max-sm:my-2 
               font-semi-bold text-primary block"
            >
              Truy cập hồ sơ <CgProfile className="sm:hidden" />
            </Link>
          </div>
        </div>

        <LogoutButton />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-2 sm:gap-4 mt-4">
        {settings.map((setting, index) => (
          <Link
            href={setting.url}
            key={index}
            className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow bg-card text-card-foreground cursor-pointer dark:shadow-gray-700"
          >
            <setting.icon className="text-2xl mb-2" />
            <h2 className="text-lg font-semibold">{setting.title}</h2>
            <p className="text-sm">{setting.description}</p>
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center text-sm mt-2 mb-5">
        <span>Bạn cần vô hiệu hóa tài khoản của mình?</span>
        <Link
          href={"/account-settings/cancel-account"}
          className="text-xs font-semibold underline"
        >
          Vô hiệu hóa ngay bây giờ
        </Link>
      </div>
    </div>
  );
}
