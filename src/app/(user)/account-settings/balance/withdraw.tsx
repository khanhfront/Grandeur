"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { PiHandWithdraw } from "react-icons/pi";

export const Withdraw = () => {
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [withdrawalDestination, setWithdrawalDestination] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawalAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Số tiền rút không hợp lệ");
      return;
    }

    setWithdrawalAmount("");
    setWithdrawalDestination("");
  };

  return (
    <Card aria-label="Withdrawal Feature" className="p-2 md:p-4 ">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <PiHandWithdraw className="mr-2" /> Rút tiền
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label
            htmlFor="withdrawalAmount"
            className="block text-sm font-medium"
          >
            Số tiền
          </Label>
          <Input
            type="number"
            id="withdrawalAmount"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <Label
            htmlFor="withdrawalDestination"
            className="block text-sm font-medium"
          >
            Tài khoản đích
          </Label>
          <Input
            type="text"
            id="withdrawalDestination"
            value={withdrawalDestination}
            onChange={(e) => setWithdrawalDestination(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-error text-white py-2 px-4 rounded-md"
        >
          Rút tiền
        </button>
      </form>
    </Card>
  );
};
