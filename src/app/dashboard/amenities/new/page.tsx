import AddAmenityForm from "@/components/common/form/amenity-form";
import { Heading } from "@/components/ui/heading";

export default function createAmenity() {
  return (
    <div className="space-y-2">
      <div className="flex item-start">
        <Heading
          title="Add new amenity"
          description="Create amenity function for Admin"
        />
      </div>
      <div className="flex justify-center">
        <AddAmenityForm />
      </div>
    </div>
  );
}
