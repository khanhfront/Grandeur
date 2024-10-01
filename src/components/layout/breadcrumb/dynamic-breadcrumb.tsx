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

const DynamicBreadcrumb = () => {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter((path) => path);

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
            const href = "/" + pathArray.slice(0, index + 1).join("/");
            const isLast = index === pathArray.length - 1;

            return (
              <BreadcrumbItem key={index} className="flex items-center">
                <span className="mx-2">/</span> {/* Separator */}
                <Link
                  href={href}
                  className={`${
                    isLast ? "text-foreground" : "text-blue-500 hover:underline"
                  }`}
                >
                  {capitalizeFirstLetter(path)}
                </Link>
              </BreadcrumbItem>
            );
          })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
