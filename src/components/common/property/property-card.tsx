import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaStar, FaBed, FaBath, FaUsers } from "react-icons/fa";
import ButtonLink from "../button/link-button";
import { slugify } from "@/utils/slugnify";
import dynamic from "next/dynamic";

const SaveWishedProperty = dynamic(() => import("./save"), {
  ssr: false,
});

type PropertyCardProps = {
  property: PropertyCardType;
  index: number;
};

const PropertyCard = ({ property, index }: PropertyCardProps) => {
  const isLoved = property.averagePropertyRating > 4.7 || property.isSponsored;

  const formatPrice = (price: number) => {
    if (price < 1_000_000) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    } else if (price < 1_000_000_000) {
      return (
        new Intl.NumberFormat("vi-VN", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(price / 1_000_000) + "M"
      );
    } else {
      return (
        new Intl.NumberFormat("vi-VN", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 3,
        }).format(price / 1_000_000_000) + "B"
      );
    }
  };

  return (
    <Card
      className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 
    hover:translate-y-1 transition-translate transform-gpu border-transparent dark:border-border"
    >
      <CardHeader className="p-0">
        <div className="relative w-full h-0 pb-[80%] block">
          <Image
            src={property.mainPhotoUrl}
            alt={property.propertyName}
            title={property.propertyName}
            fill
            style={{
              objectFit: "cover",
            }}
            className="object-center rounded-t-lg"
            sizes="(max-width: 430px) 50vw, (max-width: 640px) 90vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={index < 2}
            loading={index < 2 ? "eager" : "lazy"}
            decoding="sync"
          />
          <SaveWishedProperty propertyId={property.propertyId} />
          {isLoved && (
            <Badge className="absolute top-2 left-2 md:left-3 lg:left-4 bg-hdbg text-black outline outline-[1px] outline-white">
              HOT
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="px-2 md:px-3 lg:px-4 pt-1 pb-0">
        <div className="min-[180px]:flex justify-between items-center gap-1 mb-1">
          <h2 className="text-sm md:text-md lg:text-lg font-bold text-foreground truncate">
            {property.propertyName}
          </h2>
          <div className="flex items-center">
            <FaStar className="text-yellow-400" />
            <span className="text-foreground">
              {property.averagePropertyRating}
            </span>
            <span className="text-secondary-foreground ml-1">
              ({property.numberPropertyRating})
            </span>
          </div>
        </div>
        <div className="mb-1">
          <p className="text-secondary-foreground text-sm xl:text-base min-[2000px]:text-lg truncate">
            Chủ nhà:{" "}
            <span className="font-bold text-secondary-foreground truncate">
              {property.hostName}
            </span>
          </p>
        </div>
        <p className="text-secondary-foreground mb-1 text-sm xl:text-base min-[2000px]:text-lg truncate">
          {property.districtName}, {property.provinceName}
        </p>
        <div className="min-[330px]:flex justify-between items-center mb-1 md:mb-3 xl:mb-4">
          <div className="min-[180px]:flex gap-1 sm:gap-2 md:gap-3 min-[2400px]:gap-4">
            <span className="flex items-center text-foreground text-sm xl:text-base min-[2000px]:text-lg gap-1">
              <FaBed /> {property.bedCount ?? "N/A"}
            </span>
            <span className="flex items-center text-foreground text-sm xl:text-base min-[2000px]:text-lg gap-1">
              <FaBath /> {property.bathroomCount ?? "N/A"}
            </span>
            <span className="flex items-center text-foreground text-sm xl:text-base min-[2000px]:text-lg gap-1">
              <FaUsers /> {property.guestCount ?? "N/A"}
            </span>
          </div>
          <span className="text-xs sm:text-sm xl:text-base min-[2000px]:text-lg font-bold text-foreground truncate">
            {formatPrice(property.pricePerNight)}
            <span className="font-normal"> / đêm</span>
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center items-center px-2 md:px-3 lg:px-4 pb-2 md:pb-4">
        <ButtonLink
          url={`/property/${slugify(property.propertyName)}-${
            property.propertyId
          }`}
          className="w-full rounded-xl bg-hdbg text-xs sm:text-sm md:text-base min-[2000px]:text-lg hover:no-underline dark:text-black"
        >
          Xem ngay
        </ButtonLink>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
