type User = { id: string; name: string };

const usersa: User[] = [
	{ id: 'a', name: 'Alice' },
	{ id: 'b', name: 'Bob' },
];

const userMap = usersa.reduce<Record<string, User>>((acc, user) => {
	acc[user.id] = user;
	return acc;
}, {});

console.log(userMap);

/**
const userMap = {
  a: { id: "a", name: "Alice" },
  b: { id: "b", name: "Bob" },
}
*/
