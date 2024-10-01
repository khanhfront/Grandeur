"use client";
import UserAvatar from "@/components/info-detail/component/user-avatar";
import { Camera } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const FileUpload: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log(event.target.files);
      // Chuyển FileList thành array
      const filesArray = Array.from(event.target.files);
      setSelectedFiles((se) => {
        const total = [...se, ...filesArray];
        return total.slice(-5);
      });
    }
  };

  const handleFileChange1 = (file: FileList) => {
    if (file) {
      console.log(file);
      const filesArray = Array.from(file);
      setSelectedFiles((se) => {
        const total = [...se, ...filesArray];
        return total.slice(-5);
      });
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <FileUploader
        handleChange={handleFileChange1}
        name="P image"
        types={["JPG", "PNG"]}
        maxSize={5} // giới hạn kích thước 5MB
        label="Upload ảnh property (Max 5)."
        multiple
      >
        <div className="h-20 w-full flex items-center justify-center gap-2 rounded-md border-2 border-dashed my-1">
          <Camera />
        </div>
      </FileUploader>
      <h3>Selected Files:</h3>
      <div className="flex gap-2">
        {selectedFiles.map((file, index) => (
          <Image
            key={index}
            src={URL.createObjectURL(file)}
            alt="Property image Preview"
            quality={100}
            width={100}
            height={100}
          />
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
