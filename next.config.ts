import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/(.*)": [
      path.join(process.cwd(), "node_modules/.prisma/client"),
      path.join(process.cwd(), "node_modules/@prisma/client")
    ],
    "/(.*)": [
      path.join(process.cwd(), "node_modules/.prisma/client"),
      path.join(process.cwd(), "node_modules/@prisma/client")
    ]
  }
};

export default nextConfig;
