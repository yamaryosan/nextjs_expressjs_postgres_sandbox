import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
	const cookie = serialize('auth', '', {
		httpOnly: true,
		expires: new Date(0),
		path: '/',
	});
	const res = NextResponse.json({ ok: true });
	res.headers.set('Set-Cookie', cookie);
	return res;
}
