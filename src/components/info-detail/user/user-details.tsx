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
import { Combobox } from "@/components/ui/combobox";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { uploadImageToFirebase } from "@/utils/uploadImage";
import UserAvatar from "../component/user-avatar";
import { format } from "date-fns";
import { Camera, ImageUp } from "lucide-react";

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
  avatarImageUrl: z.string().nullable().optional(),
});

type UserCardProps = {
  user: UserAccount;
};

const fileTypes = ["JPG", "PNG"];

export default function UserCard({ user }: UserCardProps) {
  const router = useRouter();
  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userFirstName: user.userFirstName,
      userLastName: user.userLastName,
      emailAddress: user.emailAddress,
      phoneNumber: user.phoneNumber,
      userPassword: user.userPassword,
      districtId: user.districtId,
      userDob: user.userDob ? format(new Date(user.userDob), "yyyy-MM-dd") : "",
      userAbout: user.userAbout || "",
      genderId: user.genderId,
      avatarImageUrl: user.avatarImageUrl,
    },
  });

  const handleFileChange = (file: File) => {
    setAvatarImage(file);
  };

  const onSubmit = async (data: any) => {
    // Xử lý dữ liệu trước khi gửi
    let imageUrl = user.avatarImageUrl;

    // Upload ảnh nếu có ảnh được chọn
    if (avatarImage) {
      try {
        imageUrl = await uploadImageToFirebase({
          file: avatarImage,
          folderPath: `users/user_${user.userId}`,
          fileName: `avatar_${user.userId}`,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Upload ảnh thất bại");
        return;
      }
    }

    const cleanedData = {
      ...data,
      userDob: data.userDob || null,
      userAbout: data.userAbout || null,
      genderId: data.genderId || null,
      avatarImageUrl: imageUrl || user.avatarImageUrl,
    };

    console.log(cleanedData);

    try {
      console.log(cleanedData);
      const response = await a.put(
        `http://localhost:5280/api/UserAccounts/${user.userId}`,
        cleanedData
      );

      if (response.status === 204) {
        toast.success("Cập nhật thông tin người dùng thành công");
        router.push("/dashboard/user-accounts");
        router.refresh();
      } else {
        toast.error(`Cập nhật thất bại: ${response.statusText}`);
      }
    } catch (error) {
      toast.error(`Cập nhật thất bại: Vì lỗi${error}`);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-3 pr-3 md:grid-cols-2 flex-1"
        >
          <div className="col-span-full">
            <FileUploader
              handleChange={handleFileChange}
              name="P image"
              types={["JPG", "PNG"]}
              maxSize={5} // giới hạn kích thước 5MB
              label="Kéo thả hoặc chọn để upload ảnh avatar"
            >
              <div className="h-36 w-full flex items-center justify-center gap-2 rounded-md border-2 border-dashed my-1 col-span-full relative">
                <div className="flex flex-col items-center px-10">
                  {avatarImage && (
                    <>
                      <span className="flex gap-2 text-center">
                        <span className="hidden md:inline">
                          Click <span className="text-hdbg">Update</span> to
                          save changes.
                        </span>
                        Select another image?
                      </span>
                      <UserAvatar
                        imageUrl={URL.createObjectURL(avatarImage)}
                        fallback="U"
                        altText="Avatar Preview"
                      />
                    </>
                  )}
                  {user.avatarImageUrl && !avatarImage && (
                    <>
                      <span className="flex gap-2 text-center">
                        Drop image
                        <span className="text-hdbg">here</span>
                        <span className="hidden md:inline">or select</span>
                      </span>
                      <UserAvatar
                        imageUrl={user.avatarImageUrl}
                        fallback={user.userLastName[0]}
                        altText="Avatar"
                      />
                    </>
                  )}
                </div>
              </div>
            </FileUploader>
          </div>
          {/* <div className="h-20 w-full flex items-center justify-center gap-2 rounded-md border-2 border-dashed my-1 col-span-full">
              <ImageUp />
              {avatarImage && (
                <UserAvatar
                  imageUrl={URL.createObjectURL(avatarImage)}
                  fallback="U"
                  altText="Avatar Preview"
                />
              )}
              {user.avatarImageUrl && !avatarImage && (
                <UserAvatar
                  imageUrl={user.avatarImageUrl}
                  fallback={user.userLastName[0]}
                  altText="Avatar"
                />
              )}
            </div>
            <FileUploader
              handleChange={handleFileChange}
              name="avatar"
              types={fileTypes}
              maxSize={5} // giới hạn kích thước 5MB
              label="Upload ảnh hoặc kéo thả để tải lên avatar."
            ></FileUploader> */}

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
                  <FormLabel>Address</FormLabel>
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
                  <Input
                    type="password"
                    placeholder="Your password"
                    {...field}
                  />
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
            <Button type="submit">Update</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
