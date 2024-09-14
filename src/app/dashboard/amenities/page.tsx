// page.tsx

import { AmenityTable } from "@/components/table/amenity/amenity-table";
import { AmenityDto } from "@/components/table/amenity/columns";
import { a } from "@/utils/antiSSL";

export default async function Page() {
  try {
    const response = await a.get("https://localhost:7209/api/amenities");
    const data: AmenityDto[] = response.data;

    return (
      <>
        <AmenityTable data={data} />
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  }
}
