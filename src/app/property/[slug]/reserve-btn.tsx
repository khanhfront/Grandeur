"use client";

import { ProtectedButton } from "@/components/common/button/protected-btn";
import { toast } from "sonner";

export function ReserveButton() {
  return (
    <ProtectedButton
      onClick={() => {
        toast.success("Đặt phòng thành công");
      }}
    >
      Reserve
    </ProtectedButton>
  );
}
