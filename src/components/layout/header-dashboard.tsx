import { ModeToggle } from "../common/button/mode-toggle";
import { AdminNav } from "../dashboard/admin_nav";
import CommandSearch from "../dashboard/command_search";
import MobileSidebarDashboard from "./mobile-sidebar-dashboard";

export default function Header() {
  return (
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
  );
}
