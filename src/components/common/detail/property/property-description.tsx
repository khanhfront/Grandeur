"use client";

import { useState, useEffect } from "react";

interface PropertyDescriptionProps {
  description: string;
  maxLength?: number;
}

const PropertyDescription: React.FC<PropertyDescriptionProps> = ({
  description,
  maxLength = 430,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxDescriptionLength, setMaxDescriptionLength] = useState(maxLength);

  useEffect(() => {
    const screenWidth = window.innerWidth;

    if (screenWidth < 640) {
      setMaxDescriptionLength(200);
    } else if (screenWidth < 768) {
      setMaxDescriptionLength(300);
    } else {
      setMaxDescriptionLength(430);
    }
  }, []);

  const isTruncated = description.length > maxDescriptionLength;

  const displayText = isExpanded
    ? description
    : description.slice(0, maxDescriptionLength) + (isTruncated ? "..." : "");

  return (
    <div className="pb-6">
      <p className="text-justify">{displayText}</p>
      {isTruncated && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:text-blue-700"
        >
          {isExpanded ? "Thu gọn" : "Xem thêm"}
        </button>
      )}
    </div>
  );
};

export default PropertyDescription;
