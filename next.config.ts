// next.config.ts
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/(.*)": [path.join(process.cwd(), "node_modules/.prisma/client")],
    "/app/(.*)": [path.join(process.cwd(), "node_modules/.prisma/client")],
  },
  experimental: {},
};

export default nextConfig;
