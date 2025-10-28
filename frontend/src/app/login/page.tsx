'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	async function handleLogin(e: React.FormEvent) {
		e.preventDefault();
		setError('');

		const res = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});

		if (res.ok) {
			router.push('/protected');
		} else {
			const data = await res.json();
			setError(data.error || 'ログインに失敗しました');
		}
	}

	return (
		<main className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl mb-4">ログイン</h1>
			<form onSubmit={handleLogin} className="flex flex-col gap-2 w-64">
				<input
					type="email"
					placeholder="メールアドレス"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="border p-2"
				/>
				<input
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
			</form>
			{error && <p className="text-red-600 mt-2">{error}</p>}
		</main>
	);
}
