"use client";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Định nghĩa kiểu props trực tiếp mà không cần React.FC
interface ImageUploadComponentProps {
  maxImages: number;
  fileTypes: string[];
  onSubmit: (images: (File | null)[]) => void;
  buttonText?: string;
}

const ImageUploadComponent = ({
  maxImages,
  fileTypes,
  onSubmit,
  buttonText = "Upload",
}: ImageUploadComponentProps) => {
  const [images, setImages] = useState<(File | null)[]>([]); // Bắt đầu với mảng rỗng

  // Handle file change for uploading or replacing an image
  const handleFileChange = (file: File, index: number) => {
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);
  };

  const handleInternalSubmit = () => {
    onSubmit(images); // Gọi hàm onSubmit với danh sách ảnh
  };

  return (
    <div>
      <div className="flex gap-4">
        {images.map((image, index) => (
          <div key={index}>
            <FileUploader
              handleChange={(file: File) => handleFileChange(file, index)}
              name={`image-${index}`}
              types={fileTypes}
              maxSize={5}
              multiple={false}
            >
              <div className="h-20 w-20 flex items-center justify-center gap-2 rounded-md border-2 border-dashed cursor-pointer">
                {image ? (
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded image ${index + 1}`}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <span>Upload</span>
                )}
              </div>
            </FileUploader>
          </div>
        ))}

        {/* Chỉ hiển thị thêm ô upload nếu số ảnh chưa đạt giới hạn */}
        {images.length < maxImages && (
          <div>
            <FileUploader
              handleChange={
                (file: File) => setImages((prev) => [...prev, file]) // Thêm ảnh mới vào danh sách
              }
              name={`image-${images.length}`}
              types={fileTypes}
              maxSize={5}
              multiple={false}
            >
              <div className="h-20 w-20 flex items-center justify-center gap-2 rounded-md border-2 border-dashed cursor-pointer">
                <span>Upload</span>
              </div>
            </FileUploader>
          </div>
        )}
      </div>

      <Button className="mt-4" onClick={handleInternalSubmit}>
        {buttonText}
      </Button>
    </div>
  );
};

export default ImageUploadComponent;
