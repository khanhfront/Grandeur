"use client";
import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";
import { a } from "@/utils/antiSSL";
import { toast } from "sonner";

interface InitialImage {
  PropertyPhotoId?: number;
  PhotoUrl: string;
}

interface ImageUploadComponentProps {
  maxImages: number;
  fileTypes: string[];
  onUpload: (images: (File | null)[], imageInfo: InitialImage[]) => void;
  buttonText?: string;
  initialImageUrls: InitialImage[];
}

const ImageUploadDropComponent = ({
  maxImages,
  fileTypes,
  onUpload,
  buttonText = "Upload",
  initialImageUrls,
}: ImageUploadComponentProps) => {
  const [images, setImages] = useState<(File | null)[]>(
    Array(maxImages).fill(null)
  );
  const [imageInfo, setImageInfo] = useState<InitialImage[]>(initialImageUrls);

  // Hàm xử lý thay đổi file
  const handleFileChange = (file: File, index: number) => {
    const updatedImages = [...images];
    const updatedInfo = [...imageInfo];

    updatedImages[index] = file;
    updatedInfo[index] = {
      ...updatedInfo[index],
      PhotoUrl: URL.createObjectURL(file),
    };

    setImages(updatedImages);
    setImageInfo(updatedInfo);
    handleInternalSubmit(updatedImages, updatedInfo);
  };
  // Hàm xử lý xóa ảnh
  const handleDeleteImage = async (index: number) => {
    const imageToDelete = imageInfo[index];

    if (imageToDelete.PropertyPhotoId) {
      // Giả lập API xóa bằng console.log
      console.log(
        `Deleting image with PropertyPhotoId: ${imageToDelete.PropertyPhotoId}`
      );
      // Gọi API xóa nếu cần
      const deleteP = await a.delete(
        "https://localhost:7209/api/PropertyPhotoes/5"
      );
      if (deleteP.status === 201) {
        toast.success("Xóa ảnh thành công");
      }
      // await fetch(`/api/photos/${imageToDelete.PropertyPhotoId}`, { method: 'DELETE' });
    }

    // Cập nhật lại state để xóa ảnh khỏi danh sách
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedInfo = imageInfo.filter((_, i) => i !== index);
    console.log(updatedImages, updatedInfo);

    setImages(updatedImages);
    setImageInfo(updatedInfo);
  };

  // Hàm xử lý khi nhấn nút Upload
  const handleInternalSubmit = (
    imgs: (File | null)[],
    imgInfo: InitialImage[]
  ) => {
    onUpload(imgs, imgInfo);
  };

  return (
    <div>
      <div className="text-xs hidden md:block">
        Tips: Kéo thả để upload ảnh | Ảnh đầu tiên sẽ mặc định là main photo
      </div>
      <div className="flex flex-wrap gap-4 md:gap-8">
        {imageInfo.map((image, index) => (
          <div key={index} className="relative group">
            <FileUploader
              handleChange={(file: File) => handleFileChange(file, index)}
              name={`image-${index}`}
              types={fileTypes}
              maxSize={5}
              multiple={false}
            >
              <div className="h-20 w-20 md:h-36 md:w-36 flex items-center justify-center gap-2 rounded-md border-2 border-dashed cursor-pointer relative">
                {image.PhotoUrl ? (
                  <Image
                    src={image.PhotoUrl}
                    alt={`Uploaded image ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    quality={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                ) : (
                  <span>Upload</span>
                )}
              </div>
            </FileUploader>
            {/* Nút xóa ảnh */}
            <Button
              type="button"
              size={"icon"}
              variant="destructive"
              className="absolute -top-2 -right-2 w-4 h-4 rounded-full hidden group-hover:flex items-center justify-center"
              onClick={() => handleDeleteImage(index)}
            >
              <X size={12} />
            </Button>
          </div>
        ))}

        {/* Chỉ hiển thị thêm ô upload nếu số ảnh chưa đạt giới hạn */}
        {imageInfo.length < maxImages && (
          <div>
            <FileUploader
              handleChange={(file: File) =>
                handleFileChange(file, imageInfo.length)
              }
              name={`image-${imageInfo.length}`}
              types={fileTypes}
              maxSize={5}
              multiple={false}
            >
              <div className="h-20 w-20 md:h-36 md:w-36 flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed cursor-pointer">
                <Camera />
                <span>{"(" + imageInfo.length + "/" + maxImages + ")"}</span>
                {imageInfo.length === 0 ? "Main" : ""}
              </div>
            </FileUploader>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadDropComponent;
