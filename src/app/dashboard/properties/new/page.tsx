import ButtonLink from "@/components/common/button/link-button";
import AddPropertyForm from "@/components/common/form/property-form";
import { Heading } from "@/components/ui/heading";

export default function createPropertyAccount() {
  return (
    <div className="space-y-2">
      <div className="flex item-start">
        <Heading
          title="Thêm mới Property"
          description="Chức năng tạo Property cho Admin"
        />
      </div>
      <div className="flex justify-center">
        <AddPropertyForm />
      </div>
    </div>
  );
}
