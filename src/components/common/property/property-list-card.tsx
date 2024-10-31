import dynamic from "next/dynamic";
import { Suspense } from "react";
import { PropertyListSkeleton } from "./property-list-skeleton";

const PropertyCard = dynamic(() => import("./property-card"));

export const revalidate = 1000;
const REVALIDATE_TIME = 1000;

async function getPropertyList() {
  const httpsLink = "http://localhost:5280/api/Properties/featured";
  try {
    const res = await fetch(httpsLink, {
      next: { revalidate: REVALIDATE_TIME, tags: ["featured"] },
    });
    if (!res.ok) {
      console.error(`Error fetching properties: ${res.statusText}`);
      return [];
    }
    const propertyList: PropertyCardType[] = await res.json();
    return propertyList;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export default async function PropertyListCard() {
  const propertyList = await getPropertyList();

  return (
    <Suspense fallback={<PropertyListSkeleton />}>
      <div className="grid gap-2 md:gap-3 lg:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-1 pb-2">
        {propertyList.length > 0 ? (
          propertyList.map((property: PropertyCardType, index: number) => (
            <PropertyCard property={property} key={index} index={index} />
          ))
        ) : (
          <div>No properties available</div>
        )}
      </div>
    </Suspense>
  );
}
