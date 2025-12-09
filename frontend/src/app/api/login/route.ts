import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { serialize } from 'cookie';
import { users } from '@/lib/pseudo_db';

const SECRET = new TextEncoder().encode('your-secret-key');

// JSONエラーレスポンス
function error(message: string, status = 400) {
	return NextResponse.json({ error: message }, { status });
}

// JWT生成
async function createToken(email: string) {
	return new SignJWT({ email })
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('1h')
		.sign(SECRET);
}

// Cookie生成
function createAuthCookie(token: string) {
	return serialize('auth', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		path: '/',
	});
}

export async function POST(req: Request) {
	const { email, password } = await req.json();

	// ユーザー存在チェック
	const hashed = users[email];
	if (!hashed) return error('No user');

	// パスワードチェック
	const match = await bcrypt.compare(password, hashed);
	if (!match) return error('Wrong password');

	// トークン作成
	const token = await createToken(email);
	const cookie = createAuthCookie(token);

	// 成功レスポンス
	const res = NextResponse.json({ ok: true });
	res.headers.set('Set-Cookie', cookie);
	return res;
}
