import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    domains: ["picsum.photos"],
  },
};

export default nextConfig;
