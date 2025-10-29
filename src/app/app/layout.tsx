import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const nome = session?.user?.name ?? "Usuário";
  return (
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-semibold">Almoxarifado & Locação</div>
          <nav className="flex gap-4 text-sm">
            <Link href="/app">Dashboard</Link>
            <Link href="/app/itens">Itens</Link>
            <Link href="/app/custodias">Custódias</Link>
            <Link href="/app/locacoes">Locações</Link>
          </nav>
          <div className="text-sm text-gray-600">{nome}</div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto p-4">{children}</main>
    </div>
  );
}
