import { fetchUsers } from "../lib/fetchUsers";
import MembersTable from "@/components/MembersTable";
import FilterForm from "@/components/FilterForm";

export default async function Home({
    searchParams,
}: {
    searchParams: Promise<{ gender: string; department: string }>;
}) {
    const users = await fetchUsers(searchParams);
    return (
        <div>
            <FilterForm />
            <MembersTable users={users} />
        </div>
    );
}
