import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Inclui os binários do Prisma no bundle das functions
  outputFileTracingIncludes: {
    "/api/(.*)": [
      path.join(process.cwd(), "node_modules/.prisma/client"),
      path.join(process.cwd(), "node_modules/@prisma/engines")
    ],
    "/app/(.*)": [
      path.join(process.cwd(), "node_modules/.prisma/client"),
      path.join(process.cwd(), "node_modules/@prisma/engines")
    ]
  }
};

export default nextConfig;
