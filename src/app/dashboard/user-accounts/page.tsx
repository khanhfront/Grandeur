// page.tsx
import { UserTable } from "@/components/table/user-account/user-table";
import { UserDto } from "@/components/table/user-account/columns";
import { a } from "@/utils/antiSSL";

export default async function Page() {
  try {
    const response = await a.get("https://localhost:7209/api/UserAccounts");
    const data: UserDto[] = response.data;

    return (
      <>
        <UserTable data={data} />
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  }
}
