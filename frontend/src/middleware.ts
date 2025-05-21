// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const pathname = request.nextUrl.pathname

  const isAuthPage = pathname === '/signin'
  const isProtectedRoute = pathname.startsWith('/dashboard')

  // 👇 Redirect if NOT logged in and trying to access protected route
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  // 👇 Redirect if logged in and tries to go to login page
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/login'],
}
