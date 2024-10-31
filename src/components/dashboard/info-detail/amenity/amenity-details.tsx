"use client";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import FormInput from "../component/form-input";
import FormCombobox from "../component/form-combobox";
import FormActions from "../component/form-action";
import { a } from "@/utils/antiSSL";
import { amenityTypes } from "@/constant/data";
import DialogConfirm from "../component/dialog-confirm";

type AmenityCardProps = {
  amenity: Amenity;
};

export default function AmenityCard({ amenity }: AmenityCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const initialFormData = {
    amenityName: amenity.amenityName || "",
    amenityDescription: amenity.amenityDescription || "",
    amenityTypeName: amenity.amenityTypeName || "",
  };
  const [formData, setFormData] = useState(initialFormData);

  function getAmenityTypeIdByName(amenityTypeName: string) {
    const amenityType = amenityTypes.find(
      (d) => d.label.toLowerCase() === amenityTypeName.toLowerCase()
    );
    return amenityType ? amenityType.value : null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleAmenityTypeChange = (value: string) => {
    const selectedType = amenityTypes.find((type) => type.label === value);
    if (selectedType) {
      setFormData((prevData) => ({
        ...prevData,
        amenityTypeName: selectedType.label,
      }));
    }
  };

  const handleSave = async () => {
    if (!formData.amenityName) {
      toast.error("Amenity name is required");
      return;
    }

    if (!formData.amenityDescription) {
      toast.error("Amenity description is required");
      return;
    }

    const result = {
      amenityName: formData.amenityName,
      amenityDescription: formData.amenityDescription,
      amenityTypeId: getAmenityTypeIdByName(formData.amenityTypeName),
    };

    console.log("Amenity data to submit:", result);

    // Replace this with actual API call
    // await api.updateAmenity(amenity.amenityId, result);
    const apiEndpoint = `https://localhost:7209/api/amenities/${amenity.amenityId}`;
    const response = await a.put(apiEndpoint, result);
    if (response.status === 204) {
      toast.success("Amenity updated successfully");
      router.refresh();
    } else {
      toast.error("Failed to update amenity");
    }

    setIsEditing(false);
  };

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  // Hàm xử lý khi nhấn nút "Cancel"
  const handleCancel = () => {
    resetFormData();
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      const response = await a.delete(
        `http://localhost:5280/api/amenities/${amenity.amenityId}`
      );

      if (response.status === 204) {
        // Xử lý trường hợp xóa thành công với mã 204
        toast.success("Amenity deleted successfully");
        setIsDialogOpen(false);
        router.push("/dashboard/amenities");
      } else {
        toast.error(`Failed to delete amenity: ${response.statusText}`);
      }
    } catch (error) {
      toast.error("Failed to delete amenity");
    }
  };

  return (
    <Card className="w-full border-foreground/20">
      <CardHeader className="mb-2">
        <CardTitle className="text-2xl font-semibold">
          {amenity.amenityName}
        </CardTitle>
        <CardDescription className="text-secondary-foreground">
          Amenity details
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-2">
        <FormInput
          id="amenityName"
          label="Amenity Name"
          value={formData.amenityName}
          readOnly={!isEditing}
          onChange={handleChange}
        />
        <FormInput
          id="amenityDescription"
          label="Description"
          value={formData.amenityDescription}
          readOnly={!isEditing}
          onChange={handleChange}
        />
        <FormCombobox
          id="amenityTypeName"
          label="Amenity Type"
          value={formData.amenityTypeName}
          options={amenityTypes.map((type) => ({
            value: type.label,
            label: type.label,
          }))}
          onChange={handleAmenityTypeChange}
          readOnly={!isEditing}
        />
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
        id={amenity.amenityId}
        objectName="amenity"
      />
    </Card>
  );
}
