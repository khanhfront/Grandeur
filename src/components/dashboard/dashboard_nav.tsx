"use client";
import { Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/hooks/use-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NavSection } from "./nav_section";
import LogoutButton from "./logout";

interface DashboardNavProps {
  sections: NavSection[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export function DashboardNav({ sections, setOpen }: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();

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
            isMinimized={isMinimized}
          />
        ))}
      </TooltipProvider>
      <LogoutButton isMinimized={isMinimized} />
    </nav>
  );
}
