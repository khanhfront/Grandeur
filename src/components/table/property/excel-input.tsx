"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import * as XLSX from "xlsx";

export default function UploadPropertiesByExcel() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [importedCount, setImportedCount] = useState<number | null>(null); // State để lưu số lượng properties đã import thành công
  const router = useRouter();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      // Lấy dữ liệu từ sheet đầu tiên
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Chuyển sheet sang dạng JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleImport = async () => {
    if (data.length === 0) return;

    setIsLoading(true); // Vô hiệu hóa button khi bắt đầu API call

    try {
      const response = await fetch(
        "http://localhost:5280/api/Properties/postexcel",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const result = await response.json(); // Đọc phản hồi API
        setImportedCount(result); // Lưu số lượng properties đã thêm thành công
        toast.success(`Đã import ${result} properties thành công!`);
        router.refresh();
      } else {
        const errorText = await response.text();
        toast.error(`Import thất bại: ${errorText}`);
      }
    } catch (error) {
      console.error("Error during import:", error);
    } finally {
      setIsLoading(false); // Kích hoạt lại button sau khi API call kết thúc
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="border border-foreground">
          Import Properties from Excel
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Import Properties</AlertDialogTitle>
          <AlertDialogDescription>
            Chọn file Excel để import danh sách properties.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="file" className="text-left text-bold">
              File
            </Label>
            <Input
              id="file"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="flex-1"
            />
          </div>
        </div>
        {data.length > 0 && (
          <ScrollArea className="h-[100px] w-full sm:max-w-[425px]">
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </ScrollArea>
        )}
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => {
              setData([]);
            }}
          >
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleImport}
            disabled={isLoading || data.length === 0}
          >
            {isLoading ? "Importing..." : "Import Data"}
          </AlertDialogAction>
          {importedCount !== null && (
            <p>{`Đã thêm ${importedCount} properties thành công!`}</p>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
