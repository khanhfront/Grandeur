"use client";
import { usePathname } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NavSection } from "./nav_section";
import LogoutButton from "./logout";

interface DashboardNavProps {
  sections: NavSection[];
}

export function DashboardMobileNav({ sections }: DashboardNavProps) {
  const path = usePathname();

  if (!sections?.length) {
    return null;
  }

  return (
    <nav className="grid gap-2">
      <TooltipProvider>
        {sections.map((section, index) => (
          <NavSection
            key={index}
            section={section}
            path={path}
            isMinimized={false}
          />
        ))}
      </TooltipProvider>
      <LogoutButton isMinimized={false} />
    </nav>
  );
}
