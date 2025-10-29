// next.config.ts
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  experimental: {
    // garante que o Vercel leve os binários do Prisma pro bundle
    outputFileTracingIncludes: {
      "/api/(.*)": [path.join(process.cwd(), "node_modules/.prisma/client")],
      "/app/(.*)": [path.join(process.cwd(), "node_modules/.prisma/client")],
    },
  },
};

export default nextConfig;
