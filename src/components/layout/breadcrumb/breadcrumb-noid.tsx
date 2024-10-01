"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

// Hàm chuyển đổi thành chữ hoa chữ cái đầu và thay thế '-' bằng ' '
const capitalizeFirstLetter = (string: string) => {
  const formattedString = string.replace(/-/g, " "); // Thay thế tất cả '-' bằng dấu cách
  return formattedString.charAt(0).toUpperCase() + formattedString.slice(1);
};

// Hàm kiểm tra xem chuỗi có phải là số hay không
const isNumeric = (str: string) => {
  return /^\d+$/.test(str);
};

// Hàm tách bỏ ID nếu nó có dạng '-ID' ở cuối
const removeTrailingId = (path: string) => {
  const parts = path.split("-"); // Tách dựa trên dấu '-'
  const lastPart = parts[parts.length - 1]; // Phần cuối cùng
  if (isNumeric(lastPart)) {
    parts.pop(); // Bỏ phần cuối nếu nó là số
  }
  return parts.join("-"); // Ghép lại chuỗi không có ID
};

const DynamicBreadcrumbNoID = () => {
  const pathname = usePathname();
  let pathArray = pathname.split("/").filter((path) => path);

  return (
    <Breadcrumb className="text-sm mb-3">
      <BreadcrumbList className="flex items-center">
        <BreadcrumbItem>
          <Link href="/" className="text-blue-500 hover:underline">
            Home
          </Link>
        </BreadcrumbItem>
        {pathArray.length > 0 &&
          pathArray.map((path, index) => {
            const href = "/" + pathArray.slice(0, index + 1).join("/"); // URL giữ nguyên ID
            const isLast = index === pathArray.length - 1;

            // Loại bỏ ID khỏi phần label
            const label = capitalizeFirstLetter(removeTrailingId(path));

            return (
              <BreadcrumbItem key={index} className="flex items-center">
                <span className="mx-2">/</span> {/* Separator */}
                <Link
                  href={href}
                  className={`${
                    isLast ? "text-foreground" : "text-blue-500 hover:underline"
                  }`}
                >
                  {label} {/* Label không có ID */}
                </Link>
              </BreadcrumbItem>
            );
          })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumbNoID;
