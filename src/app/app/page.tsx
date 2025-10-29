import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AppHome() {
  const session = await getServerSession(authOptions);
  const tenantId = (session?.user as any)?.tenantId;
  const [itens, abertas] = await Promise.all([
    prisma.item.count({ where: { tenantId, ativo: true } }),
    prisma.locacao.count({ where: { tenantId, fimEfetivo: null } }),
  ]);
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-xl bg-white p-4 shadow">
        <div className="text-gray-500 text-sm">Itens Ativos</div>
        <div className="text-3xl font-semibold">{itens}</div>
      </div>
      <div className="rounded-xl bg-white p-4 shadow">
        <div className="text-gray-500 text-sm">Locações em Andamento</div>
        <div className="text-3xl font-semibold">{abertas}</div>
      </div>
    </div>
  );
}
