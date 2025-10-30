// src/lib/auth.ts
import Credentials from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "./prisma";
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
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 👇 AQUI que tava estourando pq não achava o engine
        const user = await prisma.usuario.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;

        const ok = await bcrypt.compare(credentials.password, user.senhaHash ?? "");
        if (!ok) return null;

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
