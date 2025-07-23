import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("Middleware running for:", request.nextUrl.pathname);

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  const isProtected = ["/home"].some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    console.log("No token found! Redirecting to /userLogin");
    return NextResponse.redirect(new URL("/", request.url));
  }
  

  console.log("Token found");
  return NextResponse.next();
}

export const config = {
  matcher: ["/home/:path*"], // ✅ matches /home and everything inside
};
