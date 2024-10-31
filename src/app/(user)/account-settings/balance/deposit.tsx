"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { PiHandDeposit } from "react-icons/pi";

export const Deposit = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [depositSource, setDepositSource] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) return;
    setDepositAmount("");
    setDepositSource("");
  };

  return (
    <Card aria-label="Deposit Feature" className="p-2 md:p-4 ">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <PiHandDeposit className="mr-2" /> Nạp tiền
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="depositAmount" className="block text-sm font-medium">
            Số tiền
          </Label>
          <Input
            type="number"
            id="depositAmount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <Label htmlFor="depositSource" className="block text-sm font-medium">
            Nguồn
          </Label>
          <Input
            type="text"
            id="depositSource"
            value={depositSource}
            onChange={(e) => setDepositSource(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-success text-white py-2 px-4 rounded-md"
        >
          Nạp ngay
        </button>
      </form>
    </Card>
  );
};
