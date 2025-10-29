'use client';

import { useEffect, useState } from 'react';

export default function ProtectedPage() {
	const [message, setMessage] = useState<string | null>(null);

	async function fetchProtectedMessage() {
		try {
			const res = await fetch('/api/protected', {
				credentials: 'include',
				cache: 'no-store',
			});

			if (!res.ok) {
				setMessage('ログインが必要です。');
				return;
			}

			const data = await res.json();
			setMessage(data.message ?? '認証成功');
		} catch (err) {
			console.error(err);
			setMessage('通信エラーが発生しました。');
		}
	}

	useEffect(() => {
		fetchProtectedMessage();
	}, []);

	return (
		<main className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl mb-4">保護ページ</h1>
			<p>{message ?? '読み込み中...'}</p>
			<button
				className="mt-4 bg-gray-600 text-white p-2"
				onClick={async () => {
					await fetch('/api/logout', { method: 'POST' });
					window.location.href = '/login';
				}}
			>
				ログアウト
			</button>
		</main>
	);
}
