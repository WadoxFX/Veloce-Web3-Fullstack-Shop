import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get('token')
  if (!cookie) return NextResponse.redirect(new URL('/login', request.url))

  const url = process.env.SERVER_URL + 'auth/profile'

  const res = await fetch(`${url}?token=${cookie.value}`, { credentials: 'include' })
  if (!res.ok) return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: '/profile/:path*',
}
