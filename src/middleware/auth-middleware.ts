import { NextResponse, type NextRequest } from "next/server";
import { tokenUtils } from "@/lib/auth-tokens";

export function authMiddleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  const token = req.cookies.get("auth-token")?.value || 
                req.headers.get("authorization")?.replace("Bearer ", "");

  const isLoggedIn = token && !tokenUtils.isTokenExpired(token);

  if (!isLoggedIn && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/v1/login", req.url));
  }

  if (isLoggedIn && pathname === "/auth/v1/login") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}
