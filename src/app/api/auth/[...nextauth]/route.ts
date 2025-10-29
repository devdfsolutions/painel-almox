import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";        // 👈 evita edge runtime
export const dynamic = "force-dynamic"; // 👈 evita cache nesses handlers

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
