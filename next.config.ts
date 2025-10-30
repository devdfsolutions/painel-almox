// next.config.ts
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // isso aqui o Next 16 aceita
  outputFileTracingIncludes: {
    // todas as rotas de API podem precisar do Prisma
    "/api/**": [
      path.join(process.cwd(), "node_modules/.prisma/client"),
      path.join(process.cwd(), "node_modules/@prisma/client"),
    ],
  },
};

export default nextConfig;
