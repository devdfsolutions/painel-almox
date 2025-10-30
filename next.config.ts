import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    // todas as rotas de API
    "/src/app/api/(.*)": [
      path.join(process.cwd(), "node_modules/.prisma/client"),
      path.join(process.cwd(), "node_modules/@prisma/client")
    ],
    // fallback geral (páginas que possam chamar prisma no server)
    "/(.*)": [
      path.join(process.cwd(), "node_modules/.prisma/client"),
      path.join(process.cwd(), "node_modules/@prisma/client")
    ]
  }
};

export default nextConfig;
