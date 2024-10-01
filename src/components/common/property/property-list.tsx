// Import necessary modules and components
import PropertyCard from "@/components/common/property/property-card";
import { a } from "@/utils/antiSSL";
const REVALIDATE_TIME = 600 * 1000; // 600 seconds in milliseconds

// In-memory cache and timestamp
let propertyListCache: PropertyCardType[] | null = null;
let lastFetchedTime: number | null = null;

// Function to fetch property data with caching
async function getPropertyList(): Promise<PropertyCardType[]> {
  const currentTime = Date.now();

  // Return cached data if it's still valid
  if (
    propertyListCache &&
    lastFetchedTime &&
    currentTime - lastFetchedTime < REVALIDATE_TIME
  ) {
    return propertyListCache;
  }

  // Fetch new data if cache is expired or doesn't exist
  const httpsLink = "https://localhost:7209/api/Properties/featured";
  try {
    const res = await a.get(httpsLink);
    if (res.status !== 200) {
      console.warn(`Unexpected status code: ${res.status}`);
      return [];
    }

    const propertyList: PropertyCardType[] = res.data;

    // Update cache and timestamp
    propertyListCache = propertyList;
    lastFetchedTime = currentTime;

    return propertyList;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

// The PropertyList component
export default async function PropertyList() {
  const propertyList = await getPropertyList(); // Fetch data with caching

  return (
    <div className="grid gap-2 md:gap-3 lg:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-1 pb-2">
      {propertyList.length > 0 ? (
        propertyList.map((property: PropertyCardType, index: number) => (
          <PropertyCard property={property} key={index} index={index} />
        ))
      ) : (
        <div>No properties available</div>
      )}
    </div>
  );
}
