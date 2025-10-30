// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";        // garante que não vai pra edge
export const dynamic = "force-dynamic"; // sem cache

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
