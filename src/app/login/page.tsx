"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@demo.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/app";

  async function handleLogin() {
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (res?.error) {
      setError("Credenciais inválidas");
      return;
    }

    router.push(callbackUrl);
  }

  return (
    <main className="grid place-items-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-semibold mb-4">Acessar</h1>

        {error ? (
          <p className="mb-3 text-sm text-red-600">{error}</p>
        ) : null}

        <label className="block text-sm mb-1">E-mail</label>
        <input
          className="w-full border rounded p-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-sm mb-1">Senha</label>
        <input
          className="w-full border rounded p-2 mb-4"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full rounded bg-black text-white py-2 hover:bg-gray-900 transition"
        >
          Entrar
        </button>
      </div>
    </main>
  );
}
