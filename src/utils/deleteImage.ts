// deleteFile.ts
import { getStorage, ref, deleteObject } from "firebase/storage";
import { app } from "./firebase";

/**
 * Trích xuất đường dẫn Storage từ Download URL của Firebase Storage.
 * @param downloadURL - URL tải xuống của tệp trên Firebase Storage.
 * @returns Đường dẫn Storage tương ứng hoặc null nếu không thể trích xuất.
 */
function getStoragePathFromUrl(downloadURL: string): string | null {
  try {
    const url = new URL(downloadURL);
    const path = decodeURIComponent(url.pathname.split("/o/")[1].split("?")[0]);
    return path;
  } catch (error) {
    console.error("Lỗi khi trích xuất đường dẫn Storage:", error);
    return null;
  }
}

/**
 * Xóa tệp từ Firebase Storage dựa trên Download URL.
 * @param downloadURL - URL tải xuống của tệp trên Firebase Storage.
 * @returns Promise<void>
 */
async function deleteFileByDownloadURL(downloadURL: string): Promise<void> {
  const storagePath = getStoragePathFromUrl(downloadURL);

  if (!storagePath) {
    throw new Error("Không thể trích xuất đường dẫn Storage từ URL.");
  }

  const storage = getStorage(app);
  const fileRef = ref(storage, storagePath);

  try {
    await deleteObject(fileRef);
    console.log("Hình ảnh đã được xóa thành công");
  } catch (error) {
    console.error("Lỗi khi xóa hình ảnh:", error);
    throw error;
  }
}

export { deleteFileByDownloadURL };
