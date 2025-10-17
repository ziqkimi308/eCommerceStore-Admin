import { createJWT, verifyJWT } from "@/lib/utils";
import Login from "@/screens/login";

export default async function LoginPage({ searchParams }) {
	// Testing loading screen
	// await new Promise((resolve) => setTimeout(resolve, 4000));

	return (
		<>
			<Login searchParams={searchParams} />
		</>
	);
}
