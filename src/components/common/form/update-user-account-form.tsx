"use client";

import { useRouter, useParams } from "next/navigation";
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
import { useEffect, useState } from "react";

const formSchema = z.object({
  userFirstName: z.string().min(1, "First Name không được để trống"),
  userLastName: z.string().min(1, "Last Name không được để trống"),
  emailAddress: z
    .string()
    .email("Email không hợp lệ")
    .min(1, "Email không được để trống"),
  phoneNumber: z.string().min(1, "Phone Number không được để trống"),
  userPassword: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  districtId: z.string().min(1, "District ID không được để trống"),
  userDob: z.string().nullable().optional(),
  userAbout: z.string().nullable().optional(),
  genderId: z.string().nullable().optional(),
});

export default function UpdateUserAccountForm() {
  const router = useRouter();
  const { id } = useParams(); // Lấy id từ dynamic route
  const [user, setUser] = useState<UserDTO | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [valueD, setValueD] = useState("");
  const [valueG, setValueG] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await a.get(
          `http://localhost:5280/api/UserAccounts/${id}`
        );
        if (response.status === 200) {
          setUser(response.data);
        } else {
          setError(`Error: ${response.statusText}`);
        }
      } catch (err) {
        setError(`Error fetching data`);
      }
    };

    fetchData();
  }, [id]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userFirstName: user?.userFirstName || "",
      userLastName: user?.userLastName || "",
      emailAddress: user?.emailAddress || "",
      phoneNumber: user?.phoneNumber || "",
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
      console.log(cleanedData);
      const response = await a.put(
        "https://localhost:7209/api/UserAccounts",
        cleanedData
      );

      if (response.status === 201) {
        toast.success("Tạo người dùng thành công");
        router.push("/dashboard/user-accounts");
        router.refresh();
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
        className="grid grid-cols-1 gap-4 md:grid-cols-2 flex-1"
      >
        <FormField
          control={form.control}
          name="userFirstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
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
                    value={valueD}
                    onChange={(selectedValue) => setValueD(selectedValue)}
                    options={districts}
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
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Combobox
                    value={valueG}
                    onChange={(selectedValue) => setValueG(selectedValue)}
                    options={genders}
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
            <FormItem className="col-span-full">
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea placeholder="About you..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-full">
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </div>
      </form>
    </Form>
  );
}
