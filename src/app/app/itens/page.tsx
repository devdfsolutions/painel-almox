import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

// ✅ tipo inferido automaticamente do retorno real do Prisma (100% compatível com v6+)
type ItemRow = Awaited<ReturnType<typeof prisma.item.findMany>>[number];

export const dynamic = "force-dynamic";

export default async function ItensPage() {
  // Sessão do usuário atual
  const session = await getServerSession(authOptions);
  const tenantId = (session?.user as any)?.tenantId;

  // Busca itens do tenant logado
  const itens = await prisma.item.findMany({
    where: { tenantId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Itens</h1>
        <Link
          href="/app/itens/novo"
          className="px-3 py-2 rounded bg-black text-white text-sm hover:bg-gray-800 transition"
        >
          Novo
        </Link>
      </div>

      {/* Tabela */}
      <div className="rounded-xl overflow-hidden border shadow-sm bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Nome</th>
              <th className="p-2 text-left">Código</th>
              <th className="p-2 text-left">Tipo</th>
              <th className="p-2 text-left">Ativo</th>
            </tr>
          </thead>
          <tbody>
            {/* Mensagem caso não tenha itens */}
            {itens.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  Nenhum item cadastrado.
                </td>
              </tr>
            )}

            {/* Listagem */}
            {itens.map((i: ItemRow) => (
              <tr key={i.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{i.nome}</td>
                <td className="p-2">{i.codigo ?? "-"}</td>
                <td className="p-2">
                  {i.tipo === "PATRIMONIO" ? "Patrimônio" : "Alugável"}
                </td>
                <td className="p-2">{i.ativo ? "Sim" : "Não"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
