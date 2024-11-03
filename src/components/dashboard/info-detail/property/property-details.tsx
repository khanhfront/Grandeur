"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Combobox } from "@/components/ui/combobox";

import { districts, propertyStructures, propertyTypes } from "@/constant/data";
import { useEffect, useState } from "react";
import ImageUploadDropComponent from "../component/image-upload-drop";
import { uploadImageToFirebase } from "@/utils/uploadImage";
import { a } from "@/utils/antiSSL";
import PLoader from "@/components/common/ploader";
import { Textarea } from "@/components/ui/textarea";
import { revalidateF, revalidateP } from "@/serverActions/revalidateFt";

const formSchema = z.object({
  propertyName: z.string().min(1, "Tên chỗ ở tối thiểu 3 kí tự"),
  typeOfPropertyId: z
    .number({ invalid_type_error: "Loại chỗ ở không được để trống" })
    .min(1, "Property type không được để trống"),
  districtId: z
    .number({ invalid_type_error: "Huyện không không hợp lệ" })
    .min(1, "Huyện không được để trống"),
  propertyAddress: z.string().min(1, "Địa chỉ không được để trống"),
  pricePerNight: z.preprocess(
    (val) => (val === "" ? null : parseFloat(val as string)),
    z.number().min(1, "Giá phải lớn hơn 0")
  ),
  serviceFee: z.preprocess(
    (val) => (val === "" ? null : parseFloat(val as string)),
    z.number().nullable().optional()
  ),
  propertyStructureId: z.preprocess(
    (val) => (val === "" ? null : parseInt(val as string)),
    z.number().nullable().optional()
  ),
  livingRoomCount: z.preprocess(
    (val) => (val === "" ? null : parseInt(val as string)),
    z.number().nullable().optional()
  ),
  bedroomCount: z.preprocess(
    (val) => (val === "" ? null : parseInt(val as string)),
    z.number().nullable().optional()
  ),
  bedCount: z.preprocess(
    (val) => (val === "" ? null : parseInt(val as string)),
    z.number().nullable().optional()
  ),
  bathroomCount: z.preprocess(
    (val) => (val === "" ? null : parseInt(val as string)),
    z.number().nullable().optional()
  ),
  kitchenCount: z.preprocess(
    (val) => (val === "" ? null : parseInt(val as string)),
    z.number().nullable().optional()
  ),
  minimumStay: z.preprocess(
    (val) => (val === "" ? null : parseInt(val as string)),
    z.number().nullable().optional()
  ),
  maxGuest: z.preprocess(
    (val) => (val === "" ? null : parseInt(val as string)),
    z.number().nullable().optional()
  ),
  propertyDescription: z.string().min(200, "Mô tả chỗ ở tối thiểu 200 kí tự"),
});

type PropertyCardProps = {
  property: Property;
};

interface InitialImage {
  PropertyPhotoId?: number;
  PhotoUrl: string;
  photoName?: string;
}

export default function UpdatePropertyForm({ property }: PropertyCardProps) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyName: property.propertyName,
      typeOfPropertyId: property.typeOfPropertyId,
      districtId: property.districtId,
      propertyAddress: property.propertyAddress,
      pricePerNight: property.pricePerNight,
      serviceFee: property.serviceFee,
      propertyStructureId: property.propertyStructureId,
      livingRoomCount: property.livingRoomCount || "",
      bedroomCount: property.bedroomCount || "",
      bedCount: property.bedCount || "",
      bathroomCount: property.bathroomCount || "",
      kitchenCount: property.kitchenCount || "",
      minimumStay: property.minimumStay || "",
      maxGuest: property.maxGuest || "",
      propertyDescription: property.propertyDescription || "",
    },
  });

  const fileTypes = ["JPG", "PNG", "JFIF"];

  const [initialImage, setInitialImage] = useState<InitialImage[]>([]);

  useEffect(() => {
    async function fetchPropertyPhotos(propertyId: number) {
      try {
        const response = await a.get(
          `https://localhost:7209/api/propertyphotoes/${propertyId}`
        );

        if (response.data.length > 0) {
          const images = response.data.map((item: any) => ({
            PropertyPhotoId: item.propertyPhotoId,
            PhotoUrl: item.photoUrl,
            photoName: item.photoDescription,
          }));
          console.log(images);
          setInitialImage(images);
        } else {
          setInitialImage([]);
        }
      } catch (error) {
        console.error("Error fetching property photos:", error);
        setInitialImage([]);
      }
    }

    fetchPropertyPhotos(property.propertyId);
  }, [property.propertyId]);

  // Hàm upload ảnh lên Firebase và xử lý API
  const savePropertyPhoto = async (
    photo: InitialImage,
    isMainPhoto: boolean
  ) => {
    try {
      if (photo.PropertyPhotoId) {
        const putPropertyPhotoData = {
          ...photo,
          photoDescription: photo.photoName,
          propertyId: property.propertyId,
          isMainPhoto: isMainPhoto,
        };
        // Gọi API PUT để cập nhật
        await a.put(
          `https://localhost:7209/api/propertyphotoes/${photo.PropertyPhotoId}`,
          putPropertyPhotoData
        );
      } else {
        // Gọi API POST để tạo mới
        const response = await a.post(
          `https://localhost:7209/api/propertyphotoes`,
          {
            photoDescription: photo.photoName,
            PropertyId: property.propertyId,
            PhotoUrl: photo.PhotoUrl,
            isMainPhoto: isMainPhoto,
          }
        );
        // Nếu API trả về dữ liệu mới, cập nhật PropertyPhotoId
        if (response.data) {
          photo.PropertyPhotoId = response.data.propertyPhotoId;
        }
      }
    } catch (error) {
      console.error("Error saving PropertyPhoto:", error);
      throw error; // Để parent biết có lỗi xảy ra
    }
  };

  const handleUpload = async (
    images: (File | null)[],
    imageInfo: InitialImage[]
  ) => {
    console.log(imageInfo);
    try {
      // Chỉ xử lý các ảnh mới (không có PropertyPhotoId)
      const newImages = imageInfo.filter((img, index) =>
        initialImage[index]?.PhotoUrl
          ? img.PhotoUrl !== initialImage[index].PhotoUrl
          : img.PhotoUrl
      );

      if (newImages.length === 0) {
        toast.info("Không có ảnh mới để upload.");
        return;
      }

      // Upload tất cả các ảnh mới cùng lúc
      const uploadPromises = newImages.map(async (img, index) => {
        const fileIndex = imageInfo.findIndex(
          (info) => info.PhotoUrl === img.PhotoUrl
        );
        const file = images[fileIndex];
        if (file) {
          // Upload file lên Firebase
          const photoUrl = await uploadImageToFirebase({
            file,
            folderPath: `properties/property_${property.propertyId}`,
            fileName: `image_p${property.propertyId}_${fileIndex}`,
          });

          // Cập nhật URL và lưu vào imageInfo
          img.PhotoUrl = photoUrl;
          await savePropertyPhoto(img, fileIndex === 0); // Nếu là ảnh đầu tiên, là main photo
        }
      });

      await Promise.all(uploadPromises);

      console.log("All images processed successfully.");
      await revalidateF("featured");
      await revalidateP(`property-${property.propertyId}`);
      router.refresh();
      toast.success("Upload ảnh thành công");
    } catch (error) {
      console.error("Error processing images:", error);
      toast.error("Upload ảnh thất bại");
    }
  };

  const onSubmit = async (data: any) => {
    const reqData = {
      ...data,
      hostId: property.hostId,
    };
    console.log(reqData);
    try {
      const response = await a.put(
        `http://localhost:5280/api/properties/${property.propertyId}`,
        reqData
      );

      if (response.status === 204) {
        toast.success("Update property thành công");
        await revalidateF("featured");
        await revalidateP(`property-${property.propertyId}`);
        router.push("/dashboard/properties");
        router.refresh();
      } else {
        toast.error(`Update property thất bại: ${response.status}`);
      }
    } catch (error) {
      toast.error(`Update properties thất bại: Vì lỗi${error}`);
    }
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-3 pr-3 md:grid-cols-2 flex-1 pl-[1px]"
      >
        <div className="col-span-full grid gap-3">
          {initialImage.length > 0 ? (
            <ImageUploadDropComponent
              fileTypes={fileTypes}
              maxImages={10}
              buttonText="Lưu ảnh"
              onUpload={handleUpload}
              initialImageUrls={initialImage}
            />
          ) : (
            <PLoader />
          )}
        </div>
        <FormField
          control={form.control}
          name="propertyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên Property</FormLabel>
              <FormControl>
                <Input
                  placeholder="Điền tên Property mà bạn muốn hiển thị với người dùng"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="typeOfPropertyId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loại Property</FormLabel>
              <FormControl>
                <Combobox
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  options={propertyTypes}
                  placeholder="Chọn loại Property"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="districtId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Huyện, tỉnh</FormLabel>
              <FormControl>
                <Combobox
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  options={districts}
                  placeholder="Chọn huyện, tỉnh nơi Property thuộc về"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pricePerNight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá (VND)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Giá cho property (VND)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="propertyAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Input placeholder="Số nhà, tên đường, khu phố" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="serviceFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phí dịch vụ (VND)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Phí dịch vụ (vệ sinh, ...). Nhân với số người"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-full grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <FormField
            control={form.control}
            name="propertyStructureId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kiến trúc</FormLabel>
                <FormControl>
                  <Combobox
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    options={propertyStructures}
                    placeholder="Chọn kiến trúc property"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="livingRoomCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số phòng khách</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Số lượng phòng khách"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bedroomCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số phòng ngủ</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Số lượng phòng ngủ"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bedCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số giường</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Số lượng giường"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bathroomCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số nhà tắm</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Số lượng nhà tắm (vệ sinh)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="kitchenCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số nhà bếp</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Số lượng nhà bếp (phòng nấu ăn)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="minimumStay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số ngày đặt tối thiểu</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Số ngày đặt tối thiểu"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxGuest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số khách</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Số khách phù hợp với property"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="propertyDescription"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Giới thiệu chỗ ở của bạn"
                  {...field}
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="sticky bottom-0 pb-1 space-x-3 col-span-full flex justify-end bg-background">
          <Button type="submit">Update Property</Button>
          <Button
            variant="outline"
            type="button"
            onClick={handleReset}
            className="outline outline-1"
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
}
