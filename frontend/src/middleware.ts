import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode('your-secret-key');

// APIレスポンス用
function apiUnauthorized(message = 'Unauthorized') {
	return new NextResponse(JSON.stringify({ error: message }), {
		status: 401,
		headers: { 'Content-Type': 'application/json' },
	});
}

// ページレスポンス用（loginへ飛ばす）
function pageRedirect(req: NextRequest) {
	return NextResponse.redirect(new URL('/login', req.url));
}

export async function middleware(req: NextRequest) {
	const token = req.cookies.get('auth')?.value;
	const path = req.nextUrl.pathname;
	const isApi = path.startsWith('/api/');

	// トークン無し
	if (!token) {
		return isApi ? apiUnauthorized() : pageRedirect(req);
	}

	// トークン有ならば検証
	try {
		await jwtVerify(token, SECRET);
		return NextResponse.next();
	} catch {
		return isApi
			? apiUnauthorized('Invalid or expired token')
			: pageRedirect(req);
	}
}

export const config = {
	matcher: ['/protected/:path*', '/api/protected/:path*'],
};
