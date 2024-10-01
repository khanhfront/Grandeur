import Link from "next/link";
import { Suspense } from "react";
import Sidebar from "@/components/layout/sidebar-dashboard";
import { ModeToggle } from "@/components/common/button/mode-toggle";
import { AdminNav } from "@/components/dashboard/admin_nav";
import DynamicBreadcrumb from "@/components/layout/breadcrumb/dynamic-breadcrumb";
import MobileSidebarDashboard from "@/components/layout/mobile-sidebar-dashboard";
import PageContainer from "@/components/layout/page-container";
import { ScrollArea } from "@/components/ui/scroll-area";
import CommandSearch from "@/components/dashboard/command_search";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 transition-[width] duration-500 ">
        {/* Header chiếm hết chiều rộng của main */}
        <header className="bg-background p-4 shadow-md w-full flex justify-between items-center border-b">
          <div className="flex flex-1 items-center justify-start md:hidden">
            <MobileSidebarDashboard />
          </div>
          <div className="flex items-center justify-center md:justify-start">
            <CommandSearch />
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <ModeToggle />
            <AdminNav />
          </div>
        </header>
        {/* Nội dung bên dưới Header */}
        <div className="p-4">
          <DynamicBreadcrumb />
          <ScrollArea className="h-[calc(100dvh-140px)]">{children}</ScrollArea>
        </div>
      </main>
    </div>
  );
}
