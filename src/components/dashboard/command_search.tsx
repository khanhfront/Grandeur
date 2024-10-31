"use client";

import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { useRouter } from "next/navigation"; // Sử dụng useRouter từ next/navigation
import { navItems } from "./item"; // Import danh sách navItems
import { Button } from "../ui/button";

const CommandSearch = () => {
  const [query, setQuery] = useState<string>(""); // State để theo dõi giá trị tìm kiếm
  const [open, setOpen] = useState<boolean>(false); // State để theo dõi trạng thái mở của dialog
  const router = useRouter();

  // Hàm xử lý khi chọn item trong kết quả tìm kiếm
  const handleSelect = (href: string) => {
    router.push(href); // Điều hướng đến trang được chọn
    setOpen(false); // Đóng dialog sau khi điều hướng
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Lọc danh sách navItems dựa trên giá trị tìm kiếm
  const filteredItems = navItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      {/* Nút để mở dialog */}
      <Button
        size={"sm"}
        variant={"secondary"}
        onClick={() => setOpen(true)}
        className="py-1 rounded-full truncate"
      >
        Ấn Ctrl + K hoặc tìm kiếm menu...
      </Button>

      {/* CommandDialog hiển thị khi open = true */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Tìm kiếm menu"
          value={query}
          onValueChange={setQuery}
          className="mx-1 mt-1"
        />
        <CommandList className="mx-1 mb-1">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <CommandItem
                key={index}
                onSelect={() => handleSelect(item.href || "/dashboard")}
              >
                {item.title}
              </CommandItem>
            ))
          ) : (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CommandSearch;
