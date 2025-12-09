import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

function clearAuthCookie() {
	return serialize('auth', '', {
		httpOnly: true,
		expires: new Date(0),
		path: '/',
	});
}

function ok() {
	return NextResponse.json({ ok: true });
}

export async function POST() {
	const res = ok();
	res.headers.set('Set-Cookie', clearAuthCookie());
	return res;
}
