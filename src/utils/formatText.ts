export function formatPlaceholder(searchKey: string): string {
  return searchKey
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Tách camelCase thành từ với khoảng cách
    .replace(/^\w/, (c) => c.toUpperCase()); // Viết hoa chữ cái đầu mỗi từ
}

export function maskEmail(email: string): string {
  const atIndex = email.indexOf("@");
  if (atIndex === -1) {
    return email;
  }

  const localPart = email.substring(0, atIndex);
  const domainPart = email.substring(atIndex);

  let maskedLocal: string;

  if (localPart.length === 1) {
    maskedLocal = "*";
  } else if (localPart.length === 2) {
    maskedLocal = "**";
  } else {
    maskedLocal = `${localPart[0]}**${localPart[localPart.length - 1]}`;
  }

  return `${maskedLocal}${domainPart}`;
}

// utils/maskPhoneNumber.ts
export const maskPhoneNumber = (phoneNumber: string): string => {
  if (phoneNumber.length <= 3) {
    return phoneNumber; // Không đủ số để mã hóa
  }
  const firstTwo = phoneNumber.slice(0, 2);
  const lastOne = phoneNumber.slice(-1);
  const maskedMiddle = "*".repeat(phoneNumber.length - 3);
  return `${firstTwo}${maskedMiddle}${lastOne}`;
};

export function formatDate(date: Date): string {
  const formattedDate = date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return `${formattedDate} ${formattedTime}`;
}

export function formatCurrencyVND(amount: number): string {
  return "₫" + new Intl.NumberFormat("vi-VN").format(amount);
}
