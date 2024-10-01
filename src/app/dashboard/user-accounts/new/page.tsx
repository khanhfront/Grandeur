import ButtonLink from "@/components/common/button/link-button";
import UserAccountForm from "@/components/common/form/create-user-account-form";
import { Heading } from "@/components/ui/heading";

export default function createUserAccount() {
  return (
    <div className="space-y-2">
      <div className="flex item-start">
        <Heading
          title="Add new user"
          description="Create user function for Admin"
        />
      </div>
      <div className="flex justify-center">
        <UserAccountForm />
      </div>
    </div>
  );
}
