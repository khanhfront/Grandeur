"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../common/button/custom-header-button";
import { CalendarIcon, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function SearchComponent() {
  const [checkInDate, setCheckInDate] = React.useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = React.useState<Date | undefined>();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const formatDate = (date: Date | undefined): string => {
    if (!date) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    return `${day}/${month}`;
  };

  return (
    <div className="flex w-full md:w-1/2 justify-between items-center rounded-full bg-secondary p-1 px-2 gap-2">
      <div className="flex w-3/4 justify-between items-center gap-2">
        {/* Search Input */}
        <Input
          type="text"
          name="search destination"
          className="rounded-full w-1/4 flex-1 bg-background placeholder:text-[#000000] placeholder:opacity-100 dark:placeholder:text-muted-foreground"
          placeholder="Destination"
          onClick={() => {
            setIsOpen(true);
          }}
          onBlur={() => setIsOpen(false)}
        />

        {/* Date Picker - Check-in */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-1/4 md:w-auto rounded-full bg-transparent border-0"
            >
              <CalendarIcon className="mr-2 h-4 w-4 hidden xl:block" />
              <span className="hidden lg:inline">
                {checkInDate ? checkInDate.toLocaleDateString() : "Check in"}
              </span>
              <span className="inline lg:hidden">
                {formatDate(checkInDate) || "In"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={checkInDate}
              onSelect={setCheckInDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Date Picker - Check-out */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-1/4 md:w-auto rounded-full bg-transparent border-0"
            >
              <CalendarIcon className="mr-2 h-4 w-4 hidden xl:block" />
              <span className="hidden lg:inline">
                {checkOutDate ? checkOutDate.toLocaleDateString() : "Check out"}
              </span>
              <span className="inline lg:hidden">
                {formatDate(checkOutDate) || "Out"}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={checkOutDate}
              onSelect={setCheckOutDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Search Button */}
      <Button
        aria-label="search"
        className="rounded-full md:w-auto md:mt-0 flex items-center"
      >
        <span className=" hidden sm:block">{isOpen && "Tìm kiếm"}</span>
        <Search />
      </Button>
    </div>
  );
}
