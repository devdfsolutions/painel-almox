// next.config.ts
import path from "path";

const nextConfig = {
  outputFileTracingIncludes: {
    "/api/(.*)": [path.join(process.cwd(), "node_modules/.prisma/client/**")],
    "/app/(.*)": [path.join(process.cwd(), "node_modules/.prisma/client/**")]
  }
};

export default nextConfig;
