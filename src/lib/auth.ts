// src/lib/auth.ts
import Credentials from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "./prisma";
// ⬇️ usa versão 100% JS, funciona no Vercel
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        // proteção básica
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 1. busca usuário
        const user = await prisma.usuario.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          // email não existe
          return null;
        }

        // 2. compara senha usando bcryptjs
        const ok = await bcrypt.compare(
          credentials.password,
          user.senhaHash ?? ""
        );

        if (!ok) {
          // senha errada
          return null;
        }

        // 3. devolve objeto que vai pro token
        return {
          id: user.id,
          name: user.nome,
          email: user.email,
          tenantId: user.tenantId,
          role: user.role,
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.tenantId = (user as any).tenantId;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as any).tenantId = token.tenantId;
      (session.user as any).role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
