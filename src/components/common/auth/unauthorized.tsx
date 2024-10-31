import ButtonLink from "../button/link-button";

export const UnauthorizedPage = () => {
  return (
    <div>
      <div>Bạn cần đăng nhập để tiếp tục</div>
      <div className="flex items-center justify-center">
        <ButtonLink url="/">Về trang chủ</ButtonLink>
      </div>
    </div>
  );
};
