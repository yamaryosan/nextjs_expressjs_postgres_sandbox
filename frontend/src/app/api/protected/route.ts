import { NextResponse } from 'next/server';

export async function GET() {
	return NextResponse.json({
		message: '認証に成功しました！',
	});
}
