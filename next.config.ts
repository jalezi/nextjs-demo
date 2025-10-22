import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,

  // Enhanced for Next.js 16
  experimental: {
    // Enable new optimization features
    optimizePackageImports: ["react-icons", "date-fns"],
  },

  images: {
    // Updated format for Next.js 16 (domains is deprecated)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
