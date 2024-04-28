import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get('token')

  if (!cookie) return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: '/profile/:path*',
}
