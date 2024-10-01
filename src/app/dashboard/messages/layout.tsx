import { Suspense } from "react";
import PageContainer from "@/components/layout/page-container";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense>{children}</Suspense>;
}
