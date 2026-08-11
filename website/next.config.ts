import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
    ],
  },

  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.29.193",
    "10.166.238.135"
  ],
};

export default nextConfig;