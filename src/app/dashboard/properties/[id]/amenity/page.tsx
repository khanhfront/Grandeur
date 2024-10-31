import AmenityAddTabs from "@/components/common/tabs/amenity/amenity_add_tabs";
import { a } from "@/utils/antiSSL";
import AmenitySelectedList from "./list-selected-amenities";

type Props = {
  params: {
    id: string;
  };
};
export default async function page({ params }: Props) {
  const { id } = params;
  const dAS = await a.get(`http://localhost:5280/api/propertyamenities/${id}`);
  const aT = await a.get("http://localhost:5280/api/amenitytypes");
  if (aT.status !== 200 && dAS.status !== 200) {
    console.log(aT.status + " " + dAS.status);
    return <div>Fail to load amenity</div>;
  }

  const dataAmenity = aT.data;
  const dataAmenityState = dAS.data;
  if (dataAmenity && dataAmenityState) {
    return (
      <div className="flex flex-grow w-full md:gap-2">
        <AmenitySelectedList dataAmenityState={dataAmenityState} />
        <AmenityAddTabs
          dataAmenity={dataAmenity}
          dataAmenityState={dataAmenityState}
        />
      </div>
    );
  }
  return <div>Fail to load amenity</div>;
}
