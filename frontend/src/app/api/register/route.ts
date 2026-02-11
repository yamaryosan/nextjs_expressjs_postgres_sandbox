import { NextResponse } from 'next/server';
import { users } from '@/lib/pseudo_db';
import { hashPassword } from '@/lib/password';

export async function POST(req: Request) {
	const { email, password } = await req.json();

	if (users[email]) {
		return NextResponse.json({ error: 'User exists' }, { status: 400 });
	}

	const hashed = await hashPassword(password);
	users[email] = hashed;

	return NextResponse.json({ ok: true });
}
