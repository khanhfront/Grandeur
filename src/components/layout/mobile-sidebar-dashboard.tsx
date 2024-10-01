import { navSections } from "../dashboard/item";
import { DashboardMobileNav } from "../dashboard/dashboard_mobilde_nav";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import { Menu } from "lucide-react";

export default function MobileSidebarDashboard() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden" aria-label="Menu">
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <ScrollArea className="h-full pr-2 mr-1">
          <SheetHeader>
            <SheetTitle className="text-hdbg">Logo</SheetTitle>
            <SheetDescription>Dashboard for Admin</SheetDescription>
          </SheetHeader>
          <DashboardMobileNav sections={navSections} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
