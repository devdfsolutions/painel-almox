// next.config.ts
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // a parte de tracing é pra garantir que o Vercel leve o binário
  experimental: {
    // deixa o app router mais feliz no Vercel
  },
  outputFileTracingIncludes: {
    // todas as rotas de API e auth vão precisar do Prisma
    "/api/(.*)": [
      path.join(process.cwd(), "node_modules/.prisma/client"),
      path.join(process.cwd(), "node_modules/@prisma/client"),
    ],
    // e o app inteiro também pode precisar
    "/(.*)": [
      path.join(process.cwd(), "node_modules/.prisma/client"),
      path.join(process.cwd(), "node_modules/@prisma/client"),
    ],
  },
};

export default nextConfig;
