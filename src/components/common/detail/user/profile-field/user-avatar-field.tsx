"use client";

import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import UserAvatar from "@/components/dashboard/info-detail/component/user-avatar";
import { FileUploader } from "react-drag-drop-files";
import { Camera } from "lucide-react";
import { uploadImageToFirebase } from "@/utils/uploadImage";

interface UserAvatarFieldProps {
  avatarImageUrl: string | undefined | null;
  userId: number;
  userLastName: string;
}

export const UserAvatarField: React.FC<UserAvatarFieldProps> = ({
  avatarImageUrl,
  userId,
  userLastName,
}) => {
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const handleFileChange = (file: File) => {
    setAvatarImage(file);
  };
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCancel = () => {
    setAvatarImage(null);
    setIsEditing(false);
  };

  const handleSave = useCallback(async () => {
    // Xử lý dữ liệu trước khi gửi
    let imageUrl = avatarImageUrl;

    // Upload ảnh nếu có ảnh được chọn
    if (avatarImage) {
      try {
        imageUrl = await uploadImageToFirebase({
          file: avatarImage,
          folderPath: `users/user_${userId}`,
          fileName: `avatar_${userId}`,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Upload ảnh thất bại");
        return;
      }
    }
    if (avatarImage) {
      try {
        const response = await fetch(
          `http://localhost:5280/api/useraccounts/${userId}/avatarimageurl`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ avatarImageUrl: imageUrl }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update avatar image URL");
        }
        const kq = await response.json();
        toast.success(kq.message || "Ảnh đại diện đã được cập nhật");
        setIsEditing(false);
      } catch (error) {
        console.error("Error updating avatar image URL:", error);
        toast.error("Cập nhật ảnh đại diện thất bại");
      } finally {
        setIsLoading(false);
      }
    }
  }, [avatarImage, avatarImageUrl, userId]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && isEditing && avatarImage) {
        handleSave();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEditing, avatarImage, handleSave]);

  return (
    <div
      className={`flex flex-1 items-center justify-center border-b py-2 transition-[width,height] duration-300 duration-300`}
    >
      {!isEditing && (
        <UserAvatar
          imageUrl={avatarImageUrl || "/avatar-svgrepo-com.svg"}
          fallback={userLastName[0]}
          altText="Avatar"
          className="relative"
        >
          <Camera
            className="absolute bottom-0 right-0 md:bottom-0.5 md:right-0.5 cursor-pointer bg-background rounded-full p-1"
            onClick={() => setIsEditing(true)}
          />
        </UserAvatar>
      )}
      {isEditing && (
        <div className="w-full transition-[width,height] duration-300 duration-300">
          <FileUploader
            handleChange={handleFileChange}
            name="Avatar image"
            types={["JPG", "PNG", "JFIF"]}
            maxSize={5} // giới hạn kích thước 5MB
            label="Kéo thả hoặc chọn để upload ảnh avatar"
            classes="transition-[width,height] duration-300 duration-300"
          >
            <div className="h-36 w-full flex items-center justify-center gap-2 rounded-md border-2 border-dashed my-1">
              <div className="flex flex-col items-center px-5">
                {avatarImage && (
                  <>
                    <span className="flex gap-2 text-center">
                      <span className="hidden md:inline">
                        Click <span className="text-hdbg">lưu</span> để áp dụng.
                      </span>
                      Chọn ảnh khác?
                    </span>
                    <UserAvatar
                      imageUrl={URL.createObjectURL(avatarImage)}
                      fallback="U"
                      altText="Avatar Preview"
                    />
                  </>
                )}
                {avatarImageUrl && !avatarImage && (
                  <>
                    <span className="flex gap-2 text-center">
                      Kéo thả ảnh
                      <span className="text-hdbg">ở đây</span>
                      <span className="hidden md:inline">hoặc tải lên</span>
                    </span>
                    <UserAvatar
                      imageUrl={avatarImageUrl}
                      fallback={userLastName[0]}
                      altText="Avatar"
                    />
                  </>
                )}
                {!avatarImageUrl && !avatarImage && (
                  <span className="hidden sm:inline">
                    Kéo thả vào ô hoặc chọn để tải ảnh lên
                  </span>
                )}
              </div>
            </div>
          </FileUploader>
          <div className="flex gap-2 mt-4">
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="transition-[width,height] duration-300 duration-300 mr-2"
            >
              {isLoading ? "Đang lưu..." : "Lưu"}
            </Button>
            <Button variant="ghost" onClick={handleCancel} disabled={isLoading}>
              Hủy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
