'use server';

import { signIn } from '@/app/auth';

export async function signin(formData: FormData) {
	const data = new URLSearchParams();

	for (const [key, value] of formData.entries()) {
		data.append(key, value.toString());
	}

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

		console.log(error);

		if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
			throw error;
		}

		throw error;
	}
}
