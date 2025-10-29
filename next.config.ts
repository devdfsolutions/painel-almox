// next.config.ts
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // 👇 agora é RAIZ (não dentro de experimental)
  outputFileTracingIncludes: {
    "/api/(.*)": [path.join(process.cwd(), "node_modules/.prisma/client")],
    "/app/(.*)": [path.join(process.cwd(), "node_modules/.prisma/client")],
  },

  // pode manter experimental vazio ou com outras flags se quiser
  experimental: {},
};

export default nextConfig;
