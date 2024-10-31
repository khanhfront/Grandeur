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
import { districts } from "@/constant/data";
import { Combobox } from "../../ui/combobox";

// Định nghĩa schema validation với zod
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
});

export default function RegisterForm() {
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
    },
  });

  // Hàm xử lý submit form
  const onSubmit = async (data: any) => {
    try {
      const response = await a.post(
        "http://localhost:5280/api/UserAccounts",
        data
      );

      if (response.status === 201) {
        toast.success("Đăng kí thành công");
        router.push("/login");
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
        className="space-y-4 flex-1 max-w-2xl"
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

        <Button type="submit">Register</Button>
      </form>
    </Form>
  );
}
