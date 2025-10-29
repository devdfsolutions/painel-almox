import { defineConfig } from "@prisma/internals";

export default defineConfig({
  generators: [
    {
      provider: "prisma-client-js",
      previewFeatures: [],
      binaryTargets: ["native", "rhel-openssl-3.0.x"],
      engineType: "binary",
      output: "./node_modules/@prisma/client",
    },
  ],
});
