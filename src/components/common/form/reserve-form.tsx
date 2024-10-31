"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { addDays, format, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker"; // Điều chỉnh đường dẫn import nếu cần
import { cn } from "@/lib/utils";
import { ChangeEvent, Suspense, useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { ProtectedButton } from "../button/protected-btn";
import { checkUserLogin } from "@/serverActions/authActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

async function checkValidPromoCode(promoCode: string): Promise<number> {
  // Fake API call
  if (promoCode === "DISCOUNT50") {
    return 50; // 50% discount
  }
  return 0;
}

const calculateNights = (checkIn: string, checkOut: string): number => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  return Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)
  ); // Tính số ngày
};

export function ReserveForm({
  propertyId,
  pricePerNight,
  maxGuest,
  cancellationPolicyList,
}: {
  propertyId: number;
  pricePerNight: number;
  maxGuest: number;
  cancellationPolicyList: CancellationPolicy[];
}) {
  const router = useRouter();
  const formSchema = z
    .object({
      checkInDate: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), "Ngày không hợp lệ"),
      checkOutDate: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), "Ngày không hợp lệ"),
      childCount: z.coerce
        .number()
        .min(0, "Số khách không hợp lệ")
        .max(
          maxGuest,
          `Đã vượt quá giới hạn tối đa với chỗ lưu trú này! Max: ${maxGuest}`
        ),
      adultCount: z.coerce
        .number()
        .min(1, "Số khách không hợp lệ, phải có ít nhất 1 người lớn")
        .max(
          maxGuest,
          `Đã vượt quá giới hạn tối đa với chỗ lưu trú này! Max: ${maxGuest}`
        ),
      seniorCount: z.coerce
        .number()
        .min(0, "Số khách không hợp lệ")
        .max(
          maxGuest,
          `Đã vượt quá giới hạn tối đa với chỗ lưu trú này! Max: ${maxGuest}`
        ),
      promoCode: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      const totalGuests = data.childCount + data.adultCount + data.seniorCount;

      if (totalGuests > maxGuest) {
        const errorMessage = `Tổng số khách không được vượt quá ${maxGuest}, do giới hạn của chủ nhà`;

        // Thêm lỗi vào từng trường
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: errorMessage,
          path: ["childCount"],
        });

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: errorMessage,
          path: ["adultCount"],
        });

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: errorMessage,
          path: ["seniorCount"],
        });
      }
    });
  type FormValues = z.infer<typeof formSchema>;
  const [promoCode, setPromoCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [nightCount, setNightCount] = useState<number>(1);
  const [totalGuests, setTotalGuests] = useState<number>(1);
  const [checkIn, setCheckIn] = useState<string>(
    format(addDays(new Date(), 1), "yyyy-MM-dd")
  );
  const [checkOut, setCheckOut] = useState<string>(
    format(addDays(new Date(), 2), "yyyy-MM-dd")
  );
  const [totalPrice, setTotalPrice] = useState<number>(
    calculateNights(checkIn, checkOut) * pricePerNight
  );
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      checkInDate: checkIn,
      checkOutDate: checkOut,
      adultCount: 1,
      childCount: 0,
      seniorCount: 0,
      promoCode: "",
    },
  });

  const { setValue, handleSubmit, getValues } = form;

  const handleDateRangeChange = (selectedRange: DateRange | undefined) => {
    if (selectedRange?.from) {
      const formattedFrom = format(selectedRange.from, "yyyy-MM-dd");
      setCheckIn(formattedFrom);
      setValue("checkInDate", formattedFrom);
    }
    if (selectedRange?.to) {
      const formattedTo = format(selectedRange.to, "yyyy-MM-dd");
      setCheckOut(formattedTo);
      setValue("checkOutDate", formattedTo);
    }
  };

  const handlePromoCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPromoCode(event.target.value);
    setValue("promoCode", event.target.value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      const discountValue = await checkValidPromoCode(event.target.value);
      setDiscount(discountValue);
    }, 1000);
  };

  useEffect(() => {
    const nights = calculateNights(checkIn, checkOut);
    setNightCount(nights);
    const newTotalPrice = nights * pricePerNight * (1 - discount / 100);
    setTotalPrice(newTotalPrice);
  }, [checkIn, checkOut, discount, pricePerNight]);

  const { errors } = useFormState({ control: form.control }); // Lấy thông tin lỗi từ formState

  // Kiểm tra lỗi ở các trường count
  const isGuestCountError =
    errors.adultCount || errors.childCount || errors.seniorCount;

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    if (propertyId) {
      const { userId } = await checkUserLogin();
      if (userId) {
        const apiData = {
          ...data,
          customerId: userId,
          propertyId,
        };
        console.log(apiData);

        try {
          const res = await fetch("http://localhost:5280/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(apiData),
          });

          if (!res.ok) {
            const errorData = await res.json();
            console.error("Lỗi khi đặt phòng:", errorData);
            return;
          }

          const responseData = await res.json();
          const locationHeader = res.headers.get("Location");
          console.log("Location Header:", locationHeader);
          console.log("Đặt phòng thành công:", responseData.bookingId);
          toast.success("Thông tin hợp lệ, tiến hành thanh toán để đặt phòng");

          const milestoneDateFreeDays = cancellationPolicyList.find(
            (policy) => policy.refundPercentage === 100
          )?.milestoneDate;

          const milestoneDatePartialDays = cancellationPolicyList.find(
            (policy) => policy.refundPercentage === 100
          )?.milestoneDate;

          const milestoneDateFree = milestoneDateFreeDays
            ? subDays(responseData.checkInDate, milestoneDateFreeDays)
            : undefined;

          const milestoneDatePartial = milestoneDatePartialDays
            ? subDays(responseData.checkInDate, milestoneDatePartialDays)
            : undefined;

          // Tạo URLSearchParams với tất cả các trường cần thiết
          const params = new URLSearchParams();
          params.set("bookingId", responseData.bookingId);
          params.set("propertyId", responseData.propertyId);
          params.set("customerId", responseData.customerId);
          params.set("checkInDate", responseData.checkInDate);
          params.set("checkOutDate", responseData.checkOutDate);
          params.set("hostApproval", responseData.hostApproval);
          params.set("guestNumber", responseData.guestNumber);
          params.set("pricePerNight", responseData.pricePerNight);
          params.set("totalNights", responseData.totalNights);
          params.set("totalPrice", responseData.totalPrice);
          params.set("originalPrice", responseData.originalPrice);
          params.set("discountAmount", responseData.discountAmount);
          params.set("propertyName", responseData.propertyName);
          params.set("typeName", responseData.typeName);
          params.set(
            "averagePropertyRating",
            responseData.averagePropertyRating
          );
          params.set("numberPropertyRating", responseData.numberPropertyRating);
          params.set("cancelFree", milestoneDateFree);
          params.set("cancelPartial", milestoneDatePartial);

          // Điều hướng tới trang thanh toán với search params
          router.push(`/payment?${params.toString()}`);
        } catch (error) {
          console.log("Lỗi đặt phòng: " + error);
        }
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-1 md:gap-2 sticky top-20 mt-3 rounded-md shadow-md border-[0.5px] dark:border-t dark:md:shadow-gray-700 p-1 sm:p-2 md:p-3 m-1"
      >
        <div className="text-base md:text-xl">
          <span className="underline text-xs md:text-base font-bold">đ</span>

          {totalPrice > 0 ? (
            <>
              <strong>{totalPrice.toLocaleString()} VND</strong>
              {nightCount > 0 && (
                <span className="text-base"> / {nightCount} đêm</span>
              )}
            </>
          ) : (
            <strong>{pricePerNight} / đêm</strong>
          )}

          {totalPrice > 0 && (
            <div className="text-xs max-md:ml-1">
              Đã giảm {discount}%
              {discount > 0 && (
                <>
                  <span className="text-secondary-foreground">{" đ"}</span>
                  <span className="line-through decoration-secondary-foreground text-secondary-foreground">
                    {pricePerNight}
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Date Range Picker */}
        <div>
          <Label>Chọn ngày</Label>
          <DatePickerWithRange
            onDateSelect={handleDateRangeChange}
            className="md:mb-4"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`flex justify-start ${
                isGuestCountError ? "border-red-500" : ""
              }`}
            >
              {totalGuests} khách
            </Button>
          </PopoverTrigger>
          <PopoverContent className={`w-full`}>
            {/* Guest Count Input */}
            <FormField
              control={form.control}
              name="adultCount"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Người lớn</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setTotalGuests(
                          Number(getValues("adultCount")) +
                            Number(getValues("childCount")) +
                            Number(getValues("seniorCount"))
                        );
                      }}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seniorCount"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Người già</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setTotalGuests(
                          Number(getValues("adultCount")) +
                            Number(getValues("childCount")) +
                            Number(getValues("seniorCount"))
                        );
                      }}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="childCount"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Trẻ em</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setTotalGuests(
                          Number(getValues("adultCount")) +
                            Number(getValues("childCount")) +
                            Number(getValues("seniorCount"))
                        );
                      }}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </PopoverContent>
        </Popover>

        <div className="w-full">
          <Label>Mã giảm giá</Label>
          <Input
            value={promoCode}
            onChange={handlePromoCodeChange}
            placeholder="Nhập mã giảm giá"
            className="w-full"
          />
        </div>

        <Suspense>
          <ProtectedButton
            type="submit"
            isAbleDisable={false}
            className={cn(
              "mt-0 md:mt-4",
              "px-4 py-0 md:py-2 bg-hdbg rounded hover:bg-primary "
            )}
          >
            Đặt phòng
          </ProtectedButton>
        </Suspense>
      </form>
    </Form>
  );
}
