'use server';

import { signIn } from '@/app/auth';

export async function signin() {
	await signIn('google', {
		redirectTo: '/protected',
	});
}
