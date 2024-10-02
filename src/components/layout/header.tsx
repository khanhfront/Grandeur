import { ModeToggle } from "@/components/common/button/mode-toggle";
import { AccountDropdownMenu } from "@/components/layout/accountNav";
import SearchComponent from "@/components/layout/main-search-component";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header
      className=" sticky top-2 
      mt-3 md:mt-4 lg:mt-5
      mb-1 sm:mb-2 md:mb-3 lg:mb-4 
      bg-background 
      flex items-center justify-center 
      z-100 rounded-full shadow-primary dark:shadow-none mx-6 sm:mx-12 md:mx-16 lg:mx-24"
    >
      <div
        id="userHeader"
        className="amzcard
        w-full bg-background text-hdbg 
        p-1 sm:px-1 md:px-4 lg:px-8 
        flex items-center justify-between sm:justify-center md:justify-between
        z-100 rounded-full"
      >
        <Link
          href={"/"}
          className="hidden md:flex items-center text-sm font-bold gap-1"
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
        <SearchComponent />
        <div className="hidden md:flex items-center justify-between space-x-2 sm:space-x-4">
          <ModeToggle />
          <AccountDropdownMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
