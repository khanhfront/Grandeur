import { storage } from "./firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  UploadMetadata,
} from "firebase/storage";

type UploadImageOptions = {
  file: File;
  folderPath?: string;
  fileName?: string;
  metadata?: UploadMetadata;
};

export const uploadImageToFirebase = async ({
  file,
  folderPath = "uploads",
  fileName,
  metadata,
}: UploadImageOptions): Promise<string> => {
  try {
    // Tạo tên file (nếu không có sẽ dùng tên gốc)
    const finalFileName = fileName || file.name;

    // Tạo đường dẫn đến thư mục trong Firebase Storage
    const storageRef = ref(storage, `${folderPath}/${finalFileName}`);

    // Upload file lên Firebase Storage
    const snapshot = await uploadBytes(storageRef, file, metadata);

    // Lấy URL của file đã upload
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log("File uploaded successfully. URL:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    return "";
  }
};

// const downloadURL = await uploadImageToFirebase({
//   file: selectedFile,
//   folderPath: `avatars/${user.userId}`,
//   fileName: `avatar-${Date.now()}.png`,
//   metadata: {
//     contentType: selectedFile.type,
//     customMetadata: {
//       uploadedBy: user.userId,
//     },
//   },
// });
