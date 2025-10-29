import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function create(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  const tenantId = (session?.user as any)?.tenantId;
  const nome = String(formData.get("nome") ?? "");
  const codigo = String(formData.get("codigo") ?? "");
  const tipo = String(formData.get("tipo") ?? "PATRIMONIO");
  await prisma.item.create({ data: { tenantId, nome, codigo: codigo || null, tipo: tipo as any } });
  redirect("/app/itens");
}

export default async function NovoItem() {
  return (
    <form className="max-w-md space-y-3" action={create}>
      <h1 className="text-xl font-semibold">Novo Item</h1>
      <div>
        <label className="block text-sm mb-1">Nome</label>
        <input name="nome" className="w-full border rounded p-2" required />
      </div>
      <div>
        <label className="block text-sm mb-1">Código</label>
        <input name="codigo" className="w-full border rounded p-2" />
      </div>
      <div>
        <label className="block text-sm mb-1">Tipo</label>
        <select name="tipo" className="w-full border rounded p-2">
          <option value="PATRIMONIO">PATRIMONIO</option>
          <option value="ALUGAVEL">ALUGAVEL</option>
        </select>
      </div>
      <button className="rounded bg-black text-white px-4 py-2">Salvar</button>
    </form>
  );
}
