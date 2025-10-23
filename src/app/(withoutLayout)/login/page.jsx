import { createJWT, verifyJWT } from "@/lib/utils";
import Login from "@/screens/login";

export default async function LoginPage({ searchParams }) {
	const searchParamsAwaited = await searchParams
	// console.log("searchParams content: \n", searchParamsAwaited)

	return (
		<>
			<Login searchParams={searchParamsAwaited} />
		</>
	);
}
