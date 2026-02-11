declare global {
	var users: Record<string, string> | undefined;
}

export const users = globalThis.users ?? {};
globalThis.users = users;
