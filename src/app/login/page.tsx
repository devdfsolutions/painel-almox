"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@demo.com");
  const [password, setPassword] = useState("admin123");

  return (
    <main className="grid place-items-center min-h-screen p-6">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-semibold mb-4">Acessar</h1>
        <label className="block text-sm mb-1">E-mail</label>
        <input className="w-full border rounded p-2 mb-3" value={email} onChange={e=>setEmail(e.target.value)} />
        <label className="block text-sm mb-1">Senha</label>
        <input className="w-full border rounded p-2 mb-4" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button
          onClick={() => signIn("credentials", { email, password, callbackUrl: "/app" })}
          className="w-full rounded bg-black text-white py-2"
        >
          Entrar
        </button>
      </div>
    </main>
  );
}
