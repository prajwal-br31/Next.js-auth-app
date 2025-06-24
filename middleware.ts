import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_PATHS = ['/', '/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Allow public paths through

  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get('auth')?.value;
  // No cookie = redirect to home
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, SECRET);

    const role = payload.role;

    // Allow access based on role and path
    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (pathname.startsWith('/user') && role !== 'user') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch (err) {
    // Invalid or expired token = redirect to home
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
}