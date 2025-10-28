export default async function ProtectedPage() {
	const res = await fetch('http://localhost:3000/api/protected', {
		cache: 'no-store',
		credentials: 'include',
	});

	if (!res.ok) {
		return <p>アクセスが拒否されました。</p>;
	}

	const data = await res.json();

	return (
		<main className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl mb-4">保護ページ</h1>
			<p>{data.message}</p>
			<form action="/api/logout" method="POST">
				<button className="mt-4 bg-gray-600 text-white p-2">
					ログアウト
				</button>
			</form>
		</main>
	);
}
