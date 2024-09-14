import ButtonLink from "@/components/button/link-button";
import AddPropertyForm from "@/components/form/property-form";
import { Heading } from "@/components/ui/heading";

export default function createPropertyAccount() {
  return (
    <div className="space-y-2">
      <div className="flex item-start">
        <Heading
          title="Add new Property"
          description="Create Property function for Admin"
        />
      </div>
      <div className="flex justify-center">
        <AddPropertyForm />
      </div>
    </div>
  );
}
