import { handlers } from '@/app/auth';

// このルートハンドラは、クライアントサイドでAPIを叩くときにパスを公開するためのものであり
// 今の実装（サーバサイドでログイン・ログアウトを行う）では不要。そのうち使う
export const { GET, POST } = handlers;

// こいつらのこと
// /api/auth/session
// /api/auth/signin
// /api/auth/signout
// /api/auth/callback/credentials
