const config = {
  generators: [
    {
      name: "prisma-client-js",
      provider: "prisma-client-js",
      binaryTargets: ["native", "rhel-openssl-3.0.x"]
    }
  ]
};

export default config;
