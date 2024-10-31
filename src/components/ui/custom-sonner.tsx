"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  const [toastPosition, setToastPosition] = useState<
    "top-left" | "bottom-left"
  >("bottom-left");

  useEffect(() => {
    const updateToastPosition = () => {
      if (window.innerWidth <= 768) {
        setToastPosition("top-left");
      } else {
        setToastPosition("bottom-left");
      }
    };

    updateToastPosition();
    window.addEventListener("resize", updateToastPosition);

    return () => {
      window.removeEventListener("resize", updateToastPosition);
    };
  }, []);

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position={toastPosition} // Vị trí toast linh hoạt dựa trên màn hình
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
