import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';
import { serialize } from 'cookie';
import { users } from '@/lib/pseudo_db';

const SECRET = new TextEncoder().encode('your-secret-key');

export async function POST(req: Request) {
	const { email, password } = await req.json();
	console.log(users);
	const hashed = users[email];
	if (!hashed)
		return NextResponse.json({ error: 'No user' }, { status: 400 });

	const match = await bcrypt.compare(password, hashed);
	if (!match)
		return NextResponse.json({ error: 'Wrong password' }, { status: 400 });

	const token = await new SignJWT({ email })
		.setProtectedHeader({ alg: 'HS256' })
		.setExpirationTime('1h')
		.sign(SECRET);

	const cookie = serialize('auth', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict',
		path: '/',
	});

	const res = NextResponse.json({ ok: true });
	res.headers.set('Set-Cookie', cookie);
	return res;
}
