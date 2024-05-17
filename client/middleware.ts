import { NextRequest, NextResponse } from 'next/server'

const loginRoute = '/login'

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get('token')
  if (!authToken) return NextResponse.redirect(new URL(loginRoute, request.url))

  const url = process.env.SERVER_URL + 'auth/profile'

  const req = await fetch(`${url}?token=${authToken.value}`, { credentials: 'include' })
  if (!req.ok) return NextResponse.redirect(new URL(loginRoute, request.url))
}

export const config = {
  matcher: '/profile/:path*',
}
