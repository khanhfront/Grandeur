// page.tsx
import { PropertyTable } from "@/components/table/property/property-table";
import { PropertyDto } from "@/components/table/property/columns";
import { a } from "@/utils/antiSSL";

export default async function Page() {
  try {
    const response = await a.get("https://localhost:7209/api/properties");
    const data: PropertyDto[] = response.data;

    return (
      <>
        <PropertyTable data={data} />
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  }
}
