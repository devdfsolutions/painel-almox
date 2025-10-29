import type { NextConfig } from "next";
import path from "path";

const config: NextConfig = {
  outputFileTracingIncludes: {
    // inclui os binários do Prisma nas serverless functions
    "/api/(.*)": [path.join(process.cwd(), "node_modules/.prisma/client")],
    "/(app|pages)/(.*)": [path.join(process.cwd(), "node_modules/.prisma/client")]
  }
};

export default config;
