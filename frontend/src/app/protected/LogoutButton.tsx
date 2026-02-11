'use client';

import { logout } from './actions';

export function LogoutButton() {
	return (
		<button
			className="mt-4 bg-gray-600 text-white p-2"
			onClick={async () => {
				await logout();
			}}
		>
			ログアウト
		</button>
	);
}
