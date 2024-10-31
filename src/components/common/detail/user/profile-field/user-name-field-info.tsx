// components/common/detail/user/profile-field/UserNameInfoField.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface UserNameInfoFieldProps {
  firstName: string;
  lastName: string;
  userId?: number;
}

export const UserNameInfoField: React.FC<UserNameInfoFieldProps> = ({
  firstName,
  lastName,
  userId,
}) => {
  const [userFirstName, setUserFirstName] = useState<string>(firstName);
  const [userLastName, setUserLastName] = useState<string>(lastName);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSave = useCallback(async () => {
    if (!userId) {
      toast.error("Lỗi khi lấy thông tin user!");
      return;
    }
    if (userFirstName === firstName && userLastName === lastName) {
      setIsEditing(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const data = {
      userFirstName,
      userLastName,
    };

    try {
      const response = await fetch(
        `http://localhost:5280/api/useraccounts/${userId}/username`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("Lưu thành công");
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Lưu thất bại");
      }
    } catch (error) {
      console.error("Error updating username:", error);
      toast.error("Có lỗi xảy ra khi lưu thông tin");
    } finally {
      setIsLoading(false);
    }
  }, [userFirstName, userLastName, userId, firstName, lastName]);

  const handleCancel = () => {
    setUserFirstName(firstName);
    setUserLastName(lastName);
    setIsEditing(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && isEditing && userFirstName && userLastName) {
        handleSave();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEditing, userFirstName, userLastName, handleSave]);

  return (
    <div
      className={`flex justify-between border-b p-2 pl-0 ${
        isEditing ? "pb-4" : ""
      } transition-all duration-200`}
    >
      <div className="flex-1 min-w-0">
        <Label className="text-base">Tên người dùng</Label>
        {isEditing ? (
          <>
            <div className="text-secondary-foreground text-sm mt-1">
              Đảm bảo tên bạn cung cấp là chính xác
            </div>
            <div className="sm:flex gap-2 mt-2">
              <div className="flex-1">
                <Label className="text-sm">Họ và tên đệm</Label>
                <Input
                  value={userFirstName}
                  onChange={(e) => setUserFirstName(e.target.value)}
                  className="mt-1"
                  placeholder="Nhập họ và tên đệm"
                />
              </div>
              <div className="flex-1">
                <Label className="text-sm">Tên</Label>
                <Input
                  value={userLastName}
                  onChange={(e) => setUserLastName(e.target.value)}
                  className="mt-1"
                  placeholder="Nhập tên"
                />
              </div>
            </div>
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
          <div
            className="mt-1 truncate"
            title={userFirstName + " " + userLastName}
          >
            {userFirstName} {userLastName}
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
            {userFirstName && userLastName ? "Chỉnh sửa" : "Thêm"}
          </Button>
        )}
      </div>
    </div>
  );
};
