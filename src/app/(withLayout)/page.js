/* Dashboard Page */

import { getDashboardData } from "@/actions/dashboardActions";
import Dashboard from "@/screens/dashboard";

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
	const dashboardData = await getDashboardData()
	// console.log(dashboardData)

	return (
		<>
			<Dashboard dashboardData={dashboardData} />
		</>
	);
}
