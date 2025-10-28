import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode('your-secret-key');

export async function GET(req: NextRequest) {
	const token = req.cookies.get('auth')?.value;
	if (!token) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		await jwtVerify(token, SECRET);
		return NextResponse.json({ message: '認証に成功しました！' });
	} catch {
		return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
	}
}
