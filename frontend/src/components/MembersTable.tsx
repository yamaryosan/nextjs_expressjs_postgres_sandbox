import { User } from "@/lib/fetchUsers";

export default function MembersTable({ users }: { users: User[] }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>名前</th>
                    <th>性別</th>
                    <th>部署</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.gender}</td>
                        <td>{user.department}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
