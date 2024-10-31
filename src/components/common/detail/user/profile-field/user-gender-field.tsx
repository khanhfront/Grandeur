// components/common/detail/user/profile-field/UserGenderField.tsx

"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface UserGenderFieldProps {
  genderId: number;
  userId: number;
}

export const UserGenderField: React.FC<UserGenderFieldProps> = ({
  genderId,
  userId,
}) => {
  const [gender, setGender] = useState<string>(genderId.toString() || "");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSave = useCallback(async () => {
    setIsLoading(true);
    if (Number(gender) == genderId) {
      setIsEditing(false);
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5280/api/useraccounts/${userId}/gender`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ genderId: Number(gender) }),
        }
      );

      if (response.ok) {
        toast.success("Lưu giới tính thành công");
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Lưu giới tính thất bại");
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  }, [gender, userId, genderId]);

  const handleCancel = () => {
    setGender(genderId.toString());
    setIsEditing(false);
  };

  const getGenderLabel = (genderValue: string) => {
    switch (genderValue) {
      case "1":
        return "Nam";
      case "2":
        return "Nữ";
      case "3":
        return "Khác";
      default:
        return "Chưa được cung cấp";
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && isEditing && gender) {
        handleSave();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEditing, gender, handleSave]);

  return (
    <div
      className={`flex justify-between border-b ${
        isEditing ? "pb-2" : ""
      } transition-all duration-200 p-2 pl-0`}
    >
      <div className="flex-1 min-w-0">
        <Label className="text-base">Giới tính</Label>
        {isEditing ? (
          <>
            <Select value={gender} onValueChange={(e) => setGender(e)}>
              <SelectTrigger>
                {gender ? `${getGenderLabel(gender)}` : "Chọn giới tính"}
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">Nam</SelectItem>
                  <SelectItem value="2">Nữ</SelectItem>
                  <SelectItem value="3">Khác</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="flex gap-2 mt-4">
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="mr-2"
              >
                {isLoading ? "Đang lưu..." : "Lưu"}
              </Button>
              <Button
                variant="ghost"
                onClick={handleCancel}
                disabled={isLoading}
              >
                Hủy
              </Button>
            </div>
          </>
        ) : (
          <div className="mt-1 truncate">{getGenderLabel(gender)}</div>
        )}
      </div>
      <div className="flex items-start">
        {!isEditing && (
          <Button
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="underline"
          >
            {gender ? "Chỉnh sửa" : "Thiết lập"}
          </Button>
        )}
      </div>
    </div>
  );
};
