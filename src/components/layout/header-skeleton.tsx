import React from "react";

const HeaderSkeleton = () => {
  return (
    <header className="sticky top-0 mt-3 md:mt-4 lg:mt-5 mb-1 sm:mb-2 md:mb-3 lg:mb-4 flex items-center justify-center z-10 rounded-full mx-6 sm:mx-12 md:mx-16 lg:mx-24 shadow-primary dark:shadow-none transition-all duration-300 bg-gray-200 animate-pulse">
      <div className="w-full bg-background text-hdbg p-1 sm:px-1 md:px-4 lg:px-8 flex items-center justify-between sm:justify-center md:justify-between rounded-full">
        {/* Logo Skeleton */}
        <div className="hidden md:flex items-center text-sm font-bold gap-1">
          <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-32 bg-gray-300 rounded-full"></div>
        </div>

        {/* Search Component Skeleton */}
        <div className="h-8 w-48 bg-gray-300 rounded-full"></div>

        {/* Icons Skeleton */}
        <div className="hidden md:flex items-center justify-between space-x-2 sm:space-x-4">
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default HeaderSkeleton;
