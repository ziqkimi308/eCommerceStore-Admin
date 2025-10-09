import CustomLineChart from "@/components/CustomLineChart";

export default function ChartSection({dashboardData}) {
	return (
		<div className="grid grid-cols-2 gap-5">
			<div className="w-full dashboard-card">
				<h1 className="text-2xl font-bold">Sales</h1>
				<div className="w-full h-[300px] text-blue-700">
					<CustomLineChart data={dashboardData?.salesChartData} yKey="sales" />
				</div>
			</div>
			<div className="w-full dashboard-card">
				<h1 className="text-2xl font-bold">Customers</h1>
				<div className="w-full h-[300px] text-green-700">
					<CustomLineChart
						data={dashboardData?.customersChartData}
						yKey="count"
					/>
				</div>
			</div>
		</div>
	);
}
