import { LogoutButton } from './LogoutButton';

export default async function Page() {
	return (
		<main className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-2xl mb-4">保護ページ</h1>
			<p>認証成功</p>
			<LogoutButton />
		</main>
	);
}
