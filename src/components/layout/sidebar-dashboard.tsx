"use client";
import React, { useState, useEffect } from "react";
import { DashboardNav } from "../dashboard/dashboard_nav";
import { navSections } from "../dashboard/item";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useSidebar } from "@/hooks/use-sidebar";
import Link from "next/link";
import PageContainer from "./page-container";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();

  const handleToggle = () => {
    toggle();
  };

  return (
    <aside
      className={cn(
        `relative hidden md:block h-screen flex-none border-r bg-card transition-[width] duration-500 `,
        !isMinimized ? "w-64" : "w-[75px]",
        className
      )}
    >
      <div className={cn(`hidden p-3 pt-5 lg:block text-hdbg mr-5 font-bold `)}>
        <Link href={"/dashboard"} className="text-lg ">
          Logo
        </Link>
      </div>
      <ChevronLeft
        size={15}
        className={cn(
          "absolute -right-2 top-7 z-50 cursor-pointer rounded-full outline outline-offset-2 outline-[1px] outline-hdbg text-hdbg bg-background",
          isMinimized && "rotate-180"
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 p-1 py-2">
        <ScrollArea className="h-[calc(100dvh-100px)]">
          <div className="px-2 pr-3">
            <div className="mt-3 space-y-1">
              <DashboardNav sections={navSections} />
            </div>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </div>
    </aside>
  );
}
