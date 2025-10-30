// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";        // força lambda node
export const dynamic = "force-dynamic"; // sem cache

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
