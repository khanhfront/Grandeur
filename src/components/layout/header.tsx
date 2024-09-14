import { ModeToggle } from "@/components/button/mode-toggle";
import { AccountDropdownMenu } from "@/components/layout/accountNav";
import SearchComponent from "@/components/layout/main-search-component";

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
      p-1 sm:px-4 md:px-6 lg:px-10 
      flex items-center justify-between 
      z-100 rounded-full"
      >
        <div className=" hidden md:block text-lg sm:text-xl font-bold">
          Logo
        </div>
        <SearchComponent />
        <div className="flex items-center justify-between space-x-2 sm:space-x-4">
          <ModeToggle />
          <AccountDropdownMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
