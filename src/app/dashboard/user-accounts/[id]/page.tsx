import UserCard from "@/components/info-detail/user/user-details"; // Import UserCard
import { a } from "@/utils/antiSSL"; // Import axios instance
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  try {
    const response = await fetch("https://localhost:7209/api/UserAccounts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const users = await response.json();

    return users.map((user: { userId: number }) => ({
      id: user.userId.toString(),
    }));
  } catch (error) {
    console.error(`Error fetching user data for static params: ${error}`);
    return [];
  }
}

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
      `https://localhost:7209/api/UserAccounts/${id}`
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
