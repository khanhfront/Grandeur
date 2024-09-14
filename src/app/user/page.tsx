import LogoutButton from "@/components/button/logout-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User",
  description: "Page for user on MyApp.",
};

export default function Page() {
  return (
    <>
      <div>đây là trang user</div>
      <LogoutButton />
    </>
  );
}
