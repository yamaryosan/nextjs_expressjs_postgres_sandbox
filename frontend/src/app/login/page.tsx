'use client';

import { signin } from '@/app/login/actions';

export default function Page() {
	return (
		<main className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl mb-4">ログイン</h1>
			<button
				className="bg-blue-500 text-white p-2"
				onClick={async () => {
					await signin();
				}}
			>
				Googleでログイン
			</button>
		</main>
	);
}
