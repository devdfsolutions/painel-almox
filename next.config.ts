// next.config.ts
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // isso aqui é o que faz a mágica: empacota o client + engines
  experimental: {
    outputFileTracingIncludes: {
      // tudo que for API (inclusive /api/auth/[...nextauth])
      "/api/(.*)": [
        path.join(process.cwd(), "node_modules/.prisma/client"),
        path.join(process.cwd(), "node_modules/@prisma/client"),
      ],
      // e também as rotas do app dir que podem chamar prisma no server
      "/app/(.*)": [
        path.join(process.cwd(), "node_modules/.prisma/client"),
        path.join(process.cwd(), "node_modules/@prisma/client"),
      ],
    },
  },
};

export default nextConfig;
