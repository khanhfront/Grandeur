// page.tsx
import { CustomerTable } from "@/components/table/customer/customer-table";
import { CustomerDto } from "@/components/table/customer/columns";
import { a } from "@/utils/antiSSL";

export const dynamic = "force-dynamic";

export default async function Page() {
  try {
    const response = await a.get("http://localhost:5280/api/Customers");
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
