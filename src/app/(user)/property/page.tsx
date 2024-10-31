import { ReloadButton } from "@/components/common/button/reload-button";
import PropertyCard from "@/components/common/property/property-card";
import StructureTab from "@/components/common/tabs/home/structure-custom-tab";
import { a } from "@/utils/antiSSL";
export const revalidate = 120;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const tab = searchParams.tab || "Nổi bật";
  return {
    title: tab,
  };
}

export default async function ProprertyPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  let propertyList: PropertyCardType[];

  try {
    // Đọc giá trị của searchParams, ví dụ: ?tab=John
    let tab = searchParams.tab || "Nổi bật";
    let link: string;
    tab === "Nổi bật"
      ? (link = `https://localhost:7209/api/Properties/featured`)
      : (link = `https://localhost:7209/api/Properties/structure/${tab}`);

    const res = await a.get(link);
    propertyList = (await res.data) || []; // Chỉ định kiểu Property[]

    if (
      !propertyList ||
      propertyList.length === 0 ||
      !Array.isArray(propertyList)
    ) {
      return (
        <>
          <StructureTab />
          <h1>Kiến trúc: {tab}!</h1>
          <p>Không tìm thấy properties nào thuộc kiến trúc này</p>
        </>
      );
    }
  } catch (error) {
    propertyList = [];
  }

  return (
    <>
      <StructureTab />
      {/* Grid layout với responsive cho số card trên mỗi hàng */}

      {propertyList.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {propertyList.map((property: PropertyCardType, index: number) => (
            <PropertyCard property={property} key={index} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          Không tìm thấy property <ReloadButton />
        </div>
      )}
    </>
  );
}
