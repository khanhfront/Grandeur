import React from "react";
import { Label } from "@/components/ui/label";
import { GiSofa } from "react-icons/gi";
import { FaBath, FaBed, FaUsers } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import { FaKitchenSet } from "react-icons/fa6";

interface MainFeaturesProps {
  bedCount?: number;
  bedroomCount?: number;
  bathroomCount?: number;
  maxGuest?: number;
  kitchenCount?: number;
  livingRoomCount?: number;
  propertyName: string;
}

interface Feature {
  count: number;
  label: string;
  icon: React.ReactElement;
}

export const MainFeatures: React.FC<MainFeaturesProps> = ({
  bedCount,
  bedroomCount,
  bathroomCount,
  maxGuest,
  kitchenCount,
  livingRoomCount,
  propertyName,
}) => {
  // Thu thập các tính năng vào mảng
  const features: Feature[] = [
    bedroomCount
      ? {
          count: bedroomCount,
          label: "Phòng ngủ",
          icon: <IoIosBed title="Phòng ngủ" />,
        }
      : null,
    bedCount
      ? {
          count: bedCount,
          label: "Giường",
          icon: <FaBed title="Giường" />,
        }
      : null,
    bathroomCount
      ? {
          count: bathroomCount,
          label: "Phòng tắm",
          icon: <FaBath title="Phòng tắm" />,
        }
      : null,
    livingRoomCount
      ? {
          count: livingRoomCount,
          label: "Phòng khách",
          icon: <GiSofa title="Phòng khách" />,
        }
      : null,
    kitchenCount
      ? {
          count: kitchenCount,
          label: "Nhà bếp",
          icon: <FaKitchenSet title="Nhà bếp" />,
        }
      : null,
    maxGuest
      ? {
          count: maxGuest,
          label: "Khách",
          icon: <FaUsers title="Max khách" />,
        }
      : null,
  ].filter(Boolean) as Feature[]; // Loại bỏ các mục null

  return (
    <div className="w-full">
      <Label className="text-2xl font-bold">{propertyName}</Label>
      <div className="flex items-center gap-1 sm:gap-2 md:gap-3 pb-2 md:pb-6 flex-wrap">
        {features.map((feature, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="mx-1 hidden sm:inline">|</span>}
            <span className="flex items-center text-foreground text-xs xl:text-sm min-[2000px]:text-base gap-1">
              {feature.count ?? "N/A"}{" "}
              <span className="hidden min-[1150px]:inline">
                {feature.label}
              </span>{" "}
              {feature.icon}
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
