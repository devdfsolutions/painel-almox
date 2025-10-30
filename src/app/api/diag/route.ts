// src/app/api/diag/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.usuario.findMany();
    return NextResponse.json({ ok: true, users });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        error: String(err)
      },
      { status: 500 }
    );
  }
}
