import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { users } from '@/lib/pseudo_db';

export async function POST(req: Request) {
	const { email, password } = await req.json();
	if (users[email]) {
		return NextResponse.json({ error: 'User exists' }, { status: 400 });
	}

	const hashed = await bcrypt.hash(password, 10);
	users[email] = hashed;
	return NextResponse.json({ ok: true });
}
