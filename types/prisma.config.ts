// prisma.config.ts
import type { PrismaConfig } from "@prisma/client/runtime/library";

const config: PrismaConfig = {
  // isso força o client a procurar o engine certo no deploy
  // e evita o "Query Engine ... not found"
  generator: {
    engineType: "binary",
  },
};

export default config;
