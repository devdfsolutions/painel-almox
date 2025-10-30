// next.config.mjs
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  // isso aqui manda o Vercel levar a pasta dos engines do Prisma
  outputFileTracingIncludes: {
    "/api/(.*)": [
      path.join(process.cwd(), "node_modules/.prisma/client"),
      path.join(process.cwd(), "node_modules/@prisma/client")
    ],
    "/(.*)": [
      path.join(process.cwd(), "node_modules/.prisma/client"),
      path.join(process.cwd(), "node_modules/@prisma/client")
    ]
  }
};

export default nextConfig;
