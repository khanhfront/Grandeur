import UpdatePropertyForm from "@/components/dashboard/info-detail/property/property-details";
import { a } from "@/utils/antiSSL"; // Import axios instance
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    id: string;
  };
};

export default async function propertyPage({ params }: Props) {
  const { id } = params;

  let property: any;
  try {
    const response = await a.get(`https://localhost:7209/api/properties/${id}`);
    if (response.status === 200) {
      property = response.data;
      return <>{property && <UpdatePropertyForm property={property} />}</>;
    }
  } catch (error) {
    console.error(`Error fetching property data - detail: ${error}`);
    return notFound();
  }

  if (!property) {
    return notFound();
  }
}
