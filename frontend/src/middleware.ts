import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode('your-secret-key');

export async function middleware(req: NextRequest) {
	const token = req.cookies.get('auth')?.value;
	const url = req.nextUrl;

	const isApiRequest = url.pathname.startsWith('/api/');

	// トークンなし
	if (!token) {
		if (isApiRequest) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 },
			);
		}
		// ブラウザアクセス時はリダイレクト
		return NextResponse.redirect(new URL('/login', req.url));
	}

	try {
		await jwtVerify(token, SECRET);
		return NextResponse.next();
	} catch {
		if (isApiRequest) {
			return NextResponse.json(
				{ error: 'Invalid or expired token' },
				{ status: 401 },
			);
		}
		return NextResponse.redirect(new URL('/login', req.url));
	}
}

// middlewareが適用されるパス
export const config = {
	matcher: ['/protected/:path*', '/api/protected/:path*'],
};
