"use client";
import { ModeToggle } from "@/components/common/button/mode-toggle";
import SearchComponent from "@/components/layout/search/main-search-component";
import Image from "next/image";
import Link from "next/link";
import { AccountDropdownMenu } from "./accountNav";
import { useEffect, useRef, useState } from "react";
import MobileSearchComponent from "./search/mobile-search";
import { useTheme } from "next-themes";

const Header = () => {
  const [isRounded, setIsRounded] = useState(true);
  const themeStore = useTheme();
  const isRoundedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 0;
      const header = document.querySelector("header");
      if (header) {
        const rect = header.getBoundingClientRect();
        const shouldRounded = rect.top > threshold;
        if (shouldRounded !== isRoundedRef.current) {
          isRoundedRef.current = shouldRounded;
          setIsRounded(shouldRounded);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header
      className={`
        bg-background
        sticky top-0
        flex items-center justify-center 
        z-10
        transition-all duration-300
        mt-3 md:mt-4 lg:mt-5
        mb-1 sm:mb-2 md:mb-3 lg:mb-4
        px-0 min-[220px]:px-6 sm:px-12 md:mx-16 lg:mx-24 
        dark:md:mx-0 dark:md:px-16 dark:lg:px-24
        ${
          themeStore.theme === "light" && isRounded && "sm:px-1 md:px-4 lg:px-8"
        }
        ${
          isRounded
            ? "md:rounded-full rounded-none max-md:border-b max-md:pb-2"
            : "rounded-none border-b bg-background md:!mx-0 md:px-16 lg:px-24"
        }
        md:shadow-primary dark:shadow-none
  `}
    >
      <div
        id="userHeader"
        className={`transition-all duration-300
        w-full bg-background text-hdbg 
        p-1 md:py-2 dark:sm:px-1 dark:md:px-4 dark:lg:px-8 
        ${
          isRounded
            ? "md:amzcard dark:md:py-1"
            : "dark:!px-0 dark:sm:px-0 dark:md:px-0 dark:lg:px-0 dark:md:py-1"
        }
        flex items-center justify-between sm:justify-center md:justify-between
         md:rounded-full
         `}
      >
        <Link
          href={"/"}
          className="hidden md:flex items-center text-sm font-bold gap-1 transition-all duration-300"
        >
          <Image
            src="/logo.svg"
            alt="Grandeur logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="bg-gradient-to-r from-[#F32189] to-[#83CDF1] bg-clip-text text-transparent">
            Grandeur
          </span>
        </Link>
        <MobileSearchComponent />
        <SearchComponent />
        <div className="hidden md:flex items-center justify-between space-x-4 transition-all duration-300">
          <ModeToggle />
          <AccountDropdownMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
