/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/**", // Chỉ rõ đường dẫn bắt đầu bằng /v0/b/
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [420, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};

module.exports = nextConfig;
