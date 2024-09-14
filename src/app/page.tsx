// src/app/page.tsx
import Header from "@/components/layout/header";
import PageContainer from "@/components/layout/page-container";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main suppressHydrationWarning={true}>
      <Header />
      <PageContainer isMain={true}>
        <Link href={"/admin"}>Admin</Link>
        <Link href={"/user"}>user</Link>

        <section className="text-center space-y-4">
          <h2 className="text-3xl font-semibold">Giới thiệu</h2>
          <p className="text-base">
            Đây là phần giới thiệu về trang web của bạn. Bạn có thể thêm thông
            tin cơ bản và mô tả ngắn gọn về các dịch vụ hoặc sản phẩm mà bạn
            cung cấp.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Các Dịch Vụ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">Dịch vụ 1</h3>
              <p className="text-base mt-2">
                Mô tả ngắn gọn về dịch vụ 1. Bạn có thể thêm chi tiết về cách
                dịch vụ này có thể giúp khách hàng của bạn.
              </p>
              <Button>Học Thêm</Button>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">Dịch vụ 2</h3>
              <p className="text-base mt-2">
                Mô tả ngắn gọn về dịch vụ 2. Thông tin về cách dịch vụ này cải
                thiện trải nghiệm của khách hàng.
              </p>
              <Button>Học Thêm</Button>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">Dịch vụ 3</h3>
              <p className="text-base mt-2">
                Mô tả ngắn gọn về dịch vụ 3. Cung cấp thông tin về lợi ích của
                dịch vụ này cho khách hàng.
              </p>
              <Button>Học Thêm</Button>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Tin Tức Mới Nhất</h2>
          <article className="bg-card p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold">Bài Viết 1</h3>
            <p className="text-base mt-2">
              Nội dung bài viết 1. Cung cấp thông tin chi tiết và các điểm nổi
              bật của bài viết này để thu hút người đọc.
            </p>
            <Button>Đọc Thêm</Button>
          </article>
          <article className="bg-card p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold">Bài Viết 2</h3>
            <p className="text-base mt-2">
              Nội dung bài viết 2. Đưa ra thông tin chi tiết và các điểm chính
              của bài viết này.
            </p>
            <Button>Đọc Thêm</Button>
          </article>
        </section>
        <section className="text-center space-y-4">
          <h2 className="text-3xl font-semibold">Giới thiệu</h2>
          <p className="text-base">
            Đây là phần giới thiệu về trang web của bạn. Bạn có thể thêm thông
            tin cơ bản và mô tả ngắn gọn về các dịch vụ hoặc sản phẩm mà bạn
            cung cấp.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Các Dịch Vụ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">Dịch vụ 1</h3>
              <p className="text-base mt-2">
                Mô tả ngắn gọn về dịch vụ 1. Bạn có thể thêm chi tiết về cách
                dịch vụ này có thể giúp khách hàng của bạn.
              </p>
              <Button>Học Thêm</Button>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">Dịch vụ 2</h3>
              <p className="text-base mt-2">
                Mô tả ngắn gọn về dịch vụ 2. Thông tin về cách dịch vụ này cải
                thiện trải nghiệm của khách hàng.
              </p>
              <Button>Học Thêm</Button>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">Dịch vụ 3</h3>
              <p className="text-base mt-2">
                Mô tả ngắn gọn về dịch vụ 3. Cung cấp thông tin về lợi ích của
                dịch vụ này cho khách hàng.
              </p>
              <Button>Học Thêm</Button>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-semibold">Tin Tức Mới Nhất</h2>
          <article className="bg-card p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold">Bài Viết 1</h3>
            <p className="text-base mt-2">
              Nội dung bài viết 1. Cung cấp thông tin chi tiết và các điểm nổi
              bật của bài viết này để thu hút người đọc.
            </p>
            <Button>Đọc Thêm</Button>
          </article>
          <article className="bg-card p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold">Bài Viết 2</h3>
            <p className="text-base mt-2">
              Nội dung bài viết 2. Đưa ra thông tin chi tiết và các điểm chính
              của bài viết này.
            </p>
            <Button>Đọc Thêm</Button>
          </article>
        </section>
      </PageContainer>
    </main>
  );
}
