import AmenityCard from "@/components/info-detail/amenity/amenity-details";
import { a } from "@/utils/antiSSL"; // Import axios instance
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    id: string;
  };
};

export default async function amenityAccountPage({ params }: Props) {
  const { id } = params;

  // Fetch dữ liệu người dùng từ API
  let amenity: Amenity | null = null;
  try {
    const response = await a.get(`http://localhost:5280/api/amenities/${id}`);
    if (response.status === 200) {
      amenity = response.data;
    }
  } catch (error) {
    console.error(`Error fetching amenity data: ${error}`);
  }

  // Nếu không tìm thấy người dùng, trả về trang 404
  if (!amenity) {
    notFound();
  }

  return <>{amenity && <AmenityCard amenity={amenity} />}</>;
}
