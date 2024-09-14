import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

interface NavSectionItemProps {
  item: NavItem;
  path: string;
  isMinimized: boolean;
}

export function NavSectionItem({
  item,
  path,
  isMinimized,
}: NavSectionItemProps) {
  const ItemIcon =
    Icons[item.icon as keyof typeof Icons] || Icons["arrowRight"];

  return (
    item.href && (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={item.disabled ? "/" : item.href}
            className={cn(
              "flex items-center gap-2 overflow-hidden rounded-md py-2 pl-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              (path.startsWith(item.href) && item.href !== "/dashboard") ||
                (item.href === "/dashboard" && path === item.href)
                ? "bg-accent"
                : "transparent",
              item.disabled && "cursor-not-allowed opacity-80"
            )}
          >
            <ItemIcon className="size-5 flex-none" />
            <span
              className={`mr-2 truncate transition-opacity duration-500 ${
                !isMinimized ? "opacity-100" : "opacity-0"
              }`}
            >
              {!isMinimized ? item.title : ""}
            </span>
          </Link>
        </TooltipTrigger>
        <TooltipContent
          align="center"
          side="right"
          sideOffset={8}
          className={!isMinimized ? "hidden" : "inline-block"}
        >
          {item.title}
        </TooltipContent>
      </Tooltip>
    )
  );
}
