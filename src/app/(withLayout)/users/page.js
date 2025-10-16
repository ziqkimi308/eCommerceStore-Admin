/* User Page */

import UsersScreen from "@/screens/users";
import { getUsers } from "@/actions/userActions";

export const revalidate = 60

export default async function UsersPage() {
	const users = await getUsers();
	return (
		<>
			<UsersScreen users={users}/>
		</>
	);
}
