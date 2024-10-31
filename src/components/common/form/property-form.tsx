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
import { Combobox } from "../../ui/combobox";

import { districts, propertyStructures, propertyTypes } from "@/constant/data";

// Define Zod schema based on PropertyDto
const formSchema = z.object({
  propertyName: z.string().min(1, "Property name tối thiểu 3 kí tự"),

  hostId: z.preprocess(
    (val) => (val === "" ? null : parseInt(val as string)),
    z
      .number({ invalid_type_error: "Host không được để trống" })
      .min(1, "Host không được để trống")
  ),

  typeOfPropertyId: z
    .number({ invalid_type_error: "Property type không được để trống" })
    .min(1, "Property type không được để trống"),
  districtId: z
    .number({ invalid_type_error: "District không được để trống" })
    .min(1, "District không được để trống"),
  propertyAddress: z.string().min(1, "Địa chỉ không được để trống"),

  pricePerNight: z.preprocess(
    (val) => (val === "" ? null : parseFloat(val as string)),
    z.number().min(1, "Giá phải lớn hơn 0")
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
  maxGuest: z.preprocess(
    (val) => (val === "" ? null : parseInt(val as string)),
    z.number().nullable().optional()
  ),

  minimumStay: z.preprocess(
    (val) => (val === "" ? null : parseInt(val as string)),
    z.number().nullable().optional()
  ),
});

export default function AddPropertyForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyName: "",
      hostId: 0,
      typeOfPropertyId: "",
      districtId: "",
      propertyAddress: "",
      pricePerNight: 0,
      propertyStructureId: "",
      livingRoomCount: "",
      bedroomCount: "",
      bedCount: "",
      bathroomCount: "",
      kitchenCount: "",
      minimumStay: "",
      maxGuest: "",
    },
  });

  const handleReset = () => {
    form.reset();
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const response = await fetch("http://localhost:5280/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Tạo property thành công");
        router.push("/dashboard/properties");
        router.refresh();
      } else {
        toast.error(`Tạo property thất bại: ${response.status}`);
      }
    } catch (error) {
      toast.error(`Tạo properties thất bại: Vì lỗi${error}`);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-3 pr-3 md:grid-cols-2 flex-1"
      >
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
          name="hostId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Host bởi</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Điền id của host cho thuê"
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
                <Input type="number" placeholder="Số lượng giường" {...field} />
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

        <div className="sticky bottom-0 pb-1 space-x-3 col-span-full flex justify-end bg-background">
          <Button type="submit">Create Property</Button>
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
