import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 75],

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
    
    "10.227.101.135",
  ],
};

export default nextConfig;