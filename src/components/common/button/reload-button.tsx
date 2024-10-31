"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { revalidateP } from "@/serverActions/revalidateFt";

export const ReloadButton: React.FC = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [clickCount, setClickCount] = useState<number>(0);
  const [isCooldown, setIsCooldown] = useState<boolean>(false);
  const cooldownDuration = 60000;
  const startTime = useRef<number | null>(null);

  const handleClick = () => {
    if (isCooldown) {
      const remainingTime = Math.ceil(
        (cooldownDuration - (Date.now() - (startTime.current || Date.now()))) /
          1000
      );
      toast.warning(`Bạn đã ấn quá nhiều! Vui lòng chờ ${remainingTime} giây`);
    } else {
      if (clickCount < 6) {
        setClickCount((prevCount) => prevCount + 1);
        revalidateP(pathName);
        router.refresh();
      } else {
        setIsCooldown(true);
        startTime.current = Date.now();
        const remainingTime = Math.ceil(cooldownDuration / 1000);
        toast.warning(
          `Bạn đã ấn quá nhiều! Vui lòng chờ ${remainingTime} giây`
        );
      }
    }
  };

  useEffect(() => {
    if (isCooldown) {
      const timeout = setTimeout(() => {
        setIsCooldown(false);
        setClickCount(0);
      }, cooldownDuration);
      return () => clearTimeout(timeout);
    }
  }, [isCooldown]);

  return <Button onClick={handleClick}>Reload</Button>;
};
