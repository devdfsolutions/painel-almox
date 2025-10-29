// src/app/api/diag/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.usuario.findMany({
      take: 5,
      select: { email: true, role: true, tenantId: true },
    });
    const itens = await prisma.item.count();
    return Response.json({
      ok: true,
      users,
      itens,
      dbUrlHost: process.env.DATABASE_URL?.split("@")[1]?.split(":")[0] ?? null,
    });
  } catch (e: any) {
    return Response.json(
      { ok: false, error: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
