import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  webpack: (config) => {
    // pnpm doesn't symlink zod as a peer for @hookform/resolvers in its
    // virtual store, so webpack can't resolve "zod/v4/core" from that path.
    // This alias forces all zod imports to the locally installed package.
    config.resolve.alias = {
      ...config.resolve.alias,
      "zod/v4/core": path.resolve(__dirname, "node_modules/zod/v4/core/index.js"),
      "zod/v4": path.resolve(__dirname, "node_modules/zod/v4/index.js"),
      "zod": path.resolve(__dirname, "node_modules/zod/index.js"),
    };
    return config;
  },
};

export default nextConfig;
