import { Suspense } from "react";
import PageContainer from "@/components/layout/page-container";
import DynamicBreadcrumb from "@/components/layout/breadcrumb/dynamic-breadcrumb";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageContainer>
      <DynamicBreadcrumb />
      <Suspense>{children}</Suspense>
    </PageContainer>
  );
}
