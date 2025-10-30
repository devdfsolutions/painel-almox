// src/app/api/diag/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const usuarios = await prisma.usuario.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      ok: true,
      usuarios,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: err.message ?? String(err),
      },
      { status: 500 }
    );
  }
}
