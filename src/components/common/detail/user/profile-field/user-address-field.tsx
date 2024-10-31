"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { districts } from "@/constant/data";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface UserAddressFieldProps {
  districtId: number;
  userId: number;
}

export const UserAddressField: React.FC<UserAddressFieldProps> = ({
  districtId,
  userId,
}) => {
  const [disId, setDisId] = useState<number>(districtId || -1);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSave = useCallback(async () => {
    setIsLoading(true);
    if (disId === districtId) {
      setIsEditing(false);
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5280/api/useraccounts/${userId}/address`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ districtId: disId }),
        }
      );

      if (response.ok) {
        toast.success("Lưu địa chỉ thành công");
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Lưu địa chỉ thất bại");
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  }, [disId, userId, districtId]);

  const handleCancel = () => {
    setDisId(districtId);
    setIsEditing(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && isEditing && disId) {
        handleSave();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEditing, disId, handleSave]);

  const addressShow = districts.find((d) => d.value === districtId)?.label;

  return (
    <div
      className={`flex justify-between border-b ${
        isEditing ? "pb-2" : ""
      } transition-all duration-200 p-2 pl-0`}
    >
      <div className="flex-1 min-w-0">
        <Label className="text-base">Địa chỉ</Label>
        {isEditing ? (
          <>
            <Combobox
              value={disId}
              onChange={(value) => setDisId(value)}
              options={districts}
              placeholder="Select district - province"
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
          <div className="mt-1 truncate text-sm" title={addressShow}>
            {addressShow || "Chưa được cung cấp"}
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
            {districtId ? "Chỉnh sửa" : "Thêm"}
          </Button>
        )}
      </div>
    </div>
  );
};
