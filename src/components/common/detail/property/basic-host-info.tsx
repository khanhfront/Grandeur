import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface BasicHostInfoProps {
  hostName: string;
  hostImage: string;
  hostEXPDate: Date;
  hostId: number;
}
const calculateHostExperience = (hostEXPDate: Date) => {
  const currentDate = new Date();
  const diffTime = currentDate.getTime() - hostEXPDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffMonths / 12);

  if (diffYears > 0) {
    return `${diffYears} năm hosting`;
  } else if (diffMonths > 0) {
    return `${diffMonths} tháng hosting`;
  } else if (diffDays > 15) {
    return `${diffDays} ngày hosting`;
  } else {
    return "Mới tham gia";
  }
};

export const BasicHostInfo: React.FC<BasicHostInfoProps> = ({
  hostName,
  hostImage,
  hostEXPDate,
  hostId,
}) => {
  return (
    <div className="pb-4 mb-6 border-b flex flex-1 gap-2">
      <Link href={`/host/show${hostId}`}>
        <Avatar>
          <AvatarImage src={hostImage || "/avatar-svgrepo-com.svg"} />
        </Avatar>
      </Link>

      <div>
        <div>
          Hosted by{" "}
          <Label className="font-bold" title={hostName}>
            {" "}
            <Link href={`/host/show${hostId}`}>{hostName}</Link>{" "}
          </Label>
        </div>
        <div>{calculateHostExperience(hostEXPDate)}</div>
      </div>
    </div>
  );
};
