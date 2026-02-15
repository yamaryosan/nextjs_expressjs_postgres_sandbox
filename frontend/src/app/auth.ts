import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
	session: {
		strategy: 'jwt',
	},
	providers: [Google],
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
