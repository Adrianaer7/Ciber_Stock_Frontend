import { NextResponse } from "next/server"

const PROTECTED_PREFIXES = [
  "/productos",
  "/nuevoproducto",
  "/producto",
  "/faltantes",
  "/compras",
  "/ventas",
  "/proveedores",
  "/rubros",
  "/porcentajes",
]

const isProtected = (pathname) =>
  PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  )

export function proxy(request) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("token")?.value

  if (isProtected(pathname) && !token) {
    const loginUrl = new URL("/", request.url)
    loginUrl.searchParams.set("next", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Si ya hay sesión, no mostrar login / crear cuenta
  if (token && (pathname === "/" || pathname === "/crear-cuenta")) {
    return NextResponse.redirect(new URL("/productos", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    "/crear-cuenta",
    "/productos/:path*",
    "/nuevoproducto",
    "/producto/:path*",
    "/faltantes",
    "/compras",
    "/ventas",
    "/proveedores",
    "/rubros",
    "/porcentajes",
  ],
}
