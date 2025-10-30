// next.config.ts
import path from "path";

// Não tipar como NextConfig evita erro de TS quando chaves mudam entre versões
const nextConfig = {
  // Força o bundle a levar os binários do Prisma
  outputFileTracingIncludes: {
    "/api/(.*)": [
      path.join(process.cwd(), "node_modules/.prisma/client"),
      path.join(process.cwd(), "node_modules/@prisma/client"),
    ],
    "/(.*)": [
      path.join(process.cwd(), "node_modules/.prisma/client"),
      path.join(process.cwd(), "node_modules/@prisma/client"),
    ],
  },
};

export default nextConfig;
