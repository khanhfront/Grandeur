"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonAddIconProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export default function ButtonAddIcon({
  children,
  className,
  onClick,
  variant,
}: ButtonAddIconProps) {
  return (
    <Button
      size={"icon"}
      variant={variant ? variant : "outline"}
      className="rounded-full flex items-center justify-center h-6 w-6 md:h-8 md:w-8"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
