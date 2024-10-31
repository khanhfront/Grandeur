import { FC } from "react";
import { FiLock, FiEdit, FiEye } from "react-icons/fi";

const RightBar: FC = () => {
  return (
    <div className="bg-background m-2 mt-5 mb-0 mr-0 flex flex-col border border-border p-2 rounded-lg gap-2 sticky top-[70px]">
      <div className="p-4 ">
        <div className="flex items-center gap-2">
          <div className="text-primary">
            <FiLock className="w-6 h-6" />
          </div>
          <h3 className="text-foreground font-semibold">
            Tại sao thông tin của tôi không được hiển thị ở đây?
          </h3>
        </div>
        <p className="text-muted-foreground text-sm mt-2">
          Chúng tôi đang ẩn một số thông tin tài khoản để bảo vệ danh tính của
          bạn.
        </p>
      </div>

      <div className="p-4 pt-6 border-t">
        <div className="flex items-center gap-2">
          <div className="text-red-500">
            <FiEdit className="w-6 h-6" />
          </div>
          <h3 className="text-foreground font-semibold">
            Bạn có thể chỉnh sửa những thông tin nào?
          </h3>
        </div>
        <p className="text-muted-foreground text-sm mt-2">
          Bạn có thể chỉnh sửa thông tin liên hệ và thông tin cá nhân. Nếu có sự
          thay đổi về xác minh danh tính, bạn sẽ cần phải xác minh lại.
        </p>
      </div>

      <div className="p-4 pt-6 border-t">
        <div className="flex items-center gap-2">
          <div className="text-primary">
            <FiEye className="w-6 h-6" />
          </div>
          <h3 className="text-foreground font-semibold">
            Thông tin nào được chia sẻ với người khác?
          </h3>
        </div>
        <p className="text-muted-foreground text-sm mt-2">
          Chỉ có chi tiết liên lạc của bạn sẽ được chia sẻ với chủ nhà hoặc
          khách hàng khi có đặt chỗ.
        </p>
      </div>
    </div>
  );
};

export default RightBar;
