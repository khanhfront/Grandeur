"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AiOutlineHome,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineUser,
} from "react-icons/ai";
import { PiTrolleySuitcase } from "react-icons/pi";
import { MAccountDropdownMenu } from "./accountNav";
import React from "react";

type NavItemProps = {
  icon: JSX.Element;
  label: string;
  href: string;
};

const NavItem = ({ icon, label, href }: NavItemProps) => {
  const pathName = usePathname();

  return (
    <li className="flex-1 text-center">
      {href === "/account-settings" ? (
        <div
          className={`${
            pathName === href ? "text-hdbg" : ""
          } flex-1 flex items-center`}
        >
          <MAccountDropdownMenu />
        </div>
      ) : (
        <Link
          href={href}
          className={`flex flex-col items-center justify-center text-center w-full ${
            pathName === href ? "text-hdbg" : ""
          }`}
        >
          {icon}
          <div className="text-xs mt-1 hidden min-[380px]:inline">{label}</div>
        </Link>
      )}
    </li>
  );
};

const MobileNavigation = () => {
  return (
    <div className="flex flex-1 sticky inset-x-0 bottom-0 md:hidden bg-background text-foreground w-full py-2 z-10">
      <ul className="flex justify-between w-full items-center">
        <NavItem
          href="/"
          icon={<AiOutlineHome className="text-sm min-[380px]:text-sm" />}
          label="Home"
        />
        <NavItem
          href="/wishlists"
          icon={<AiOutlineHeart className="text-sm min-[380px]:text-base" />}
          label="Wishlists"
        />
        <NavItem
          href="/account-settings"
          icon={<AiOutlineUser className="text-sm min-[380px]:text-base" />}
          label="Settings"
        />
        <NavItem
          href="/booking"
          icon={<PiTrolleySuitcase className="text-sm min-[380px]:text-base" />}
          label="Trips"
        />
        <NavItem
          href="/messages"
          icon={<AiOutlineMessage className="text-sm min-[380px]:text-base" />}
          label="Messages"
        />
      </ul>
    </div>
  );
};

export default MobileNavigation;
