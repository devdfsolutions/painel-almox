// next.config.ts
import path from "path";

const nextConfig = {
  // Garante que os arquivos da pasta .prisma/client vão junto nas Serverless Functions
  outputFileTracingIncludes: {
    "/api/(.*)": [path.join(process.cwd(), "node_modules/.prisma/client/**")],
    "/app/(.*)": [path.join(process.cwd(), "node_modules/.prisma/client/**")]
  }
};

export default nextConfig;
