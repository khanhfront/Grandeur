import Link from "next/link";

const footerItems = {
  support: [
    { title: "Trung tâm trợ giúp", href: "/" },
    { title: "Nhận trợ giúp với sự cố an toàn", href: "/" },
    { title: "GrandeurCover", href: "/" },
    { title: "Chống phân biệt", href: "/" },
    { title: "Hỗ trợ người khuyết tật", href: "/" },
    { title: "Tùy chọn hủy bỏ", href: "/" },
    {
      title: "Báo cáo mối quan tâm về khu phố",
      href: "/",
    },
  ],
  hosting: [
    { title: "Cho thuê nhà của bạn", href: "/" },
    { title: "GrandeurCover cho chủ nhà", href: "/" },
    { title: "Tài nguyên cho chủ nhà", href: "/" },
    { title: "Diễn đàn cộng đồng", href: "/" },
    { title: "Cho thuê có trách nhiệm", href: "/" },
    {
      title: "Căn hộ thân thiện với chủ nhà",
      href: "/",
    },
    {
      title: "Tham gia lớp học cho thuê miễn phí",
      href: "/",
    },
  ],
  grandeur: [
    { title: "Phòng tin tức", href: "/" },
    { title: "Tính năng mới", href: "/" },
    { title: "Sự nghiệp", href: "/" },
    { title: "Nhà đầu tư", href: "/" },
    { title: "Thẻ quà tặng", href: "/" },
    { title: "Kỳ nghỉ khẩn cấp tại Grandeur", href: "/" },
  ],
};

//fake footer
const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-4 md:py-8 md:pt-12">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(footerItems).map(([key, items]) => (
          <div key={key}>
            <h3 className="font-semibold text-lg mb-4">
              {key === "support"
                ? "Hỗ trợ"
                : key === "hosting"
                ? "Cho thuê"
                : "Grandeur"}
            </h3>
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="hover:underline">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center mt-8 text-sm border-t ">
        <p>
          © 2024 Grandeur, Inc. ·{" "}
          <Link href="/terms" className="hover:underline">
            Điều khoản
          </Link>{" "}
          ·{" "}
          <Link href="/privacy" className="hover:underline">
            Chính sách bảo mật
          </Link>{" "}
          ·{" "}
          <Link href="/privacy-choices" className="hover:underline">
            Lựa chọn của bạn về quyền riêng tư
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
