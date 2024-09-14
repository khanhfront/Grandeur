"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { genders, districts } from "@/constant/data";
import { format } from "date-fns";
import { a } from "@/utils/antiSSL";
import { toast } from "sonner";
import { uploadImageToFirebase } from "@/utils/uploadImage";
import { useRouter } from "next/navigation";
import UserAvatar from "../component/user-avatar";
import FormInput from "../component/form-input";
import FormCombobox from "../component/form-combobox";
import FormActions from "../component/form-action";
import DialogConfirm from "../component/dialog-confirm";

type UserCardProps = {
  user: UserAccount;
};

export default function UserCard({ user }: UserCardProps) {
  const avatarFallback = user.userLastName ? user.userLastName[0] : "A";
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  function getDistrictIdByName(districtName: string) {
    const district = districts.find(
      (d) => d.label.toLowerCase() === districtName.toLowerCase()
    );
    return district ? district.value : null;
  }

  const initialFormData = {
    userFirstName: user.userFirstName || "",
    userLastName: user.userLastName || "",
    emailAddress: user.emailAddress || "",
    phoneNumber: user.phoneNumber || "",
    userPassword: user.userPassword || "",
    genderId: user.genderId || null,
    userDob: user.userDob || "",
    userAbout: user.userAbout || null,
    districtId:
      getDistrictIdByName(user.districtName + "-" + user.provinceName) || "",
    avatarImageUrl: user.avatarImageUrl || "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function formatUserDob(userDob: string | null) {
    let formattedDate = "";

    if (userDob) {
      const date = new Date(userDob);

      formattedDate = date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }

    return formattedDate;
  }
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === "genderId" ? Number(value) : value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value
      ? format(new Date(e.target.value), "yyyy-MM-dd")
      : "";
    console.log(date);
    setFormData((prevData) => ({
      ...prevData,
      userDob: date,
    }));
  };

  const handleSave = async () => {
    // Validation
    if (!formData.userFirstName || !formData.userLastName) {
      toast.error("First Name and Last Name are required");
      return;
    }

    if (!formData.emailAddress || !/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      toast.error("Valid email address is required");
      return;
    }

    if (!formData.phoneNumber) {
      toast.error("Phone number is required");
      return;
    }

    if (formData.userPassword && formData.userPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    try {
      let avatarImageUrl1 = formData.avatarImageUrl || "";
      const date = new Date().toISOString().replace(/:/g, "-"); // Thay thế dấu ":" để không bị lỗi trong URL
      if (selectedFile) {
        avatarImageUrl1 = await uploadImageToFirebase({
          file: selectedFile,
          folderPath: `avatars/${user.userId}`,
          fileName: `avatar-${selectedFile.name}-${date}.png`,
          metadata: {
            contentType: selectedFile.type,
            customMetadata: {
              uploadedBy: user.userId.toString(),
            },
          },
        });

        setFormData((prevData) => ({
          ...prevData,
          avatarImageUrl: avatarImageUrl1,
        }));
      }

      const result = {
        userFirstName: formData.userFirstName,
        userLastName: formData.userLastName,
        emailAddress: formData.emailAddress,
        phoneNumber: formData.phoneNumber,
        userPassword: formData.userPassword,
        userDob: formData.userDob || null,
        userAbout: formData.userAbout,
        genderId: formData.genderId,
        districtId: formData.districtId,
        avatarImageUrl: avatarImageUrl1 || formData.avatarImageUrl || null,
      };
      console.log("User data to submit:", result);
      console.log(user.userId);

      // Replace this with actual API call
      // await api.updateUser(user.userId, result);
      const apiEndpoint = `https://localhost:7209/api/UserAccounts/${user.userId}`;
      const response = await a.put(apiEndpoint, result);
      if (response.status === 204) {
        toast.success("Update successfully");
        router.refresh();
      } else {
        toast.error("Check your connection and try again");
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  const [selectedDistrict, setSelectedDistrict] = useState(
    districts.find(
      (district) => district.value.toString() === formData.districtId
    )
  );

  const handleDistrictChange = (value: string) => {
    const selectedDistrict = districts.find(
      (district) => `${district.label}` === value
    );
    if (selectedDistrict) {
      setFormData((prevData) => ({
        ...prevData,
        districtId: selectedDistrict.value.toString(),
      }));
      setSelectedDistrict(selectedDistrict);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        districtId: "",
      }));
      setSelectedDistrict(undefined);
    }
  };

  const [selectedGender, setSelectedGender] = useState(
    genders.find((gender) => gender.value === formData.genderId)
  );

  const handleGenderChange = (value: string) => {
    const selectedGender = genders.find((gender) => gender.label === value);
    if (selectedGender) {
      setFormData((prevData) => ({
        ...prevData,
        genderId: selectedGender.value,
      }));
      setSelectedGender(selectedGender);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        genderId: null,
      }));
      setSelectedGender(undefined);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
    }
  };

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  // Hàm xử lý khi nhấn nút "Cancel"
  const handleCancel = () => {
    resetFormData();
    setIsEditing(false);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDelete = async () => {
    try {
      const response = await a.delete(
        `https://localhost:7209/api/UserAccounts/${user.userId}`
      );

      if (response.status === 204) {
        // Xử lý trường hợp xóa thành công với mã 204
        toast.success("User deleted successfully");
        setIsDialogOpen(false);
        router.push("/dashboard/user-accounts");
      } else {
        toast.error(`Failed to delete user: ${response.statusText}`);
      }
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };
  return (
    <Card className="w-full border-foreground/20">
      <CardHeader className="mb-2">
        <div className="flex items-start space-x-4">
          <UserAvatar
            imageUrl={user.avatarImageUrl || "/avatar.jpg"}
            fallback={avatarFallback}
            altText={`${user.userFirstName} ${user.userLastName}`}
          />
          <div>
            <CardTitle className="text-2xl sm:text-3xl font-semibold sm:flex sm:space-x-2">
              <span>{user.userFirstName}</span>
              <span>{user.userLastName}</span>
            </CardTitle>
            <CardDescription className="text-secondary-foreground">
              Detail user information
            </CardDescription>
            <CardDescription className="text-secondary-foreground">
              Id number: {user.userId}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2 sm:grid-cols-2">
        <FormInput
          id="userFirstName"
          label="First Name"
          value={formData.userFirstName}
          readOnly={!isEditing}
          onChange={handleChange}
        />
        <FormInput
          id="userLastName"
          label="Last Name"
          value={formData.userLastName}
          readOnly={!isEditing}
          onChange={handleChange}
        />
        <FormInput
          id="emailAddress"
          label="Email"
          value={formData.emailAddress}
          readOnly={!isEditing}
          onChange={handleChange}
        />
        <div className="relative">
          <Label htmlFor="userPassword" className="text-lg font-medium">
            Password
          </Label>
          <Input
            id="userPassword"
            type={showPassword ? "text" : "password"}
            value={formData.userPassword}
            readOnly={!isEditing}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <FormInput
          id="phoneNumber"
          label="Phone Number"
          value={formData.phoneNumber}
          readOnly={!isEditing}
          onChange={handleChange}
        />
        <FormCombobox
          id="genderId"
          label="Gender"
          value={selectedGender ? selectedGender.label : ""}
          readOnly={!isEditing}
          options={genders.map((gender) => ({
            value: gender.label,
            label: gender.label,
          }))}
          onChange={handleGenderChange}
        />
        <div>
          <Label htmlFor="userDob" className="text-lg font-medium">
            Date of Birth
          </Label>
          {isEditing ? (
            <Input
              id="userDob"
              type="date"
              value={
                formData.userDob
                  ? format(new Date(formData.userDob), "yyyy-MM-dd")
                  : ""
              }
              onChange={handleDateChange}
            />
          ) : (
            <Input id="userDob" value={formatUserDob(user.userDob)} readOnly />
          )}
        </div>
        <FormInput
          id="userAbout"
          label="About"
          value={formData.userAbout || undefined}
          readOnly={!isEditing}
          onChange={handleChange}
        />
        <div className="sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-4">
          <FormCombobox
            id="districtId"
            label="Address"
            value={
              selectedDistrict
                ? `${selectedDistrict.label}`
                : `${user.districtName}-${user.provinceName}`
            }
            onChange={handleDistrictChange}
            options={districts.map((district) => ({
              value: `${district.label}`,
              label: `${district.label}`,
            }))}
            readOnly={!isEditing}
          />
          <div>
            <Label htmlFor="avatarUpload" className="text-lg font-medium">
              Upload New Avatar
            </Label>
            <Input
              id="avatarUpload"
              type="file"
              disabled={!isEditing}
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <FormActions
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onCancel={handleCancel}
          onSave={handleSave}
          setIsDialogOpen={setIsDialogOpen}
        />
      </CardContent>
      <DialogConfirm
        isOpen={isDialogOpen}
        onConfirm={handleDelete}
        onCancel={() => setIsDialogOpen(false)}
        id={user.userId}
        objectName="user"
      />
    </Card>
  );
}
