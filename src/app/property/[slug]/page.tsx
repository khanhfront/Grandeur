import { a } from "@/utils/antiSSL";
import { ReserveButton } from "./reserve-btn";
import { slugify } from "@/utils/slugnify";

// export async function generateStaticParams() {
//   try {
//     const res = await a.get("https://localhost:7209/api/Properties");
//     const propertys = res.data;
//     return propertys.map(
//       (property: { propertyId: number; propertyName: string }) => ({
//         params: {
//           slug: `${slugify(property.propertyName)}-${property.propertyId}`,
//         },
//       })
//     );
//   } catch (error) {
//     return [];
//   }
// }

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
    const property = await a.get(`https://localhost:7209/api/Properties/${id}`);
    return {
      title: property.data.propertyName,
    };
  } catch (error) {
    return {
      title: "Không tìm được Property",
    };
  }
}

export default async function Test({ params }: Props) {
  const { slug } = params;
  const id = slug.split("-").pop();
  const res = await a.get(`https://localhost:7209/api/Properties/${id}`);
  const property = res.data;

  return (
    <div className="max-w-3xl mx-auto p-4">
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
      <p className="text-gray-600">Living rooms: {property.livingRoomCount}</p>
      <p className="text-gray-600">Kitchens: {property.kitchenCount}</p>
      <p className="text-gray-600">Guest capacity: {property.guestCount}</p>
      <p className="text-gray-600">
        Minimum stay: {property.minimumStay} night(s)
      </p>
      <p className="text-gray-600">
        Created at: {new Date(property.createdAt).toLocaleDateString()}
      </p>
      <ReserveButton />
    </div>
  );
}
