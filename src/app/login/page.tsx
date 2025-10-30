"use client";

import { signIn } from "next-auth/react";
import { useState, Suspense } from "react";

// forçar que essa página seja tratada como dinâmica e não tente pré-renderizar
export const dynamic = "force-dynamic";

function LoginForm() {
  const [email, setEmail] = useState("admin@demo.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/app",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid place-items-center min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-semibold mb-4">Acessar</h1>

        <label className="block text-sm mb-1">E-mail</label>
        <input
          className="w-full border rounded p-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        <label className="block text-sm mb-1">Senha</label>
        <input
          className="w-full border rounded p-2 mb-4"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded bg-black text-white py-2 disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Carregando...</div>}>
      <LoginForm />
    </Suspense>
  );
}
