import RegisterForm from "@/components/form/user-register-form";
import { Button } from "@/components/ui/button";
import Link from "next/link"; // For navigation
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create an account to get started on Grandeur.",
};

const Page = () => {
  return (
    <div className="flex items-center justify-center text-foreground">
      {/* Left section - Welcome Message */}
      <div className="w-1/2 pr-8 text-left hidden md:block">
        <h1 className="text-3xl font-bold text-primary">
          Welcome to Our Platform
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Sign up to get started and unlock exclusive features.
        </p>
        <p className="mt-6 text-sm">
          Already have an account?{" "}
          <Link href="/login">
            <Button variant="link" className="text-primary">
              Log in
            </Button>
          </Link>
        </p>
      </div>

      {/* Right section - Registration Form */}
      <div className="w-full md:w-1/2 md:pl-8 md:border-l md:border-border">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Page;
