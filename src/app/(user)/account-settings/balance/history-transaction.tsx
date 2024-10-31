"use client";
import React, { useState } from "react";
import { MdHistory } from "react-icons/md";
import { FaFilter } from "react-icons/fa";

interface Transaction {
  transactionId: number;
  transactionType: string;
  amount: number;
  transactionDate: string;
  transactionStatus: string;
}

interface HistoryTransactionProps {
  transactions: Transaction[];
}

export const HistoryTransaction: React.FC<HistoryTransactionProps> = ({
  transactions,
}) => {
  const [filter, setFilter] = useState("Tất cả");
  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === "Tất cả") return true;
    return transaction.transactionType === filter;
  });

  return (
    <section
      aria-label="Transaction History"
      className=" bg-secondary p-2 sm:p-6 rounded-lg shadow-md flex-1"
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <MdHistory className="mr-1 sm:mr-2" /> Lịch sử giao dịch
      </h2>
      <div className="mb-4 min-[400px]:flex items-center">
        <label htmlFor="transactionFilter" className="mr-1 sm:mr-2">
          <FaFilter className="inline mr-1" /> Lọc:
        </label>
        <select
          id="transactionFilter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-md border shadow-sm focus:border-hdbg focus:ring focus:ring-hdbg focus:ring-opacity-50"
        >
          <option value="Tất cả">Tất cả</option>
          <option value="Thanh toán">Thanh toán</option>
          <option value="Doanh thu">Doanh thu</option>
          <option value="Hoàn trả">Hoàn trả</option>
          <option value="Nạp tiền">Nạp tiền</option>
          <option value="Rút tiền">Rút tiền</option>
        </select>
      </div>
      <ul className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <li
            key={transaction.transactionId}
            className="bg-background text-foreground p-2 sm:p-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="min-[400px]:flex justify-between items-center">
              <span
                className={`font-semibold max-[400px]:block ${
                  transaction.transactionType === "Nạp tiền" ||
                  transaction.transactionType === "Hoàn trả" ||
                  transaction.transactionType === "Doanh thu"
                    ? "text-success"
                    : "text-error"
                }`}
              >
                {transaction.transactionType === "Nạp tiền" ||
                transaction.transactionType === "Hoàn trả" ||
                transaction.transactionType === "Doanh thu"
                  ? "+"
                  : "-"}
                {transaction.amount.toFixed(2)}đ
              </span>
              <span className="text-sm text-muted-foreground max-[400px]:block">
                {transaction.transactionDate}
              </span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Trạng thái:{" "}
              <span
                className={`font-medium ${
                  transaction.transactionStatus === "Hoàn thành"
                    ? "text-success"
                    : "text-warning"
                }`}
              >
                {transaction.transactionStatus}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
