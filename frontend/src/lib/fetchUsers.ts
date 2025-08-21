import qs from "qs";

export type User = {
    id: string;
    name: string;
    gender: string;
    department: string;
};

export async function fetchUsers(
    searchParams: Promise<{ gender: string; department: string }>
): Promise<User[]> {
    const params = await searchParams;
    const query = qs.stringify(params);
    const res = await fetch(`http://localhost:4000/users?${query}`);
    const data = await res.json();
    return data.map((user: User) => user);
}
