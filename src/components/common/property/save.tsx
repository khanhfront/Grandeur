"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type SaveWishedPropertyProps = {
  propertyId: number;
};

const SaveWishedProperty = ({ propertyId }: SaveWishedPropertyProps) => {
  const [isSaved, setIsSaved] = useState(false);

  const toggleSave = () => {
    setIsSaved(!isSaved);
    // Thực hiện logic lưu vào danh sách yêu thích tại đây (API call, etc.)
  };

  return (
    <button
      onClick={toggleSave}
      className={cn(
        "absolute top-0 right-0 pt-2 pr-2 md:pr-3 lg:pr-4 ",
        "min-w-[44px] min-h-[44px] rounded-full flex justify-end",
        "bg-transparent hover:bg-transparent focus:outline-none"
      )}
      aria-label={isSaved ? "Remove from saved" : "Save property"}
    >
      <div className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center hover:outline outline-hdbg">
        {isSaved ? (
          <FaHeart className="text-red-500 w-3 h-3" />
        ) : (
          <FaRegHeart className="text-gray-400 w-3 h-3" />
        )}
      </div>
    </button>
  );
};

export default SaveWishedProperty;
