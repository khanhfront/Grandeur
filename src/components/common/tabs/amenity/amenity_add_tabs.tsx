"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import ButtonAddIcon from "../../button/add-icon-button";
import { Plus, Check } from "lucide-react"; // Thêm icon Check
import { toast } from "sonner";
import { revalidateF } from "@/serverActions/revalidateFt";
type Amenity = {
  amenityId: number;
  amenityName: string;
};

type AmenityType = {
  amenityTypeId: number;
  amenityTypeName: string;
  amenityTypeDescription: string;
  amenities: Amenity[];
};

interface AmenityAddTabsClientProps {
  dataAmenity: AmenityType[];
  dataAmenityState: Amenity[];
}

export default function AmenityAddTabs({
  dataAmenity,
  dataAmenityState,
}: AmenityAddTabsClientProps) {
  const { id } = useParams();
  const router = useRouter();

  const [amenityState, setAmenityState] = useState<{ [key: number]: boolean }>(
    () => {
      const initAmenityState: { [key: number]: boolean } = {};
      dataAmenity.forEach((amenityType) => {
        amenityType.amenities.forEach((amenity) => {
          initAmenityState[amenity.amenityId] = dataAmenityState.some(
            (state) => state.amenityId === amenity.amenityId
          );
        });
      });
      return initAmenityState;
    }
  );

  const handleAddAmenity = async (amenityId: number, propertyId: number) => {
    try {
      const data = {
        propertyId: propertyId,
        amenityId: amenityId,
      };
      const response = await fetch(
        "https://localhost:7209/api/propertyamenities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        toast.error("Lỗi thêm tiện ích thất bại");
      } else {
        setAmenityState((prev) => ({
          ...prev,
          [amenityId]: true,
        }));
        revalidateF(`property-${id}`);
        toast.success("Thêm tiện ích thành công", { duration: 1500 });
        router.refresh();
      }
    } catch (error) {
      toast.error("Thêm tiện ích thất bại");
    }
  };

  const handleDeleteAmenity = async (amenityId: number, propertyId: number) => {
    try {
      const data = {
        propertyId: propertyId,
        amenityId: amenityId,
      };
      const response = await fetch(
        "https://localhost:7209/api/propertyamenities",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        toast.error("Lỗi thêm tiện ích thất bại");
      } else {
        setAmenityState((prev) => ({
          ...prev,
          [amenityId]: false,
        }));
        revalidateF(`property-${id}`);
        toast.success("Xóa tiện ích thành công", { duration: 1500 });
        router.refresh();
      }
    } catch (error) {
      toast.error("Xóa tiện ích thất bại");
    }
  };

  const handleToggleAmenity = (amenityId: number, propertyId: number) => {
    if (amenityState[amenityId]) {
      handleDeleteAmenity(amenityId, propertyId);
    } else {
      handleAddAmenity(amenityId, propertyId);
    }
  };

  return (
    <Tabs
      defaultValue={String(dataAmenity[0].amenityTypeId)}
      className="px-1 py-3 border border-border rounded-xl justify-center w-full md:w-1/2 xl:w-1/3"
    >
      <TabsList className="bg-transparent p-1 w-full justify-start gap-2 md:gap-3 flex-wrap h-fit">
        {dataAmenity.map((amenityType) => (
          <TabsTrigger
            key={amenityType.amenityTypeId}
            value={String(amenityType.amenityTypeId)}
            className="rounded-full outline outline-1 outline-muted data-[state=active]:outline-2 data-[state=active]:outline-foreground hover:outline-2"
          >
            {amenityType.amenityTypeName}
          </TabsTrigger>
        ))}
      </TabsList>
      <ScrollArea className="h-[calc(100dvh-360px)] ">
        {dataAmenity.map((amenityType) => (
          <TabsContent
            key={amenityType.amenityTypeId}
            value={String(amenityType.amenityTypeId)}
          >
            <div className="flex flex-col space-y-2">
              {amenityType.amenityTypeDescription && (
                <span className="text-secondary-foreground py-4 px-2 text-wrap">
                  {amenityType.amenityTypeDescription}
                </span>
              )}
              {amenityType.amenities.map((amenity) => (
                <div
                  key={amenity.amenityId}
                  className="p-2 border rounded-md flex justify-between items-center"
                >
                  <span>{amenity.amenityName}</span>
                  <ButtonAddIcon
                    onClick={() => {
                      const amenityId = amenity.amenityId;
                      const propertyId = Array.isArray(id) ? id[0] : id;
                      handleToggleAmenity(amenityId, parseInt(propertyId));
                    }}
                    variant={
                      amenityState[amenity.amenityId] ? "default" : "outline"
                    }
                  >
                    {/* Hiển thị icon Check nếu đã thêm, ngược lại hiển thị icon Plus */}
                    {amenityState[amenity.amenityId] ? (
                      <Check size={20} />
                    ) : (
                      <Plus size={18} />
                    )}
                  </ButtonAddIcon>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </ScrollArea>
    </Tabs>
  );
}
