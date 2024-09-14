export function formatPlaceholder(searchKey: string): string {
  return searchKey
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Tách camelCase thành từ với khoảng cách
    .replace(/^\w/, (c) => c.toUpperCase()); // Viết hoa chữ cái đầu mỗi từ
}
