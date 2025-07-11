import type { NextConfig } from "next";



const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  watchOptions: {
    pollIntervalMs:1000
  },
  devIndicators: false
};

export default nextConfig;
