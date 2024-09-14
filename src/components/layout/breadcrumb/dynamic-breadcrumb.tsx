"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

// Hàm chuyển đổi thành chữ hoa chữ cái đầu
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const DynamicBreadcrumb = () => {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter((path) => path);

  return (
    <Breadcrumb className="text-sm mb-3">
      <BreadcrumbList className="flex items-center">
        <BreadcrumbItem>
          <Link href={"/"} className="text-blue-500 hover:underline">
            Home
          </Link>
        </BreadcrumbItem>
        {pathArray.length > 0 && (
          <BreadcrumbSeparator className="text-gray-400" />
        )}
        {pathArray.map((path, index) => {
          const href = "/" + pathArray.slice(0, index + 1).join("/");
          const isLast = index === pathArray.length - 1;

          return (
            <div key={href} className="flex items-center space-x-2">
              <BreadcrumbItem>
                <Link
                  href={href}
                  className={`${
                    isLast ? "text-gray-500" : "text-blue-500"
                  } hover:underline`}
                >
                  {capitalizeFirstLetter(path)}
                </Link>
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator className="text-gray-400" />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
