'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const router = useRouter();

	async function handleRegister(e: React.FormEvent) {
		e.preventDefault();
		const res = await fetch('/api/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});
		const data = await res.json();
		if (res.ok) {
			setMessage('登録完了。ログイン画面へ移動します。');
			setTimeout(() => router.push('/login'), 1000);
		} else {
			setMessage(data.error || '登録に失敗しました');
		}
	}

	return (
		<main className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl mb-4">新規登録</h1>
			<form
				onSubmit={handleRegister}
				className="flex flex-col gap-2 w-64"
			>
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
				<button type="submit" className="bg-green-500 text-white p-2">
					登録
				</button>
			</form>
			{message && <p className="mt-2">{message}</p>}
		</main>
	);
}
