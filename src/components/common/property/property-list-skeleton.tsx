export const PropertyCardSkeleton = () => {
  return (
    <div className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 hover:translate-y-1 transition-translate transform-gpu border-transparent dark:border-border animate-pulse">
      <div className="p-0">
        <div className="relative w-full h-0 pb-[60%] bg-gray-300 rounded-t-lg" />
      </div>
      <div className="px-2 md:px-3 lg:px-4 pt-1 pb-0">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-1"></div>
        <div className="h-5 bg-gray-300 rounded w-1/2 mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="flex justify-between items-center mb-1 md:mb-3 xl:mb-4">
          <div className="flex gap-2">
            <div className="h-5 w-8 bg-gray-300 rounded"></div>
            <div className="h-5 w-8 bg-gray-300 rounded"></div>
            <div className="h-5 w-8 bg-gray-300 rounded"></div>
          </div>
          <div className="h-5 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
      <div className="flex justify-center items-center px-2 md:px-3 lg:px-4 pb-2 md:pb-4">
        <div className="h-8 w-full bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};
