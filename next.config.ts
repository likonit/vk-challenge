import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // разрешаем загрузку фото с любых сайтов.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      },
    ],
  },
};

export default nextConfig;
