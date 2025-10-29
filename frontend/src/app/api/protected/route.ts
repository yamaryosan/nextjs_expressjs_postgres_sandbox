import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode('your-secret-key');

export async function GET(req: Request) {
	const token = req.headers.get('cookie')?.match(/auth=([^;]+)/)?.[1];

	if (!token) {
		// APIから呼ばれているときはJSONで返す
		const accept = req.headers.get('accept') || '';
		if (accept.includes('application/json')) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{ status: 401 },
			);
		}
		// ブラウザ直アクセスなら /login にリダイレクト
		return NextResponse.redirect(new URL('/login', req.url));
	}

	try {
		await jwtVerify(token, SECRET);
		return NextResponse.json({ message: '認証に成功しました！' });
	} catch {
		return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
	}
}
