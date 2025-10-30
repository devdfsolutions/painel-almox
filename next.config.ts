// next.config.ts
import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracing: true,
  // Inclui a pasta que contém os engines do Prisma no bundle do Lambda
  outputFileTracingIncludes: {
    "/api/(.*)": [path.join(process.cwd(), "node_modules/.prisma/client")],
    "/(.*)": [path.join(process.cwd(), "node_modules/.prisma/client")]
  }
};

export default nextConfig;
