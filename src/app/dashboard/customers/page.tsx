// page.tsx
import { CustomerTable } from "@/components/table/customer/customer-table";
import { CustomerDto } from "@/components/table/customer/columns";
import { a } from "@/utils/antiSSL";

export default async function Page() {
  try {
    const response = await a.get("https://localhost:7209/api/Customers");
    const data: CustomerDto[] = response.data;

    return (
      <>
        <CustomerTable data={data} />
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  }
}
