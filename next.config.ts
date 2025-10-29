// next.config.ts
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Garante que os binários do Prisma entrem em TODAS as serverless funcs
  outputFileTracingIncludes: {
    // rotas API (app router: /app/api/*)
    "/api/(.*)": [
      path.join(process.cwd(), "node_modules/.prisma/client"),
      path.join(process.cwd(), "node_modules/@prisma/engines"),
    ],
    // páginas/route handlers que façam queries server-side
    "/app/(.*)": [
      path.join(process.cwd(), "node_modules/.prisma/client"),
      path.join(process.cwd(), "node_modules/@prisma/engines"),
    ],
  },
};

export default nextConfig;
