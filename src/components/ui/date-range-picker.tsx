"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerWithRangeProps {
  onDateSelect: (dateRange: DateRange | undefined) => void;
  className?: string;
}

export function DatePickerWithRange({
  onDateSelect, //ham lay data tu range
  className,
}: DatePickerWithRangeProps) {
  const [selectedDate, setSelectedDate] = React.useState<DateRange | undefined>(
    {
      from: new Date(),
      to: addDays(new Date(), 1),
    }
  );

  React.useEffect(() => {
    onDateSelect(selectedDate);
  }, [selectedDate, onDateSelect]);

  const handleSelect = (range: DateRange | undefined) => {
    setSelectedDate(range);
    onDateSelect(range);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "flex flex-1 items-center p-2 sm:p-3 md:p-4 justify-start text-left",
              !selectedDate && "text-muted-foreground",
              "sm:min-h-12 lg:min-h-0"
            )}
          >
            <CalendarIcon className="mr-2 w-5 h-5 hidden min-[300px]:flex" />
            {selectedDate?.from ? (
              selectedDate.to ? (
                <div className="flex flex-col min-[230px]:flex-row md:flex-col lg:flex-row lg:items-center gap-2 flex-1">
                  <div className="text-xs flex flex-1 gap-1 justify-center text-xs xl:text-sm 2xl:text-base">
                    <strong>Từ:</strong>{" "}
                    {format(selectedDate.from, "dd/MM/yyyy")}
                  </div>
                  <div className="text-xs flex flex-1 gap-1 lg:border-l justify-center text-xs xl:text-sm 2xl:text-base">
                    <strong>Đến:</strong>{" "}
                    {format(selectedDate.to, "dd/MM/yyyy")}
                  </div>
                </div>
              ) : (
                <div className="text-xs ">
                  {format(selectedDate.from, "dd/MM/yyyy")}
                </div>
              )
            ) : (
              <span className="text-xs ">Chọn ngày</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            selected={selectedDate}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
