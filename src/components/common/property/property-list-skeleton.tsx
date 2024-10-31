// components/common/property/PropertyListSkeleton.tsx
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const PropertyCardSkeleton = () => {
  return (
    <Card className="overflow-hidden shadow-lg animate-pulse">
      <CardHeader className="p-0 relative">
        <div className="relative w-full h-0 pb-[80%] bg-gray-200"></div>
      </CardHeader>
      <CardContent className="px-2 pt-1 pb-0">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      </CardContent>
      <CardFooter className="flex justify-center items-center px-2 pb-2">
        <div className="w-full h-8 bg-gray-200 rounded"></div>
      </CardFooter>
    </Card>
  );
};

export const PropertyListSkeleton = () => {
  return (
    <div className="grid gap-2 md:gap-3 lg:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-1 pb-2">
      {/* Hiển thị 4 skeleton cards */}
      {Array.from({ length: 4 }).map((_, index) => (
        <PropertyCardSkeleton key={index} />
      ))}
    </div>
  );
};
