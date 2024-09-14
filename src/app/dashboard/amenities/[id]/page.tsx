import AmenityCard from "@/components/info-detail/amenity/amenity-details";
import { a } from "@/utils/antiSSL"; // Import axios instance
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const response = await fetch("https://localhost:7209/api/amenities", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const amenity = await response.json();

    return amenity.map((amenity: { amenityId: number }) => ({
      id: amenity.amenityId.toString(),
    }));
  } catch (error) {
    console.error(`Error fetching amenity data for static params: ${error}`);
    return [];
  }
}

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
    const response = await a.get(`https://localhost:7209/api/amenities/${id}`);
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
