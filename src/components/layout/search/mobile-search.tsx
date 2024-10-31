"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AccordionContentNoIcon,
  AccordionItemNoIcon,
  AccordionNoIcon,
  AccordionTriggerNoIcon,
} from "@/components/ui/accordion-noicon";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { MdPlace } from "react-icons/md";
import { GiSettingsKnobs } from "react-icons/gi";

interface AccordionOptionProps {
  label: string;
  onClick: () => void;
}

const AccordionOption: React.FC<AccordionOptionProps> = ({
  label,
  onClick,
}) => (
  <div
    onClick={onClick}
    className="flex gap-1 items-center cursor-pointer hover:outline hover:outline-[1px] m-1 rounded"
  >
    <MdPlace />
    {label}
  </div>
);

const MobileSearchComponent: React.FC = () => {
  const [destination, setDestination] = useState<string>("");
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  // Ref để lưu thời điểm Accordion được mở lần cuối
  const lastOpenedRef = useRef<number>(0);
  // Ref để theo dõi việc tương tác với nested Accordion
  const isInteractingRef = useRef(false);

  // Debounce function
  const debounce = (func: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Handler cho sự kiện cuộn
  const handleScroll = useCallback(() => {
    const now = Date.now();

    // Kiểm tra xem người dùng có đang tương tác với nested Accordion không
    if (isInteractingRef.current) {
      return;
    }

    // Nếu sự kiện cuộn xảy ra trong vòng 400ms sau khi mở Accordion, bỏ qua
    if (now - lastOpenedRef.current < 400) {
      return;
    }
    setOpenItem("undefined"); // Đặt thành một chuỗi không tồn tại để đóng Accordion
  }, []);

  // Thêm listener cho sự kiện cuộn với debounce
  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 100);
    window.addEventListener("scroll", debouncedHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [handleScroll]);

  // Khi openItem thay đổi, nếu mở Accordion, cập nhật thời điểm mở
  useEffect(() => {
    if (openItem && openItem !== "undefined") {
      lastOpenedRef.current = Date.now();
    } else {
      console.log("Accordion closed.");
    }
  }, [openItem]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
  };

  const nestedInteractTimeOut = 10000; //time out cho nested accordion

  return (
    <AccordionNoIcon
      type="single"
      collapsible
      className="w-full bg-transparent md:hidden accordion-container"
      value={openItem}
      onValueChange={(value) => {
        setOpenItem(value);
        if (value) {
          lastOpenedRef.current = Date.now();
        } else {
        }
      }}
    >
      <AccordionItemNoIcon
        value="item-1"
        className="bg-transparent border-none"
      >
        <AccordionTriggerNoIcon className="bg-transparent flex items-center gap-1">
          <Input
            type="text"
            name="search destination"
            className="rounded-full w-1/4 flex-1 bg-background text-foreground"
            placeholder="Destination"
            value={destination}
            onChange={handleInputChange}
          />
          <GiSettingsKnobs className="text-foreground" />
        </AccordionTriggerNoIcon>
        <AccordionContentNoIcon>
          <AccordionOption
            label="Hà Nội"
            onClick={() => {
              setDestination("Hà Nội");
            }}
          />
          <AccordionOption
            label="Hồ Chí Minh"
            onClick={() => {
              setDestination("Hồ Chí Minh");
            }}
          />
          <AccordionOption
            label="Đà Nẵng"
            onClick={() => {
              setDestination("Đà Nẵng");
            }}
          />
          <AccordionOption
            label="Huế"
            onClick={() => {
              setDestination("Huế");
            }}
          />
          <AccordionOption
            label="Hải Phòng"
            onClick={() => {
              setDestination("Hải Phòng");
            }}
          />

          <Accordion type="single" collapsible className="w-full md:hidden">
            <AccordionItem value="item-2" className="border-foreground">
              <AccordionTrigger
                className="hover:bg-transparent"
                onMouseDown={() => {
                  isInteractingRef.current = true;

                  setTimeout(() => {
                    isInteractingRef.current = false;
                  }, nestedInteractTimeOut);
                }}
              >
                <div className="flex items-center rounded-full bg-transparent border-0">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>
                    {checkInDate
                      ? "From: " + checkInDate.toLocaleDateString()
                      : "Check in"}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Calendar
                  mode="single"
                  selected={checkInDate}
                  onSelect={(date) => {
                    setCheckInDate(date);
                  }}
                  initialFocus
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-none">
              <AccordionTrigger
                className="hover:bg-transparent"
                onMouseDown={() => {
                  isInteractingRef.current = true;

                  setTimeout(() => {
                    isInteractingRef.current = false;
                  }, nestedInteractTimeOut);
                }}
              >
                <div className="flex items-center rounded-full bg-transparent border-0">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>
                    {checkOutDate
                      ? "To: " + checkOutDate.toLocaleDateString()
                      : "Check out"}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Calendar
                  mode="single"
                  selected={checkOutDate}
                  onSelect={(date) => {
                    setCheckOutDate(date);
                  }}
                  initialFocus
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button
            className="w-full mt-4"
            onClick={() => console.log("Search button clicked")}
          >
            Tìm kiếm
          </Button>
        </AccordionContentNoIcon>
      </AccordionItemNoIcon>
    </AccordionNoIcon>
  );
};

export default MobileSearchComponent;
