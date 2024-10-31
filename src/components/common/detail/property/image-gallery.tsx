"use client";

import React, { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Grip, X } from "lucide-react";
import { BsPinAngleFill } from "react-icons/bs";
import Image from "next/image";
import { useTheme } from "next-themes";
import { PiGooglePhotosLogoFill } from "react-icons/pi";

interface PropertyPhoto {
  propertyId: number;
  isMainPhoto: boolean;
  photoUrl: string;
  photoDescription: string | null;
}

interface ImageGalleryProps {
  propertyPhotoList: PropertyPhoto[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ propertyPhotoList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    function handlClickOutsideContent(event: MouseEvent) {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handlClickOutsideContent);
    return () => {
      document.removeEventListener("mousedown", handlClickOutsideContent);
    };
  });

  const [selectedPhoto, setSelectedPhoto] = useState<PropertyPhoto | null>(
    null
  );
  const [maxImage, setMaxImage] = useState<number>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(min-width: 768px)").matches ? 5 : 1;
    }
    return 5;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleMediaChange = (event: MediaQueryListEvent) => {
      setMaxImage(event.matches ? 5 : 1);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    setMaxImage(mediaQuery.matches ? 5 : 1);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  const sortedPhotos = [...propertyPhotoList].sort((a, b) => {
    if (a.isMainPhoto && !b.isMainPhoto) return -1;
    if (!a.isMainPhoto && b.isMainPhoto) return 1;
    return 0;
  });

  let displayImages = sortedPhotos.slice(0, maxImage);
  const { resolvedTheme, theme } = useTheme();
  const darkOrLight = resolvedTheme || theme;

  if (maxImage === 5 && displayImages.length < 5) {
    const dummyImages: PropertyPhoto[] = Array.from(
      { length: 5 - displayImages.length },
      (_, index) => ({
        propertyId: -1,
        isMainPhoto: false,
        photoUrl:
          darkOrLight === "dark"
            ? `https://firebasestorage.googleapis.com/v0/b/grandeur-1aa6e.appspot.com/o/properties%2Fcoming-soon-word-metallic-text-style.jpg?alt=media&token=66ab7c79-b0b6-4aa4-b685-3901c50629a0`
            : "https://firebasestorage.googleapis.com/v0/b/grandeur-1aa6e.appspot.com/o/properties%2Fpink-coming-soon.png?alt=media&token=e5ea7526-0ba1-4800-8f7a-6214a2e53fe7",
        photoDescription: `Hình ảnh sắp có`,
      })
    );
    displayImages = [...displayImages, ...dummyImages];
  }

  const remaining = sortedPhotos.length - maxImage;

  const openFullScreenImage = (photo: PropertyPhoto) => {
    if (photo.propertyId !== -1) {
      setSelectedPhoto(photo);
      setIsOpen(true);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {displayImages.map((photo, index) => {
          const isDummy = photo.propertyId === -1;
          const isMain = photo.isMainPhoto && !isDummy;

          const colSpan = isMain
            ? "col-span-1 row-span-1 max-[250px]:h-40 max-[450px]:h-60 max-md:h-96 md:col-span-2 md:row-span-2 md:h-full"
            : "";

          return (
            <div key={photo.photoUrl + index} className={`${colSpan} relative`}>
              <div
                className={`w-full ${
                  isMain ? "h-full" : "aspect-[16/9]"
                } relative`}
              >
                <Image
                  src={photo.photoUrl}
                  alt={photo.photoDescription || `Image ${index + 1}`}
                  title={photo.photoDescription || `Ảnh số ${index + 1}`}
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 30vw"
                  quality={100}
                  fill
                  onClick={() => openFullScreenImage(photo)}
                  className={`object-cover cursor-pointer 
                    ${index === 0 ? "rounded-l-lg" : ""} 
                    ${index === 2 ? "rounded-tr-lg" : ""} 
                    ${index === 4 ? "rounded-br-lg" : ""}
                    ${
                      photo.propertyId === -1 && resolvedTheme === "light"
                        ? "opacity-30"
                        : ""
                    }
                    `}
                  loading={isMain ? "eager" : "lazy"}
                  priority={isMain}
                />
              </div>
              {isMain && (
                <>
                  <span className="absolute top-2 left-2 bg-hdbg text-white text-xs px-2 py-1 rounded hidden min-[250px]:inline">
                    Main Photo
                  </span>
                  <span className="absolute top-2 left-2 bg-hdbg text-white text-xs px-2 py-1 rounded min-[250px]:hidden">
                    <PiGooglePhotosLogoFill />
                  </span>
                </>
              )}
              {index === maxImage - 1 && remaining > 0 && !isDummy && (
                <div
                  className="absolute bottom-2 right-2 bg-background text-foreground flex items-center justify-center text-sm cursor-pointer outline outline-foreground px-2 py-1 rounded-lg gap-1"
                  onClick={() => setIsOpen(true)}
                >
                  <Grip className="w-2 h-2 min-[400px]:w-3 min-[400px]:h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 2xl:h-8" />
                  <span className="hidden min-[900px]:block">
                    Xem thêm {remaining} ảnh
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Dialog */}
      {propertyPhotoList.length > 0 && (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0" />
            <Dialog.Content className="fixed inset-0 flex items-center justify-center px-6 sm:px-12 md:px-16 lg:px-24 py-2 z-10">
              <div className="hidden">
                <Dialog.Title className="text-xl font-semibold mb-4">
                  Tất cả hình ảnh
                </Dialog.Title>
                <Dialog.Description className="mb-6">
                  Xem tất cả các hình ảnh liên quan đến tài sản.
                </Dialog.Description>
              </div>
              <div
                className="bg-popover rounded-lg shadow-lg w-full max-h-full overflow-auto p-6 relative border"
                ref={contentRef}
              >
                <button
                  className="absolute top-1 right-1 text-foreground hover:text-gray-700"
                  onClick={() => {
                    setIsOpen(false);
                    setSelectedPhoto(null);
                  }}
                  aria-label="Close dialog"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                  {selectedPhoto && (
                    <div
                      className="w-full h-0 pb-[100%] col-span-1 rounded-md relative 
                    overflow-hidden shadow-lg border
                     cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:z-10"
                    >
                      <Image
                        src={selectedPhoto.photoUrl}
                        alt={selectedPhoto.photoDescription || "Full Image"}
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 55vw"
                        className="object-cover"
                        loading="lazy"
                        quality={100}
                      />

                      {/* Overlay hiệu ứng khi hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-50 transition-opacity duration-300"></div>

                      {/* Thêm text hoặc icon trên ảnh */}
                      <span className="absolute bottom-2 left-2 text-white text-sm font-semibold">
                        {selectedPhoto.photoDescription || "Luxury Image"}
                      </span>
                    </div>
                  )}
                  <div
                    className={`w-full md:pl-4 ${
                      selectedPhoto ? "col-span-1" : "col-span-full"
                    }`}
                  >
                    <h2 className="text-2xl mb-2">
                      All Images {`(${propertyPhotoList.length})`}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {sortedPhotos.map((photo, index) => (
                        <div key={photo.photoUrl + index} className="relative">
                          <div className="w-full aspect-[16/9] relative">
                            <Image
                              src={photo.photoUrl}
                              alt={
                                photo.photoDescription || `Image ${index + 1}`
                              }
                              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              fill
                              onClick={() => openFullScreenImage(photo)}
                              className="object-cover rounded cursor-pointer"
                              loading="lazy"
                            />
                          </div>
                          {photo.isMainPhoto && (
                            <span className="absolute hidden sm:block top-2 left-2 bg-hdbg text-white text-xs px-2 py-1 rounded">
                              Main Photo
                            </span>
                          )}
                          {selectedPhoto === photo && (
                            <span className="absolute top-1 right-1">
                              <BsPinAngleFill />
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </div>
  );
};

export default ImageGallery;
