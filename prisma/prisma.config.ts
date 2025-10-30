// prisma.config.ts
import type { PrismaConfig } from "prisma/config";

const config: PrismaConfig = {
  // força o client a usar o runtime que o Vercel usa (linux + openssl 3)
  // assim o "query-engine-rhel-openssl-3.0.x" já vai pra node_modules/.prisma/client
  generators: [
    {
      name: "prisma-client-js",
      provider: "prisma-client-js",
      binaryTargets: ["native", "rhel-openssl-3.0.x"],
    },
  ],
};

export default config;
