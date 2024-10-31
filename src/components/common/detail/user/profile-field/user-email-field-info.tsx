"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { maskEmail } from "@/utils/formatText";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

interface UserEmailFieldProps {
  emailAddress: string;
  userId: number;
}

export const UserEmailField: React.FC<UserEmailFieldProps> = ({
  emailAddress,
  userId,
}) => {
  const [email, setEmail] = useState<string>(emailAddress || "");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSave = useCallback(async () => {
    setIsLoading(true);
    if (email === emailAddress) {
      setIsEditing(false);
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5280/api/useraccounts/${userId}/email`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailAddress: email }),
        }
      );

      if (response.ok) {
        toast.success("Lưu email thành công");
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Lưu email thất bại");
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  }, [email, userId, emailAddress]);

  const handleCancel = () => {
    setEmail(emailAddress);
    setIsEditing(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && isEditing && email) {
        handleSave();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEditing, email, handleSave]);

  return (
    <div className="flex justify-between border-b p-2 pl-0 transition-all duration-200 ">
      <div className="flex-1 min-w-0">
        <Label className="text-base">Email</Label>
        {isEditing ? (
          <>
            <Input
              type="email"
              value={email}
              onChange={handleInputChange}
              className="mt-1"
              placeholder="Nhập email của bạn..."
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
            {maskEmail(email) || "Chưa được cung cấp"}
          </div>
        )}
      </div>
      <div className="flex items-center">
        {!isEditing && (
          <Button
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="underline"
          >
            {email ? "Chỉnh sửa" : "Thêm"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserEmailField;
