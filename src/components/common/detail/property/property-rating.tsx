import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // React Icons
import { MdFavorite } from "react-icons/md"; // React Icon cho "Guest favorite"

interface PropertyRatingProps {
  rating: number;
  numberOfReviews: number;
  isSponsored: boolean;
}

export const PropertyRating: React.FC<PropertyRatingProps> = ({
  rating,
  numberOfReviews,
  isSponsored,
}) => {
  const isLoved = rating > 4.7 || isSponsored;

  // Hàm để render các sao dựa trên giá trị rating
  const renderStars = () => {
    const fullStars = Math.floor(rating); // Số sao đầy đủ (nguyên)
    const hasHalfStar = rating % 1 >= 0.5; // Kiểm tra nếu có nửa sao
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Số sao rỗng

    return (
      <div className="flex">
        {/* Hiển thị sao đầy đủ */}
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <FaStar
              key={index}
              className="w-2 h-2 md:w-3 md:h-3 xl:w-4 xl:h-4"
            />
          ))}

        {/* Hiển thị nửa sao nếu có */}
        {hasHalfStar && (
          <FaStarHalfAlt className="w-2 h-2 md:w-3 md:h-3 xl:w-4 xl:h-4" />
        )}

        {/* Hiển thị sao rỗng */}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <FaRegStar
              key={index}
              className="w-2 h-2 md:w-3 md:h-3 xl:w-4 xl:h-4"
            />
          ))}
      </div>
    );
  };

  return (
    <div className="sm:flex items-center justify-between p-1 sm:p-4 border rounded-lg mb-6">
      {/* Phần 1: Guest favorite */}
      <div className="flex items-center">
        <MdFavorite className="w-6 h-6 sm:mr-2  text-hdbg" />
        <div>
          <div className="font-bold text-sm">
            {isLoved ? "Yêu thích từ khách hàng" : "Chỗ ở tiềm năng"}
          </div>
          <div className="text-xs">
            {isLoved
              ? "Một trong những chỗ ở được yêu thích nhất trên Grandeur, theo ý kiến khách hàng"
              : "Chỗ ở này đang được nhiều khách hàng quan tâm trên Grandeur"}
          </div>
        </div>
      </div>

      <div className="">
        {/* Phần 2: Rating */}
        <div className="max-sm:mt-2 flex items-center gap-1 text-center">
          <div className="text-xs sm:text-sm lg:text-xl font-bold">
            {rating.toFixed(2)}
          </div>
          {renderStars()}
        </div>

        {/* Phần 3: Số lượng đánh giá */}
        <div className="max-sm:mt-2 flex items-center gap-1 text-center">
          <div className="text-xs sm:text-sm lg:text-xl font-bold">
            {numberOfReviews}
          </div>
          <div className="text-xs sm:text-sm underline">Đánh giá</div>
        </div>
      </div>
    </div>
  );
};
