import { HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const NotFoundCom = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-full max-w-lg h-64 md:h-96 relative">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/grandeur-1aa6e.appspot.com/o/common%2F404%20Error-pana.png?alt=media&token=984afbdd-1fb5-40a5-87e7-dc14316dcf63"
          alt="Not found image"
          title="Not found image"
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      </div>

      {/* Tiêu đề */}
      <h2 className="text-base md:text-2xl xl:text-4xl font-bold text-hdbg mb-2 animate-pulse">
        Oops! Page Not Found
      </h2>

      {/* Mô tả */}
      <p className="text-sm md:text-lg text-muted-foreground mb-3">
        Xin lỗi, chúng tôi không thể tìm thấy trang mà bạn đang cố gắng truy
        cập.
      </p>

      {/* Nút quay về trang chủ */}
      <Link
        href="/"
        className="inline-flex gap-2 items-center bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary transition duration-300 ease-in-out"
      >
        Quay về trang chủ <HomeIcon />
      </Link>
    </div>
  );
};
