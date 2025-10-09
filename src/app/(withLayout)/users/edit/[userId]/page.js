import EditUser from "@/screens/users/edit";

export default async function EditUserPage({ params }) {
	return (
		<>
			{/* params is the dynamic path segments eg folder like [userId] */}
			{/* while searchParams is from query parameters after ? in URL */}
			<EditUser params={params} />
		</>
	)
}