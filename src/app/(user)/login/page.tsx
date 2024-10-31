import LoginForm from "@/components/common/form/login-form";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to get awesome features on Granduer.",
};

export default function Page() {
  return (
    <div className="flex h-[25rem] items-center justify-center text-foreground">
      {/* Left section - Welcome Message */}
      <div className="w-1/2 pr-8 text-left hidden md:block">
        <h1 className="text-3xl font-bold text-primary">Welcome Back!</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Log in to access your account and explore new experiences.
        </p>
        <p className="mt-6 text-sm">
          {"Don't have an account? "}
          <Link href="/register">
            <Button variant="link" className="text-primary">
              Sign up
            </Button>
          </Link>
        </p>
      </div>

      {/* Right section - Login Form */}
      <div className="w-full md:w-1/2 md:pl-8 md:border-l md:border-border">
        <LoginForm />
      </div>
    </div>
  );
}
