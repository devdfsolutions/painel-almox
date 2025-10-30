// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // aqui você não precisa passar engineType porque já está no schema
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
