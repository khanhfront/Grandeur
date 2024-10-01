import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

type AvatarProps = {
  imageUrl: string;
  fallback: string;
  altText: string;
  className?: string;
};

const UserAvatar = ({
  imageUrl,
  fallback,
  altText,
  className,
}: AvatarProps) => (
  <Avatar className={`w-20 h-20 sm:w-24 sm:h-24 ${className}`}>
    <AvatarImage src={imageUrl || "/avatar.jpg"} alt={altText} />
    <AvatarFallback className="text-foreground text-2xl">
      {fallback}
    </AvatarFallback>
  </Avatar>
);

export default UserAvatar;
