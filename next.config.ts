import path from "path";

const nextConfig = {
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
