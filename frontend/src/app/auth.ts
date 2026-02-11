import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { users } from '@/lib/pseudo_db';
import { comparePassword } from '@/lib/password';

const schema = z.object({
	email: z.string().min(1),
	password: z.string().min(4),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
	session: {
		strategy: 'jwt',
	},
	providers: [
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				const parsed = schema.safeParse(credentials);
				if (!parsed.success) return null;

				const { email, password } = parsed.data;

				const hashed = users[email];
				if (!hashed) return null;

				const ok = await comparePassword(password, hashed);
				if (!ok) return null;

				return {
					id: email,
					email,
					emailVerified: null,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.email = user.email;
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			session.user = {
				id: token.id as string,
				email: token.email as string,
				emailVerified: null,
			};
			return session;
		},
	},
});
