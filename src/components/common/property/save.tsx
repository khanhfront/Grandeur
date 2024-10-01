"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";

const SaveWishedProperty = ({ propertyId }: { propertyId: number }) => {
  const [isSaved, setIsSaved] = useState(false);
  const toggleSave = () => {
    setIsSaved(!isSaved);
  };
  return (
    <button
      onClick={toggleSave}
      className="absolute top-2 right-2 md:right-3 lg:right-4 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
      aria-label={isSaved ? "Remove from saved" : "Save property"}
    >
      <FaHeart
        className={cn(isSaved ? "text-red-500" : "text-gray-400", "w-3 h-3")}
      />
    </button>
  );
};

export default SaveWishedProperty;
