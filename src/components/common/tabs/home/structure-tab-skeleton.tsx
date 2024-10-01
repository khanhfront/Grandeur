export const StructureTabSkeleton = () => {
  return (
    <div className="w-full flex justify-center mb-2">
      <div className="w-[calc(100dvw-50px)] sm:w-[calc(100dvw-98px)] md:w-[calc(100dvw-130px)] lg:w-[calc(100dvw-194px)] flex gap-3 xl:justify-between mb-2 pr-1">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center text-center space-y-2"
          >
            {/* Icon Skeleton */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            {/* Text Skeleton */}
            <div className="w-16 h-4 sm:w-20 sm:h-5 md:w-24 md:h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
};
