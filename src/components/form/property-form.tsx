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
import { Combobox } from "../ui/combobox";

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
    },
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      const response = await fetch("https://localhost:7209/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Tạo property thành công");
        router.refresh();
        router.push("/dashboard/properties");
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
              <FormLabel>Property Name</FormLabel>
              <FormControl>
                <Input placeholder="Property name" {...field} />
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
              <FormLabel>Host by</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Host" {...field} />
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
              <FormLabel>Property Type</FormLabel>
              <FormControl>
                <Combobox
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  options={propertyTypes}
                  placeholder="Select property type"
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
              <FormLabel>District</FormLabel>
              <FormControl>
                <Combobox
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  options={districts}
                  placeholder="Select district - province"
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
            <FormItem className="col-span-full">
              <FormLabel>Address</FormLabel>
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
              <FormLabel>Price per night</FormLabel>
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
              <FormLabel>Structure</FormLabel>
              <FormControl>
                <Combobox
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  options={propertyStructures}
                  placeholder="Select property structure"
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
                <Input type="number" {...field} />
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
                <Input type="number" {...field} />
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
                <Input type="number" {...field} />
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
                <Input type="number" {...field} />
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
                <Input type="number" {...field} />
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
              <FormLabel>Min booking days</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <Button type="submit">Create Property</Button>
        </div>
      </form>
    </Form>
  );
}
