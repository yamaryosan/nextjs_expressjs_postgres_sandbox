import { users } from '@/lib/pseudo_db';
import { comparePassword } from '@/lib/password';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	const { email, password } = await req.json();

	const hashed = users[email];
	if (!hashed) return Error('No user');

	const ok = await comparePassword(password, hashed);
	if (!ok) return Error('Wrong password');

	return NextResponse.json({ ok: true });
}
