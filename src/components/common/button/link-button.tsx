"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonLinkProps {
  url: string;
  children: React.ReactNode;
  className?: string;
}

export default function ButtonLink({
  url,
  children,
  className,
}: ButtonLinkProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(url);
  };

  return (
    <Button variant={"link"} onClick={handleClick} className={cn(className)}>
      {children}
    </Button>
  );
}
