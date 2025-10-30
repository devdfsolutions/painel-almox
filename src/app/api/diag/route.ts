// src/app/api/diag/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  // aqui a gente NÃO usa Prisma de propósito
  return NextResponse.json({
    ok: true,
    message: "API online no Vercel ✅ (sem Prisma aqui)",
    env: {
      databaseUrl: process.env.DATABASE_URL ? "set" : "missing",
      directUrl: process.env.DIRECT_URL ? "set" : "missing",
      prismaClientEngineType: process.env.PRISMA_CLIENT_ENGINE_TYPE || "default",
      nodeEnv: process.env.NODE_ENV,
    },
    time: new Date().toISOString(),
  });
}
