'use server';

import { signOut } from '@/app/auth';

export async function logout() {
	await signOut({ redirectTo: '/login' });
}
