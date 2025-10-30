// src/app/api/diag/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.usuario.findMany({
      take: 5,
      select: {
        id: true,
        email: true,
        nome: true,
        role: true,
      },
    });

    return NextResponse.json({
      ok: true,
      users,
      env: {
        databaseUrl: !!process.env.DATABASE_URL,
        directUrl: !!process.env.DIRECT_URL,
        prismaEngine: process.env.PRISMA_CLIENT_ENGINE_TYPE || "not-set",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        error: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}
