import { auth } from '@/app/auth';
import { NextResponse } from 'next/server';

export async function GET() {
	const session = await auth();

	if (!session) {
		return NextResponse.redirect('/login');
	}

	return NextResponse.json({
		message: 'JWT による認証成功！',
	});
}
