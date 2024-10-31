const ImageGallerySkeleton = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 relative">
        <div className="col-span-1 row-span-1 max-[420px]:h-48 max-md:h-60 md:col-span-2 md:row-span-2 relative">
          <div className="w-full h-full bg-gray-300 animate-pulse"></div>
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="relative hidden md:block">
            <div className="w-full aspect-[16/9] bg-gray-300 animate-pulse"></div>
          </div>
        ))}
        <div className="absolute bottom-2 right-2 mt-2 text-right">
          <div className="inline-block px-4 py-2 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallerySkeleton;
