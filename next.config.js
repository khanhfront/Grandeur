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
  },
};

module.exports = nextConfig;
