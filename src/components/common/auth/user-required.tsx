import ButtonLink from "../button/link-button";

export const UserRequiredPage = () => {
  return (
    <div>
      <div>Đăng nhập với tài khoản người dùng để tiếp tục</div>
      <div className="flex items-center justify-center">
        <ButtonLink url="/">Về trang chủ</ButtonLink>
      </div>
    </div>
  );
};
