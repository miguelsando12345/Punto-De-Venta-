import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  // Obtiene el token desde la cookie "token"
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    jwt.verify(token, SECRET);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Configuración del matcher para proteger todas las rutas excepto las públicas
export const config = {
  matcher: ["/((?!login|api/auth/login|_next|favicon.ico).*)"],
};
