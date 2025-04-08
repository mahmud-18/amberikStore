import { NextResponse } from "next/server";

export function middleware(request) {
  // Cek apakah request ke rute admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Cek apakah ada cookie isAdmin
    const isAdmin = request.cookies.get("admin_token")?.value === "true";

    // Jika bukan admin dan mencoba mengakses halaman login, izinkan
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Jika bukan admin, redirect ke halaman login
    if (!isAdmin) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
