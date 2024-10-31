import { Label } from "@/components/ui/label";
import { MdPlace } from "react-icons/md";
import { BsBuildingFillGear } from "react-icons/bs";
import { BsFillHouseHeartFill } from "react-icons/bs";

interface BasicInfoPropertyProps {
  BasicInfoProperty: {
    propertyAddress: string | undefined;
    districtName: string | undefined;
    provinceName: string | undefined;
    structureName: string | undefined;
    typeName: string | undefined;
  };
}
export const BasicInfo: React.FC<BasicInfoPropertyProps> = ({
  BasicInfoProperty,
}) => {
  const address = BasicInfoProperty.propertyAddress
    ? BasicInfoProperty.propertyAddress +
      (BasicInfoProperty.districtName ? ", " : "") +
      (BasicInfoProperty.districtName
        ? BasicInfoProperty.districtName + ", "
        : "") +
      (BasicInfoProperty.provinceName || "")
    : "N/A";

  return (
    <div className="py-3">
      <div className="grid grid-cols-1 md:grid-cols-5 xl:grid-cols-7 gap-2 md:gap-4 items-center">
        <Label className="font-bold md:text-base flex gap-1 items-center">
          <MdPlace />
          Địa chỉ:
        </Label>
        <span className="md:col-span-4 xl:col-span-6 truncate">
          {address || "N/A"}
        </span>
        <Label className="font-bold md:text-base flex gap-1 items-center">
          <BsBuildingFillGear />
          Kiến trúc:
        </Label>
        <span className="md:col-span-4 xl:col-span-6 ">
          {BasicInfoProperty.structureName || "N/A"}
        </span>
        <Label className="font-bold md:text-base flex gap-1 items-center">
          <BsFillHouseHeartFill />
          Loại chỗ ở:
        </Label>
        <div className="border-l pl-2 md:col-span-4 xl:col-span-6 ">
          <p>
            {BasicInfoProperty.typeName === "Entire place"
              ? "Toàn bộ chỗ ở"
              : BasicInfoProperty.typeName === "Room"
              ? "Một phòng"
              : BasicInfoProperty.typeName === "Shared room"
              ? "Ở ghép"
              : "N/A"}
          </p>
          <p className="text-muted-foreground text-sm">
            {BasicInfoProperty.typeName === "Entire place"
              ? "Bạn có thể sử dụng toàn bộ chỗ ở thỏa mái"
              : BasicInfoProperty.typeName === "Room"
              ? "Bạn có thể sử dụng phòng đã thuê thỏa mái"
              : BasicInfoProperty.typeName === "Shared room"
              ? "Bạn chia sẻ chỗ ở với người thuê phòng khác"
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};
