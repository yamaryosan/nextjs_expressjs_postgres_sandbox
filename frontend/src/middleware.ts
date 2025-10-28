import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode('your-secret-key');

export async function middleware(req: NextRequest) {
	const token = req.cookies.get('auth')?.value;

	if (!token) {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	try {
		await jwtVerify(token, SECRET);
		return NextResponse.next();
	} catch {
		return NextResponse.redirect(new URL('/login', req.url));
	}
}

// ✅ この部分を必ず追加
export const config = {
	matcher: ['/protected/:path*', '/api/protected/:path*'],
};
