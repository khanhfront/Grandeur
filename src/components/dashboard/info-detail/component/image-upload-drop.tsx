"use client";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";
import { toast } from "sonner";
import { deleteFileByDownloadURL } from "@/utils/deleteImage";
import { a } from "@/utils/antiSSL";

interface InitialImage {
  PropertyPhotoId?: number;
  PhotoUrl: string;
  photoName?: string;
}

interface ImageUploadComponentProps {
  maxImages: number;
  fileTypes: string[];
  onUpload: (
    images: (File | null)[],
    imageInfo: InitialImage[]
  ) => Promise<void>;
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
    Array(initialImageUrls.length).fill(null)
  );
  const [imageInfo, setImageInfo] = useState<InitialImage[]>(initialImageUrls);
  const [isDeleting, setIsDeleting] = useState<boolean[]>(
    Array(initialImageUrls.length).fill(false)
  );
  const [isUploading, setIsUploading] = useState<boolean[]>(
    Array(initialImageUrls.length).fill(false)
  );

  // Hàm xử lý thay đổi file
  const handleFileChange = async (file: File, index: number) => {
    console.log(file);
    if (isUploading[index]) return;
    setIsUploading((prev) => {
      const newUploading = [...prev];
      newUploading[index] = true;
      return newUploading;
    });

    const updatedImages = [...images];
    const updatedInfo = [...imageInfo];

    updatedImages[index] = file;
    updatedInfo[index] = {
      ...updatedInfo[index],
      PhotoUrl: URL.createObjectURL(file),
      photoName: file.name.split(".").slice(0, -1).join("."),
    };

    setImages(updatedImages);
    setImageInfo(updatedInfo);

    try {
      await onUpload(updatedImages, updatedInfo);
      // Reset images[index] sau khi upload thành công
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = null;
        return newImages;
      });
      // Optionally, reset isUploading for this index
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Upload ảnh thất bại");
    } finally {
      setIsUploading((prev) => {
        const newUploading = [...prev];
        newUploading[index] = false;
        return newUploading;
      });
    }
  };

  // Hàm xử lý xóa ảnh
  const handleDeleteImage = async (index: number) => {
    if (isDeleting[index]) return;
    setIsDeleting((prev) => {
      const newDeleting = [...prev];
      newDeleting[index] = true;
      return newDeleting;
    });

    const imageToDelete = imageInfo[index];

    if (imageToDelete.PropertyPhotoId) {
      try {
        // Gọi API xóa ảnh
        const deleteP = await a.delete(
          `https://localhost:7209/api/PropertyPhotoes/${imageToDelete.PropertyPhotoId}`
        );
        if (deleteP.status === 200 || deleteP.status === 204) {
          // Xóa ảnh khỏi Firebase nếu cần
          deleteFileByDownloadURL(imageToDelete.PhotoUrl);
          toast.success("Xóa ảnh thành công");
        } else {
          toast.error("Xóa ảnh thất bại");
        }
      } catch (error) {
        console.error("Error deleting image:", error);
        toast.error("Xóa ảnh thất bại");
      }
    } else {
      deleteFileByDownloadURL(imageToDelete.PhotoUrl);
      toast.success("Xóa ảnh thành công");
    }

    // Cập nhật lại state để xóa ảnh khỏi danh sách
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedInfo = imageInfo.filter((_, i) => i !== index);

    setImages(updatedImages);
    setImageInfo(updatedInfo);

    setIsDeleting((prev) => {
      const newDeleting = [...prev];
      newDeleting[index] = false;
      return newDeleting;
    });
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
              disabled={isUploading[index] || isDeleting[index]}
            >
              <div
                className={`h-20 w-20 md:h-36 md:w-36 flex items-center justify-center gap-2 rounded-md border-2 border-dashed cursor-pointer relative ${
                  isUploading[index] ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {image.PhotoUrl ? (
                  <Image
                    src={image.PhotoUrl}
                    alt={`Uploaded image ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    quality={100}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={image.PropertyPhotoId ? true : false}
                  />
                ) : (
                  <span>Upload</span>
                )}
                {isUploading[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm">
                    Uploading...
                  </div>
                )}
              </div>
            </FileUploader>
            {/* Nút xóa ảnh */}
            <Button
              type="button"
              size={"icon"}
              disabled={isDeleting[index] || isUploading[index]}
              variant="destructive"
              className="absolute -top-2 -right-2 w-4 h-4 rounded-full hidden group-hover:flex items-center justify-center"
              onClick={() => handleDeleteImage(index)}
            >
              {isDeleting[index] ? (
                <span className="loader">...</span> // Thêm loader nếu muốn
              ) : (
                <X size={12} />
              )}
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
              disabled={
                isUploading[imageInfo.length] || isDeleting[imageInfo.length]
              }
            >
              <div
                className={`h-20 w-20 md:h-36 md:w-36 flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed cursor-pointer ${
                  isUploading[imageInfo.length]
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                <Camera />
                <span>{"(" + imageInfo.length + "/" + maxImages + ")"}</span>
                {imageInfo.length === 0 ? "Main" : ""}
                {isUploading[imageInfo.length] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm">
                    Uploading...
                  </div>
                )}
              </div>
            </FileUploader>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadDropComponent;
