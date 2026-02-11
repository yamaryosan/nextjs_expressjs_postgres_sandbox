import { auth } from '@/app/auth';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({ children }: any) {
	const session = await auth();

	console.log(session);

	if (!session?.user) {
		redirect('/login');
	}

	return <>{children}</>;
}
