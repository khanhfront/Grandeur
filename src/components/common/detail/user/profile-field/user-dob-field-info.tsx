"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDate } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface UserDobFieldProps {
  userDob: string;
  userId: number;
}

export const UserDobField: React.FC<UserDobFieldProps> = ({
  userDob,
  userId,
}) => {
  const [dob, setDob] = useState<string>(userDob || "");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSave = useCallback(async () => {
    setIsLoading(true);
    if (dob === userDob) {
      setIsEditing(false);
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5280/api/useraccounts/${userId}/dob`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userDob: dob }),
        }
      );

      if (response.ok) {
        toast.success("Lưu ngày sinh thành công");
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Lưu ngày sinh thất bại");
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  }, [dob, userId, userDob]);

  const handleCancel = () => {
    setDob(userDob);
    setIsEditing(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && isEditing && dob) {
        handleSave();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEditing, dob, handleSave]);

  return (
    <div
      className={`flex justify-between border-b ${
        isEditing ? "pb-2" : ""
      } transition-all duration-200 p-2 pl-0`}
    >
      <div className="flex-1 min-w-0">
        <Label className="text-base">Ngày sinh</Label>
        {isEditing ? (
          <>
            <Input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="mt-1"
              placeholder="Chọn ngày sinh..."
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
          <div className="mt-1">
            {formatDate(dob, "dd-MM-yyyy") || "Chưa được cung cấp"}
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
            {dob ? "Chỉnh sửa" : "Thêm"}
          </Button>
        )}
      </div>
    </div>
  );
};
