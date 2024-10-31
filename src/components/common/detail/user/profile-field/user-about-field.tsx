"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface UserAboutFieldProps {
  userAbout: string;
  userId: number;
}

export const UserAboutField: React.FC<UserAboutFieldProps> = ({
  userAbout,
  userId,
}) => {
  const [about, setAbout] = useState<string>(userAbout || "");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSave = useCallback(async () => {
    setIsLoading(true);
    if (about === userAbout) {
      setIsEditing(false);
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5280/api/useraccounts/${userId}/about`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userAbout: about }),
        }
      );

      if (response.ok) {
        toast.success("Lưu thông tin giới thiệu thành công");
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Lưu thông tin giới thiệu thất bại");
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  }, [about, userId, userAbout]);

  const handleCancel = () => {
    setAbout(userAbout);
    setIsEditing(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && isEditing && about) {
        handleSave();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEditing, about, handleSave]);

  return (
    <div
      className={`flex justify-between border-b ${
        isEditing ? "pb-2" : ""
      } transition-all duration-200 p-2 pl-0`}
    >
      <div className="flex-1 min-w-0">
        <Label className="text-base">Giới thiệu</Label>
        {isEditing ? (
          <>
            <Textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="mt-1"
              placeholder="Giới thiệu về bạn..."
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
          <div className="mt-1 truncate whitespace-pre-wrap">
            {about || "Chưa được cung cấp"}
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
            {about ? "Chỉnh sửa" : "Thêm"}
          </Button>
        )}
      </div>
    </div>
  );
};
