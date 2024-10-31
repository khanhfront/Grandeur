import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import React, { Children } from "react";

type AvatarProps = {
  imageUrl: string;
  fallback: string;
  altText: string;
  className?: string;
  children?: React.ReactNode;
};

const UserAvatar = ({
  imageUrl,
  fallback,
  altText,
  className,
  children,
}: AvatarProps) => {
  return (
    <div className={`w-20 h-20 sm:w-24 sm:h-24 ${className}`}>
      <Avatar className={`w-20 h-20 sm:w-24 sm:h-24`}>
        <AvatarImage src={imageUrl || "/avatar.jpg"} alt={altText} />
        <AvatarFallback className="text-foreground text-2xl">
          {fallback}
        </AvatarFallback>
      </Avatar>
      {children && <>{children}</>}
    </div>
  );
};

export default UserAvatar;
