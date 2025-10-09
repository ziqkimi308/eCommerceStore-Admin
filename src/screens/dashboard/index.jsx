import CustomLineChart from "@/components/CustomLineChart";
import RecentOrderSection from "./RecentOrderSection";
import ChartSection from "./ChartSection";

export default function Dashboard({ dashboardData }) {
	return (
		<div>
			{/* Total Buyers */}
			<div className="grid grid-cols-3 gap-5 mb-5">
				<div className="dashboard-card">
					<h1 className="text-xl font-bold">Total Buyers</h1>
					<h1 className="text-3xl">{dashboardData?.totalBuyers}</h1>
				</div>
				{/* Total Customers */}
				<div className="dashboard-card">
					<h1 className="text-xl font-bold">Total Customers</h1>
					<h1 className="text-3xl">{dashboardData?.totalCustomers}</h1>
				</div>
				{/* Total Revenue */}
				<div className="dashboard-card">
					<h1 className="text-xl font-bold">Total Revenue</h1>
					<h1 className="text-3xl">
						${(dashboardData?.totalRevenue).toFixed(2)}
					</h1>
				</div>
			</div>
			{/* Recent Order Section */}
			<RecentOrderSection orders={dashboardData.orders} className="mb-5" />

			{/* Line Charts */}
			<ChartSection dashboardData={dashboardData} />
		</div>
	);
}
