import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "digital8x.com",
      },
    ],
  },
};

export default nextConfig;
