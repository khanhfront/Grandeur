import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Grandeur - Khám phá, Đặt chỗ và Trải nghiệm",
    template: "%s | Grandeur",
  },
  description:
    "Grandeur là nền tảng đặt chỗ và trải nghiệm tốt nhất dành cho bạn. Tìm chỗ nghỉ ngơi độc đáo hoặc cho thuê không gian của bạn với chúng tôi.",
  openGraph: {
    title: "Grandeur",
    description:
      "Tìm kiếm và đặt chỗ nghỉ, khám phá trải nghiệm mới, hoặc cho thuê không gian của bạn với Grandeur.",
    url: "https://grandeur.com",
    siteName: "Grandeur",
    images: [
      {
        url: "https://grandeur.com/images/og-image.jpg", // Thay bằng đường dẫn thực tế
        width: 1200,
        height: 630,
        alt: "Logo Grandeur",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Grandeur", // Twitter handle của trang web (nếu có)
    title: "Grandeur - Khám phá và đặt chỗ nghỉ tuyệt vời",
    description:
      "Cùng Grandeur khám phá những chỗ nghỉ độc đáo và trải nghiệm đáng nhớ.",
    images: ["https://grandeur.com/images/twitter-image.jpg"], // Đường dẫn hình ảnh cho Twitter
  },
  icons: {
    icon: "/favicon.ico", // Đường dẫn favicon
    shortcut: "/favicon.ico", // Shortcut icon cho các nền tảng khác
    apple: "/favicon.ico", // Icon cho thiết bị Apple
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} `} suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster
            expand={true}
            position="top-right"
            toastOptions={{
              className: "border-foreground",
              duration: 1500,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
