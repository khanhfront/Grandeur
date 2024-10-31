"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { maskPhoneNumber } from "@/utils/formatText";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

interface UserPhoneFieldProps {
  phoneNumber: string;
  userId: number;
}

export const UserPhoneField: React.FC<UserPhoneFieldProps> = ({
  phoneNumber,
  userId,
}) => {
  const [phone, setPhone] = useState<string>(phoneNumber || "");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSave = useCallback(async () => {
    setIsLoading(true);
    if (phone === phoneNumber) {
      setIsEditing(false);
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5280/api/useraccounts/${userId}/phone`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber: phone }),
        }
      );

      if (response.ok) {
        toast.success("Lưu số điện thoại thành công");
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Lưu số điện thoại thất bại");
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  }, [phone, phoneNumber, userId]);

  const handleCancel = () => {
    setPhone(phoneNumber);
    setIsEditing(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && isEditing && phone) {
        handleSave();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEditing, phone, handleSave]); // handleSave đã được callback hóa

  return (
    <div
      className={`flex justify-between border-b ${
        isEditing ? "pb-2" : ""
      } transition-all duration-200 p-2 pl-0`}
    >
      <div className="flex-1 min-w-0">
        <Label className="text-base">Số điện thoại</Label>
        {isEditing ? (
          <>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1"
              placeholder="Nhập số điện thoại của bạn..."
            />
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
          <div className="mt-1 truncate">
            {maskPhoneNumber(phone) || "Chưa được cung cấp"}
          </div>
        )}
      </div>
      <div className="flex items-start">
        {!isEditing && (
          <Button
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="underline"
          >
            {phone ? "Chỉnh sửa" : "Thêm"}
          </Button>
        )}
      </div>
    </div>
  );
};
