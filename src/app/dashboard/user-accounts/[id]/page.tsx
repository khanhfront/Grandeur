import UserCard from "@/components/dashboard/info-detail/user/user-details"; // Import UserCard
import { a } from "@/utils/antiSSL"; // Import axios instance
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    id: string;
  };
};

export default async function UserAccountPage({ params }: Props) {
  const { id } = params;

  // Fetch dữ liệu người dùng từ API
  let user: UserAccount | null = null;
  try {
    const response = await a.get(
      `http://localhost:5280/api/UserAccounts/${id}`
    );
    if (response.status === 200) {
      user = response.data;
    }
  } catch (error) {
    console.error(`Error fetching user data: ${error}`);
  }

  // Nếu không tìm thấy người dùng, trả về trang 404
  if (!user) {
    notFound();
  }

  return (
    <>
      {user && <UserCard user={user} />} {/* Sử dụng UserCard */}
    </>
  );
}
