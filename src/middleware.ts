// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Executa em Edge (middleware sempre é Edge)
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protege apenas as rotas /app/*
  if (pathname.startsWith("/app")) {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Sem token -> manda pro login com callbackUrl
    if (!token) {
      const url = new URL("/login", req.url);
      url.searchParams.set("callbackUrl", req.url);
      return NextResponse.redirect(url);
    }
  }

  // segue o fluxo normal
  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*"],
};
