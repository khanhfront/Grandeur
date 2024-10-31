import { checkUserLogin } from "@/serverActions/authActions";
import { Deposit } from "./deposit";
import { HistoryTransaction } from "./history-transaction";
import { Withdraw } from "./withdraw";
import { UnauthorizedPage } from "@/components/common/auth/unauthorized";
import { UserRequiredPage } from "@/components/common/auth/user-required";
import { ReloadButton } from "@/components/common/button/reload-button";
import UserBalance from "./user-balance";
import { formatDate } from "@/utils/formatText";
import { TabHistoryPayment } from "./tab-history-payment";
import { PaymentMethod } from "./payment-method";
import { Label } from "@/components/ui/label";

interface Transaction {
  transactionId: number;
  transactionType: string;
  amount: number;
  transactionDate: string;
  transactionStatus: string;
}

// Các giá trị hợp lệ cho transactionType và transactionStatus
const transactionTypes = [
  "Thanh toán",
  "Doanh thu",
  "Hoàn trả",
  "Rút tiền",
  "Nạp tiền",
];
const transactionStatuses = ["Đang chờ", "Hoàn thành", "Thất bại"];

// Hàm tạo một đối tượng giao dịch fake
function createFakeTransaction(id: number): Transaction {
  const randomType =
    transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
  const randomStatus =
    transactionStatuses[Math.floor(Math.random() * transactionStatuses.length)];
  const randomAmount = (Math.random() * 100000).toFixed(2); // Random số tiền từ 0 đến 1000
  const transactionDate = new Date();
  return {
    transactionId: id,
    transactionType: randomType,
    amount: parseFloat(randomAmount),
    transactionDate: formatDate(transactionDate),
    transactionStatus: randomStatus,
  };
}

const transactions: Transaction[] = Array.from({ length: 30 }, (_, index) =>
  createFakeTransaction(index + 1)
);

const Page = async () => {
  const { isLoggedIn, role, userId } = await checkUserLogin();
  if (!isLoggedIn) {
    return <UnauthorizedPage />;
  }
  if (role !== "user") {
    return <UserRequiredPage />;
  }

  // Initialize with a default value
  let userBalance;
  let userTransaction;

  if (userId) {
    const res = await fetch(`http://localhost:5280/api/userbalances/${userId}`);
    if (!res.ok) {
      return (
        <div>
          <div>Lỗi khi lấy dữ liệu người dùng</div>
          <ReloadButton />
        </div>
      );
    }
    userBalance = await res.json();
    try {
      const res2 = await fetch(
        `http://localhost:5280/api/usertransactions/${userId}`
      );
      if (res2.ok) {
        userTransaction = await res2.json();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="">
      <div className="text-xl font-bold">
        Trang kiểm soát số dư, nạp rút của người dùng
      </div>
      {userBalance.userId === 0 ? (
        <div>Lỗi khi lấy dữ liệu người dùng</div>
      ) : (
        <UserBalance
          balanceAmount={userBalance.balanceAmount}
          availableBalance={userBalance.availableBalance}
          lockedBalance={userBalance.lockedBalance}
          totalDeposits={userBalance.totalDeposits}
          totalWithdrawals={userBalance.totalWithdrawals}
          lastTransaction={userBalance.lastTransaction}
          lastUpdated={userBalance.lastUpdated}
        />
      )}
      <div className="grid grid-cols-3 mt-2 gap-4">
        <TabHistoryPayment
          transactions={transactions}
          userTransaction={userTransaction}
        />
        <div className="block min-[400px]:hidden space-y-2 col-span-full">
          <Label>Lịch sử giao dịch</Label>
          {userTransaction || transactions ? (
            <HistoryTransaction
              transactions={userTransaction || transactions}
            />
          ) : (
            <div className="flex-1">Lỗi khi load biến động số dư</div>
          )}
          <Label>Phương thức thanh toán</Label>
          <PaymentMethod />
        </div>

        <div className="col-span-full max-md:row-start-1 md:col-span-1 md:ml-2 max-md:mb-4">
          <div className="md:sticky top-20 grid gap-2">
            <Deposit />
            <Withdraw />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
