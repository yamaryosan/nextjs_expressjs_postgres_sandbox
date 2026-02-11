'use client';

import { useState } from 'react';
import { signin } from '@/app/login/actions';

export default function Page() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	async function handleLogin(formData: FormData) {
		setError('');
		const res = await signin(formData);
		setError(res?.error || 'ログインに失敗しました');
	}

	return (
		<main className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl mb-4">ログイン</h1>
			<form action={handleLogin} className="flex flex-col gap-2 w-64">
				<input
					name="email"
					type="email"
					placeholder="メールアドレス"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="border p-2"
				/>
				<input
					name="password"
					type="password"
					placeholder="パスワード"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className="border p-2"
				/>
				<button type="submit" className="bg-blue-500 text-white p-2">
					ログイン
				</button>
				{error && <p className="text-red-600 mt-2">{error}</p>}
			</form>
		</main>
	);
}
