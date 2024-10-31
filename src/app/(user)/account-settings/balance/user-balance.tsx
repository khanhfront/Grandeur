import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatDate } from "@/utils/formatText";
import { getDate } from "date-fns";
import React from "react";
import { FaWallet } from "react-icons/fa";

interface UserBalanceProps {
  balanceAmount: number;
  availableBalance?: number;
  lockedBalance?: number;
  totalDeposits?: number;
  totalWithdrawals?: number;
  lastTransaction?: {
    amount: number;
    transactionType: string;
    date: Date;
  };
  lastUpdated?: Date;
}

const UserBalance: React.FC<UserBalanceProps> = ({
  balanceAmount,
  availableBalance = 950000000, // Default value: 950 triệu VND
  lockedBalance = 50000000, // Default value: 50 triệu VND
  totalDeposits = 2000000000, // Default value: 2 tỷ VND
  totalWithdrawals = 1000000000, // Default value: 1 tỷ VND
  lastTransaction = {
    amount: 500000, // Default value: 500,000 VND
    transactionType: "Rút tiền", // Default value: 'Rút tiền'
    date: new Date(),
  },
  lastUpdated = new Date(), // Default value
}) => {
  return (
    <Card className="mb-8 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
      <CardHeader className="text-base md:text-lg font-semibold flex items-center space-x-2">
        <FaWallet className="mr-2" />
        <span>Số dư hiện tại</span>
      </CardHeader>

      <CardContent className="text-center max-[400px]:px-0">
        <div className="mb-6 text-base min-[400px]:text-lg xl:text-xl 2xl:text-3xl font-bold">
          {balanceAmount.toLocaleString("vi-VN")} VND
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-stretch md:justify-center gap-6 text-sm">
          <div className="md:w-1/2 md:pr-4">
            <h3 className="font-semibold text-muted-foreground">
              Chi tiết tài khoản:
            </h3>
            <p>
              Số dư khả dụng: {availableBalance.toLocaleString("vi-VN")} VND
            </p>
            <p>Số dư đang chờ: {lockedBalance.toLocaleString("vi-VN")} VND</p>
          </div>

          <div className="hidden md:block w-px bg-foreground"></div>

          <div className="md:w-1/2 md:pl-4">
            <h3 className="font-semibold text-muted-foreground">
              Tổng giao dịch:
            </h3>
            <p>Tổng tiền nạp: {totalDeposits.toLocaleString("vi-VN")} VND</p>
            <p>Tổng tiền rút: {totalWithdrawals.toLocaleString("vi-VN")} VND</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-md font-semibold text-muted-foreground">
            Giao dịch gần nhất:
          </h3>
          <div className="min-[400px]:flex justify-between items-center text-sm mt-2 px-1 min-[400px]:px-4 md:px-20 lg:px-40 xl:px-60">
            <span className="max-[400px]:block">
              {lastTransaction.transactionType === "Nạp tiền" ||
              lastTransaction.transactionType === "Hoàn trả" ||
              lastTransaction.transactionType === "Doanh thu"
                ? "+"
                : "-"}
              {lastTransaction.amount.toLocaleString("vi-VN")} VND
            </span>
            <span className="text-muted-foreground max-[400px]:block">
              {formatDate(new Date(lastTransaction.date))}
            </span>
          </div>
        </div>

        <div className="mt-4 px-1 min-[400px]:px-4 text-sm text-muted-foreground text-center min-[400px]:text-right">
          Cập nhật lần cuối:{" "}
          <span className="max-[400px]:block">
            {formatDate(new Date(lastUpdated))}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserBalance;
