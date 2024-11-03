import { a } from "@/utils/antiSSL";
import { slugify } from "@/utils/slugnify";
import { ReserveForm } from "@/components/common/form/reserve-form";
import dynamic from "next/dynamic";
import ImageGallerySkeleton from "@/components/common/detail/property/image-gallery-skeleton";
import { MainFeatures } from "@/components/common/detail/property/main-features";
import { BasicHostInfo } from "@/components/common/detail/property/basic-host-info";
import PropertyDescription from "@/components/common/detail/property/property-description";
import { PropertyRating } from "@/components/common/detail/property/property-rating";
import CancellationPolicyList from "@/components/common/detail/property/cancel-policy-list";
import { BasicInfo } from "@/components/common/detail/property/basic-info";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ImageGallery = dynamic(
  () => import("@/components/common/detail/property/image-gallery"),
  {
    ssr: false,
    loading: () => <ImageGallerySkeleton />,
  }
);

export const revalidate = 180;

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const response = await a.get("http://localhost:5280/api/properties");

    if (response.status === 200) {
      const property = response.data;
      return property.map(
        (property: { propertyId: number; propertyName: string }) => ({
          slug: `${slugify(property.propertyName)}-${property.propertyId}`,
        })
      );
    } else {
      console.error(`HTTP error! Status: ${response.status}`);
      return [];
    }
  } catch (error) {
    console.error(
      `Error fetching property data for static params user property page: ${error}`
    );
    return [];
  }
}

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const { slug } = params;
  const id = slug.split("-").pop();
  try {
    const property = await a.get(`http://localhost:5280/api/Properties/${id}`);
    return {
      title: property.data.propertyName,
      description: property.data.propertyDescription.slice(0, 100),
      openGraph: {
        title: property.data.propertyName,
        images: [
          {
            url: property.data.propertyPhotoList[0].photoUrl, // Đường dẫn đến hình ảnh của property
            alt: property.data.propertyName,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "Không tìm được Property",
      metadataBase: new URL("https://grandeur.com"),
    };
  }
}

export default async function Page({ params }: Props) {
  const { slug } = params;
  const id = slug.split("-").pop();

  let property;

  try {
    const res = await fetch(`http://localhost:5280/api/Properties/${id}`, {
      next: {
        tags: [`property-${id}`],
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch property: Status ${res.status}`);
      return <div>Đã có lỗi xảy ra {`${res.status}`}</div>;
    }
    property = await res.json();
  } catch (error) {
    console.error(`Error fetching property data: ${error}`);
    return <div>Đã có lỗi xảy ra khi load data</div>;
  }
  return property ? (
    <div className="grid grid-cols-3 gap-2">
      <div className="w-full col-span-full text-center bg-background rounded-xl">
        {property.propertyPhotoList?.length > 0 && (
          <ImageGallery propertyPhotoList={property.propertyPhotoList} />
        )}
      </div>
      <div className="w-full col-span-full md:col-span-2 md:pr-6">
        <MainFeatures
          bedCount={property.bedCount}
          bedroomCount={property.bedroomCount}
          bathroomCount={property.bathroomCount}
          maxGuest={property.maxGuest}
          kitchenCount={property.kitchenCount}
          livingRoomCount={property.livingRoomCount}
          propertyName={property.propertyName}
        />
        <div className="max-md:block md:hidden sticky top-16 w-full bg-background z-[1] mb-1">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full min-w-0">Đặt phòng</Button>
            </DialogTrigger>
            <DialogContent className="rounded-md min-w-0 max-sm:p-2">
              <DialogHeader>
                <DialogTitle>Form Đặt Phòng</DialogTitle>
                <DialogDescription>
                  Vui lòng điền thông tin để đặt phòng.
                </DialogDescription>
              </DialogHeader>

              <ReserveForm
                propertyId={property.propertyId}
                maxGuest={property.maxGuest}
                pricePerNight={property.pricePerNight}
                cancellationPolicyList={property.cancelPolicyList}
                serviceFee={property.serviceFee}
              />

              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="min-[250px]:mt-4 w-full min-w-0 px-1 sm:px-4"
                >
                  Đóng
                </Button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
        <PropertyRating
          isSponsored={property.isSponsored}
          rating={property.averagePropertyRating}
          numberOfReviews={property.numberPropertyRating}
        />
        <BasicHostInfo
          hostName={property.hostName}
          hostImage={property.hostImageUrl}
          hostEXPDate={new Date(property.hostEXPDate) || new Date()}
          hostId={property.hostId}
        />
        <BasicInfo
          BasicInfoProperty={{
            propertyAddress: property.propertyAddress,
            districtName: property.districtName,
            provinceName: property.provinceName,
            structureName: property.structureName,
            typeName: property.typeName,
          }}
        />
        <PropertyDescription description={property.propertyDescription} />
        <CancellationPolicyList cancelPolicyList={property.cancelPolicyList} />
        <div>
          <h1 className="text-2xl font-bold mb-4">{property.propertyName}</h1>
          <p className="text-gray-600">Address: {property.propertyAddress}</p>
          <p className="text-gray-600">
            Price per night: {property.pricePerNight.toLocaleString()} VND
          </p>
          <p className="text-gray-600">
            Average Rating: {property.averagePropertyRating} (
            {property.numberPropertyRating} ratings)
          </p>
          <p className="text-gray-600">Bedrooms: {property.bedroomCount}</p>
          <p className="text-gray-600">Bathrooms: {property.bathroomCount}</p>
          <p className="text-gray-600">
            Living rooms: {property.livingRoomCount}
          </p>
          <p className="text-gray-600">Kitchens: {property.kitchenCount}</p>
          <p className="text-gray-600">Guest capacity: {property.maxGuest}</p>
          <p className="text-gray-600">
            Minimum stay: {property.minimumStay} night(s)
          </p>
          <p className="text-gray-600">
            Created at: {new Date(property.createdAt).toLocaleDateString()}
          </p>
          <h1 className="text-2xl font-bold mb-4">{property.propertyName}</h1>
          <p className="text-gray-600">Address: {property.propertyAddress}</p>
          <p className="text-gray-600">
            Price per night: {property.pricePerNight.toLocaleString()} VND
          </p>
          <p className="text-gray-600">
            Average Rating: {property.averagePropertyRating} (
            {property.numberPropertyRating} ratings)
          </p>
          <p className="text-gray-600">Bedrooms: {property.bedroomCount}</p>
          <p className="text-gray-600">Bathrooms: {property.bathroomCount}</p>
          <p className="text-gray-600">
            Living rooms: {property.livingRoomCount}
          </p>
          <p className="text-gray-600">Kitchens: {property.kitchenCount}</p>
          <p className="text-gray-600">Guest capacity: {property.maxGuest}</p>
          <p className="text-gray-600">
            Minimum stay: {property.minimumStay} night(s)
          </p>
          <p className="text-gray-600">
            Created at: {new Date(property.createdAt).toLocaleDateString()}
          </p>
          <h1 className="text-2xl font-bold mb-4">{property.propertyName}</h1>
          <p className="text-gray-600">Address: {property.propertyAddress}</p>
          <p className="text-gray-600">
            Price per night: {property.pricePerNight.toLocaleString()} VND
          </p>
          <p className="text-gray-600">
            Average Rating: {property.averagePropertyRating} (
            {property.numberPropertyRating} ratings)
          </p>
          <p className="text-gray-600">Bedrooms: {property.bedroomCount}</p>
          <p className="text-gray-600">Bathrooms: {property.bathroomCount}</p>
          <p className="text-gray-600">
            Living rooms: {property.livingRoomCount}
          </p>
          <p className="text-gray-600">Kitchens: {property.kitchenCount}</p>
          <p className="text-gray-600">Guest capacity: {property.maxGuest}</p>
          <p className="text-gray-600">
            Minimum stay: {property.minimumStay} night(s)
          </p>
          <p className="text-gray-600">
            Created at: {new Date(property.createdAt).toLocaleDateString()}
          </p>
          <h1 className="text-2xl font-bold mb-4">{property.propertyName}</h1>
          <p className="text-gray-600">Address: {property.propertyAddress}</p>
          <p className="text-gray-600">
            Price per night: {property.pricePerNight.toLocaleString()} VND
          </p>
          <p className="text-gray-600">
            Average Rating: {property.averagePropertyRating} (
            {property.numberPropertyRating} ratings)
          </p>
          <p className="text-gray-600">Bedrooms: {property.bedroomCount}</p>
          <p className="text-gray-600">Bathrooms: {property.bathroomCount}</p>
          <p className="text-gray-600">
            Living rooms: {property.livingRoomCount}
          </p>
          <p className="text-gray-600">Kitchens: {property.kitchenCount}</p>
          <p className="text-gray-600">Guest capacity: {property.maxGuest}</p>
          <p className="text-gray-600">
            Minimum stay: {property.minimumStay} night(s)
          </p>
          <p className="text-gray-600">
            Created at: {new Date(property.createdAt).toLocaleDateString()}
          </p>
          <h1 className="text-2xl font-bold mb-4">{property.propertyName}</h1>
          <p className="text-gray-600">Address: {property.propertyAddress}</p>
          <p className="text-gray-600">
            Price per night: {property.pricePerNight.toLocaleString()} VND
          </p>
          <p className="text-gray-600">
            Average Rating: {property.averagePropertyRating} (
            {property.numberPropertyRating} ratings)
          </p>
          <p className="text-gray-600">Bedrooms: {property.bedroomCount}</p>
          <p className="text-gray-600">Bathrooms: {property.bathroomCount}</p>
          <p className="text-gray-600">
            Living rooms: {property.livingRoomCount}
          </p>
          <p className="text-gray-600">Kitchens: {property.kitchenCount}</p>
          <p className="text-gray-600">Guest capacity: {property.maxGuest}</p>
          <p className="text-gray-600">
            Minimum stay: {property.minimumStay} night(s)
          </p>
          <p className="text-gray-600">
            Created at: {new Date(property.createdAt).toLocaleDateString()}
          </p>
          <h1 className="text-2xl font-bold mb-4">{property.propertyName}</h1>
          <p className="text-gray-600">Address: {property.propertyAddress}</p>
          <p className="text-gray-600">
            Price per night: {property.pricePerNight.toLocaleString()} VND
          </p>
          <p className="text-gray-600">
            Average Rating: {property.averagePropertyRating} (
            {property.numberPropertyRating} ratings)
          </p>
          <p className="text-gray-600">Bedrooms: {property.bedroomCount}</p>
          <p className="text-gray-600">Bathrooms: {property.bathroomCount}</p>
          <p className="text-gray-600">
            Living rooms: {property.livingRoomCount}
          </p>
          <p className="text-gray-600">Kitchens: {property.kitchenCount}</p>
          <p className="text-gray-600">Guest capacity: {property.maxGuest}</p>
          <p className="text-gray-600">
            Minimum stay: {property.minimumStay} night(s)
          </p>
          <p className="text-gray-600">
            Created at: {new Date(property.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="col-span-full md:col-span-1 max-md:hidden">
        <ReserveForm
          propertyId={property.propertyId}
          maxGuest={property.maxGuest}
          pricePerNight={property.pricePerNight}
          serviceFee={property.serviceFee}
          cancellationPolicyList={property.cancelPolicyList}
        />
      </div>
    </div>
  ) : (
    <div>Đã có lỗi xảy ra</div>
  );
}
