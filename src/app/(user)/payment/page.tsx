"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { checkUserLogin } from "@/serverActions/authActions";
import Loader from "@/components/common/loader";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { formatCurrencyVND } from "@/utils/formatText";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { FaCreditCard, FaWallet, FaMoneyBillWave } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userIdChecked, setUserIdChecked] = useState<number | null>(null);
  type PaymentMethod = "credit_card" | "e_wallet" | "balance";
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>("balance");

  const [mainPhotoUrl, setMainPhotoUrl] = useState("");
  const bookingId = searchParams.get("bookingId");
  const propertyId = searchParams.get("propertyId");
  const customerId = searchParams.get("customerId");
  const checkInDate = searchParams.get("checkInDate");
  const checkOutDate = searchParams.get("checkOutDate");
  const hostApproval = searchParams.get("hostApproval");
  const guestNumber = searchParams.get("guestNumber");
  const pricePerNight = searchParams.get("pricePerNight");
  const totalNights = searchParams.get("totalNights");
  const totalPrice = searchParams.get("totalPrice");
  const originalPrice = searchParams.get("originalPrice");
  const totalServiceFee = searchParams.get("totalServiceFee");
  const discountAmount = searchParams.get("discountAmount");
  const propertyName = searchParams.get("propertyName");
  const typeName = searchParams.get("typeName");
  const averagePropertyRating = searchParams.get("averagePropertyRating");
  const numberPropertyRating = searchParams.get("numberPropertyRating");
  const cancelFree = searchParams.get("cancelFree");
  const cancelPartial = searchParams.get("cancelPartial");
  useEffect(() => {
    const checkLoginAndParams = async () => {
      try {
        const { userId } = await checkUserLogin();

        if (!userId) {
          router.push("/404?url=invalid");
          console.log("Redirecting: User not logged in");
        } else {
          if (
            !bookingId ||
            !propertyId ||
            !customerId ||
            !checkInDate ||
            !checkOutDate ||
            !hostApproval ||
            !guestNumber ||
            !pricePerNight ||
            !totalNights ||
            !totalPrice ||
            !originalPrice ||
            !totalServiceFee ||
            !discountAmount ||
            !propertyName ||
            !typeName ||
            !averagePropertyRating ||
            !numberPropertyRating ||
            !cancelFree ||
            !cancelPartial
          ) {
            router.push("/404?url=invalid");
            console.log("Redirecting: Missing required search parameters");
          } else {
            const so: number = userId;
            const customerIdNumber: number = parseInt(customerId, 10);
            if (isNaN(customerIdNumber) || customerIdNumber != so) {
              console.log(
                "Redirecting: Invalid customerId or does not match userId",
                customerIdNumber,
                so
              );
              router.push("/404?url=invalid");
            } else {
              setUserIdChecked(userId);
            }
          }
        }
      } catch (error) {
        console.error("Lỗi trong quá trình kiểm tra:", error);
        console.log("Redirecting: Error during check");
        router.push("/404?url=invalid");
      }
    };

    const callMainPhoto = async () => {
      const res = await fetch(
        `http://localhost:5280/api/Properties/${propertyId}/common`,
        {
          cache: "no-cache",
        }
      );

      if (res.ok) {
        const data = await res.json();
        setMainPhotoUrl(data.mainPhotoUrl);
      }
    };

    checkLoginAndParams();
    callMainPhoto();
  });

  if (userIdChecked === null) return <Loader />;

  return (
    <div>
      <Label className="text-2xl font-bold">Xác nhận và thanh toán</Label>
      <div className="grid grid-cols-2 gap-4 md:gap-12 mt-3">
        <div className="col-span-full md:col-span-1 flex flex-col gap-2 md:gap-4">
          <div className="flex md:hidden items-start gap-2 sticky top-16 bg-background p-2 border-b-2 border-secondary">
            <div className="bg-gray-200 w-20 h-20 rounded-lg"></div>{" "}
            {/* Placeholder cho ảnh */}
            <div>
              <h2 className="font-semibold text-lg max-lg:truncate">
                {propertyName}
              </h2>
              <p className="text-sm text-secondary-foreground">{typeName}</p>
              <p className="text-sm text-secondary-foreground">
                <span className="font-semibold">
                  {parseFloat((averagePropertyRating as string) || "0").toFixed(
                    2
                  )}
                </span>{" "}
                ({numberPropertyRating} đánh giá) • Chủ nhà siêu cấp
              </p>
            </div>
          </div>
          <div className="py-2 md:py-4 border-b-2 border-secondary">
            <Label className="text-xl">Chuyến đi của bạn</Label>
            <div className="mt-2">
              <Label className="text-base">Ngày</Label>
              <p className="">
                {format(new Date(checkInDate as string), "dd 'thg' MM, yyyy")} -{" "}
                {format(new Date(checkOutDate as string), "dd 'thg' MM, yyyy")}
              </p>
            </div>
            <div className="mt-2">
              <Label className="text-base">Khách</Label>
              <p className="">{guestNumber} Khách</p>
            </div>
          </div>
          <div className="py-2 md:py-4 border-b-2 border-secondary">
            <Label className="text-xl">Chọn cách thanh toán</Label>
            <p>Thanh toán ngay {formatCurrencyVND(Number(totalPrice))}</p>
          </div>
          <div className="py-2 md:py-4 border-b-2 border-secondary">
            <Label className="text-xl">Chọn phương thức thanh toán</Label>
            <Select
              value={selectedMethod}
              onValueChange={(value) =>
                setSelectedMethod(value as PaymentMethod)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn phương thức" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit_card">
                  <div className="flex items-center space-x-2">
                    <FaCreditCard className="text-gray-600" size={20} />
                    <span>Thẻ tín dụng</span>
                  </div>
                </SelectItem>
                <SelectItem value="e_wallet">
                  <div className="flex items-center space-x-2">
                    <FaWallet className="text-gray-600" size={20} />
                    <span>Ví điện tử</span>
                  </div>
                </SelectItem>
                <SelectItem value="balance">
                  <div className="flex items-center space-x-2">
                    <FaMoneyBillWave className="text-gray-600" size={20} />
                    <span>Số dư tài khoản</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="py-2 md:py-4 border-b-2 border-secondary">
            <Label className="text-xl">Chính sách hủy</Label>
            <br />
            <span className="font-bold">
              Hủy miễn phí trước{" "}
              {format(new Date(cancelFree as string), "dd 'thg' MM, yyyy")}.{" "}
            </span>
            <span className="">
              Bạn được hoàn tiền một phần nếu hủy trước{" "}
              {format(new Date(cancelPartial as string), "dd 'thg' MM, yyyy")}.
            </span>
          </div>
          <div className="py-2 md:py-4 border-b-2 border-secondary">
            <Label className="text-xl">Quy chuẩn chung</Label>
            <p className="">
              Chúng tôi yêu cầu tất cả khách phải ghi nhớ một số quy chuẩn đơn
              giản để làm một vị khách tuyệt vời.
            </p>
            <ul className="list-disc pl-4">
              <li>Tuân thủ nội quy nhà</li>
              <li>Giữ gìn ngôi nhà như thể đó là nhà bạn</li>
            </ul>
          </div>
          <div className="py-2 md:py-4 border-b-2 border-secondary flex flex-col gap-y-2">
            <p className="text-secondary-foreground text-sm">
              Bằng việc chọn nút bên dưới, tôi đồng ý với{" "}
              <a href="#" className="underline text-foreground font-medium">
                Nội quy nhà của Chủ nhà
              </a>
              ,{" "}
              <a href="#" className="underline text-foreground font-medium">
                Quy chuẩn chung đối với khách
              </a>
              ,{" "}
              <a href="#" className="underline text-foreground font-medium">
                Điều khoản và điều kiện
              </a>
              ,{" "}
              <a href="#" className="underline text-foreground font-medium">
                Chính sách quyền riêng tư
              </a>
              ,{" "}
              <a href="#" className="underline text-foreground font-medium">
                Chính sách đặt lại và hoàn tiền của Grandeur
              </a>
              , và đồng ý rằng Grandeur có thể{" "}
              <a href="#" className="underline text-foreground font-medium">
                tính phí vào phương thức thanh toán của tôi
              </a>{" "}
              nếu tôi phải chịu trách nhiệm về thiệt hại.
            </p>
            <Button className="bg-hdbg font-semibold rounded-md w-fit">
              Xác nhận và thanh toán
            </Button>
          </div>
        </div>
        <div className="col-span-full md:col-span-1 p-2 rounded-lg border-2 border-secondary md:shadow h-fit md:sticky top-20 bg-background">
          <div className="hidden md:flex items-start space-x-4">
            {mainPhotoUrl ? (
              <div className="w-20 h-20 rounded-lg">
                <img
                  src={mainPhotoUrl}
                  loading="lazy"
                  title={propertyName || "Ảnh minh họa"}
                  alt="Hình ảnh minh họa của chỗ ở"
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
            ) : (
              <div className="bg-gray-200 w-20 h-20 rounded-lg"></div>
            )}{" "}
            {/* Placeholder cho ảnh */}
            <div>
              <h2 className="font-semibold text-lg max-lg:truncate">
                {propertyName}
              </h2>
              <p className="text-sm text-secondary-foreground">{typeName}</p>
              <p className="text-sm text-secondary-foreground">
                <span className="font-semibold">
                  {parseFloat((averagePropertyRating as string) || "0").toFixed(
                    2
                  )}
                </span>{" "}
                ({numberPropertyRating} đánh giá) • Chủ nhà siêu cấp
              </p>
            </div>
          </div>

          <hr className="my-4 border-secondary-foreground dark:border-secondary border-1" />

          <h3 className="font-semibold text-lg ">Chi tiết giá</h3>

          <div className="">
            <div className="flex justify-between text-sm py-2">
              <span>
                {formatCurrencyVND(Number(pricePerNight as string))} x{" "}
                {Number(totalNights)} đêm
              </span>
              <span>{formatCurrencyVND(Number(originalPrice as string))}</span>
            </div>
            <div className="flex justify-between text-sm py-2 text-success">
              <span>Tổng voucher giảm giá</span>
              <span>
                -{formatCurrencyVND(Number(discountAmount as string))}
              </span>
            </div>
            <div className="flex justify-between text-sm py-2">
              <span>Phí dịch vụ x {guestNumber} khách</span>
              <span>
                {formatCurrencyVND(Number(totalServiceFee as string))}
              </span>
            </div>

            <hr className="my-4 border-secondary-foreground dark:border-secondary border-1" />

            <div className="flex justify-between font-semibold text-lg">
              <span>Tổng (VND)</span>
              <span>{formatCurrencyVND(Number(totalPrice as string))}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
