export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
    .replace(/[^\w\-]+/g, "") // Loại bỏ ký tự không hợp lệ
    .replace(/\-\-+/g, "-") // Thay thế nhiều dấu gạch ngang liên tiếp
    .replace(/^-+/, "") // Xóa dấu gạch ngang ở đầu
    .replace(/-+$/, ""); // Xóa dấu gạch ngang ở cuối
}
