import { createJWT, verifyJWT } from "@/lib/utils";
import Login from "@/screens/login";

export default async function LoginPage() {

	return (
		<>
			<Login />
		</>
	);
}
