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
import { a } from "@/utils/antiSSL";
import { districts, genders } from "@/constant/data";
import { Combobox } from "../../ui/combobox";
import { Textarea } from "../../ui/textarea";
import { useState } from "react";

const formSchema = z.object({
  userFirstName: z.string().min(1, "First Name không được để trống"),
  userLastName: z.string().min(1, "Last Name không được để trống"),
  emailAddress: z
    .string()
    .email("Email không hợp lệ")
    .min(1, "Email không được để trống"),
  phoneNumber: z.string().min(1, "Phone Number không được để trống"),
  userPassword: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  districtId: z.number().min(1, "District ID không được để trống"),
  userDob: z.string().nullable().optional(),
  userAbout: z.string().nullable().optional(),
  genderId: z.number().nullable().optional(),
});

export default function UserAccountForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userFirstName: "",
      userLastName: "",
      emailAddress: "",
      phoneNumber: "",
      userPassword: "",
      districtId: "",
      userDob: "",
      userAbout: "",
      genderId: "",
    },
  });

  const onSubmit = async (data: any) => {
    // Xử lý dữ liệu trước khi gửi
    const cleanedData = {
      ...data,
      userDob: data.userDob || null,
      userAbout: data.userAbout || null,
      genderId: data.genderId || null,
    };

    try {
      const response = await a.post(
        "http://localhost:5280/api/UserAccounts",
        cleanedData
      );

      if (response.status === 201) {
        toast.success("Tạo người dùng thành công");
        router.refresh();
        router.push("/dashboard/user-accounts");
      } else {
        toast.error(`Tạo tài khoản thất bại: ${response.statusText}`);
      }
    } catch (error) {
      toast.error(`Tạo tài khoản thất bại: Vì lỗi${error}`);
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
          name="userFirstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userLastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your-email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="districtId"
          render={({ field }) => {
            return (
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
            );
          }}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Phone Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genderId"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Giới tính</FormLabel>
                <FormControl>
                  <Combobox
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    options={genders}
                    placeholder="Chọn giới tính"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="userDob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userAbout"
          render={({ field }) => (
            <FormItem className="col-span-full px-1">
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea placeholder="About you..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="sticky bottom-0 pb-1 space-x-3 col-span-full flex justify-end bg-background">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </Form>
  );
}
