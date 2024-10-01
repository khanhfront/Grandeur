// page.tsx
import { PropertyTable } from "@/components/table/property/property-table";
import { PropertyDto } from "@/components/table/property/columns";
import { a } from "@/utils/antiSSL";
import { Suspense } from "react";
import Loader from "@/components/common/loader";
export const dynamic = "force-dynamic";

export default async function Page() {
  const response = await a.get("https://localhost:7209/api/properties");
  if (response.status !== 200) {
    return <div>Lỗi lấy dữ liệu</div>;
  }
  const data: PropertyDto[] = response.data;

  return (
    <Suspense fallback={<Loader />}>
      <PropertyTable data={data} />
    </Suspense>
  );
}
