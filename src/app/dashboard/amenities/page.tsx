// page.tsx
import { AmenityTable } from "@/components/table/amenity/amenity-table";
import { AmenityDto } from "@/components/table/amenity/columns";
import { a } from "@/utils/antiSSL";

export const dynamic = "force-dynamic";

export default async function Page() {
  try {
    const response = await a.get("http://localhost:5280/api/amenities");
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
