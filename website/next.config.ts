import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // Allow access from your local network during development
  allowedDevOrigins: [
    "192.168.29.193",
    "localhost",
    "127.0.0.1",
  ],
};

export default nextConfig;