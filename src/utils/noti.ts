import { toast } from "sonner";

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    duration: 4000, // Thời gian hiển thị (ms)
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    duration: 4000, // Thời gian hiển thị (ms)
  });
};
