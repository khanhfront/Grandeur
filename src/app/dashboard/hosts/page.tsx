import { HostDto } from "@/components/table/host/columns";
import { HostTable } from "@/components/table/host/host-table";
import { a } from "@/utils/antiSSL";

export const dynamic = "force-dynamic";

export default async function host() {
  try {
    const response = await a.get("http://localhost:5280/api/hostps/table");
    const data: HostDto[] = response.data;

    return (
      <>
        <HostTable data={data} />
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  }
}
