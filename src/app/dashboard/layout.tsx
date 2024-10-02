import Sidebar from "@/components/layout/sidebar-dashboard";
import DynamicBreadcrumb from "@/components/layout/breadcrumb/dynamic-breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "@/components/layout/header-dashboard";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 transition-[width] duration-500 ">
        <Header />
        <div className="p-4">
          <DynamicBreadcrumb />
          <ScrollArea className="h-[calc(100dvh-140px)]">{children}</ScrollArea>
        </div>
      </main>
    </div>
  );
}
