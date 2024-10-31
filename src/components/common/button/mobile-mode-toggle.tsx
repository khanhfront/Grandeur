"use client";

import * as React from "react";
import { useState } from "react";
import { Monitor, MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "./custom-header-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function MobileModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isActive, setIsActive] = useState<string | undefined>(theme);

  const handleThemeChange = (theme: string) => {
    setTheme(theme);
    setIsActive(theme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          aria-label="Mode toggle"
          className="rounded-full text-foreground bg-background outline outline-[1px] hover:bg-hdbg flex 
          md:hidden fixed bottom-20 right-6 min-[200px]:right-8 sm:right-14 z-20
          h-6 w-6 p-1
          sm:h-7 sm:w-7 "
        >
          <Sun className="h-4 w-4 sm:h-5 sm:w-5 md:h-[1.2rem] md:w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonStar className="absolute h-4 w-4 sm:h-5 sm:w-5 md:h-[1.2rem] md:w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="">
        <DropdownMenuItem
          className={`flex justify-between ${
            isActive === "light" ? "bg-secondary text-foreground" : ""
          }`}
          onClick={() => handleThemeChange("light")}
        >
          Light <Sun />
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`flex justify-between ${
            isActive === "dark" ? "bg-secondary text-foreground" : ""
          }`}
          onClick={() => handleThemeChange("dark")}
        >
          Dark <MoonStar />
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`flex justify-between ${
            isActive === "system" ? "bg-secondary text-foreground" : ""
          }`}
          onClick={() => handleThemeChange("system")}
        >
          System <Monitor />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
