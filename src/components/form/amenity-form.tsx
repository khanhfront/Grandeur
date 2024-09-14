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
import { Combobox } from "@/components/ui/combobox";
import { toast } from "sonner";
import { amenityTypes } from "@/constant/data"; // Dữ liệu amenity types

// Schema để validate dữ liệu
const formSchema = z.object({
  amenityName: z.string().min(1, "Amenity Name không được để trống"),
  amenityDescription: z
    .string()
    .min(1, "Amenity Description không được để trống"),
  amenityTypeId: z.number().min(1, "Amenity Type ID không được để trống"),
});

export default function AddAmenityForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amenityName: "",
      amenityDescription: "",
      amenityTypeId: 0,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("https://localhost:7209/api/Amenities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Thêm tiện ích thành công");
        router.push("/dashboard/amenities");
      } else {
        toast.error("Thêm tiện ích thất bại. Vui lòng kiểm tra lại thông tin!");
      }
    } catch (error) {
      toast.error(`Lỗi khi thêm tiện ích: ${error}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-4">
        {/* Amenity Name */}
        <FormField
          control={form.control}
          name="amenityName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amenity Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter amenity name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Amenity Description */}
        <FormField
          control={form.control}
          name="amenityDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amenity Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter amenity description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Combobox cho AmenityType */}
        <FormField
          control={form.control}
          name="amenityTypeId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>District</FormLabel>
                <FormControl>
                  <Combobox
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    options={amenityTypes}
                    placeholder="Select amenity type"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* Submit button */}
        <Button type="submit">Add Amenity</Button>
      </form>
    </Form>
  );
}
