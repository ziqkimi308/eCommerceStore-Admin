import { getUserData } from "@/actions/authActions"
import Sidebar from "@/components/Sidebar"
import { UserProvider } from "@/contexts/UserContext"

export default async function Withlayout({ children }) {
	// userData fetched once, and only when needed using useContext provider
	const userData = await getUserData()

	return (
		<UserProvider initialUserData={userData}>
			<div className="grid grid-cols-12">
				<div className="col-span-2">
					<Sidebar userData={userData} />
				</div>
				<div className="col-span-10 p-6 my-6 mr-8 border border-gray-300 rounded-xl shadow-lg">
					{children}
				</div>
			</div>
		</UserProvider>
	)
}