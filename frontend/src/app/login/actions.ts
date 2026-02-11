'use server';

import { signIn } from '@/app/auth';

export async function signin(formData: FormData) {
	try {
		await signIn('credentials', {
			email: formData.get('email'),
			password: formData.get('password'),
			redirectTo: '/protected',
		});
	} catch (error: any) {
		if (error?.type === 'CredentialsSignin') {
			return { error: 'メールまたはパスワードが正しくありません' };
		}
		if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
			throw error;
		}

		console.error(error);
		throw error;
	}
}
