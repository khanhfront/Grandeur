import ButtonLink from "@/components/common/button/link-button";
import SearchComponent from "@/components/layout/search/main-search-component";
import { Metadata } from "next";
export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}): Promise<Metadata> {
  const query = searchParams.query || "Default Search";

  return {
    title: `Kết quả tìm kiếm ${query}`,
    description: `Đây là kết quả tìm kiếm chỗ lưu trú cho từ khóa: ${query}`,
    openGraph: {
      title: `Kết quả tìm kiếm ${query}`,
      description: `Tìm chỗ lưu trú với từ khóa ${query} trên Grandeur.`,
    },
  };
}
export default function Search() {
  return (
    <div className="flex flex-1 gap-2 items-center justify-center">
      <ButtonLink
        url="/"
        className="truncate border bg-hdbg hover:no-underline"
      >
        Trở về trang chủ
      </ButtonLink>
    </div>
  );
}
