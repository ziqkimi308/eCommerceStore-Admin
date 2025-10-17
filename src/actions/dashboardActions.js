import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { jwtTokenVerification } from "./authActions";

// Fetch all buyers for dashboard
export async function getDashboardData() {
	await jwtTokenVerification()
	// Use Parallel Data Fetching
	const [customerData, salesMasterData] = await Promise.all([
		// Fetch all customer regardless they have buying record or not
		db.buyerMaster.findMany({
			orderBy: {
				createdAt: "asc"
			},
			include: {
				// sales came from SalesMaster
				sales: true
			}
		}),
		// Fetch data from SalesMaster db
		db.salesMaster.findMany({
			include: {
				buyer: true,
				salesTransaction: true
			},
			orderBy: {
				SODateTime: "desc"
			}
		})
	])

	// Filter so that only customer with buying record
	const totalBuyers = customerData?.filter(customer => customer.sales?.length > 0)

	// Generate number of customers vs date
	const customersByDate = customerData?.reduce((acc, customer) => {
		const date = formatDate(customer.createdAt)
		if (!acc[date]) {
			acc[date] = {
				date,
				count: 1,
			}
		}
		acc[date].count += 1

		return acc
	}, {})

	// Generate total revenue
	const totalRevenue = salesMasterData?.reduce((acc, sale) => acc + sale.grandTotalPrice, 0)

	// Prepare data for the sales chart line
	const salesByDate = salesMasterData?.reduce((acc, sale) => {
		const date = formatDate(sale.SODateTime)

		// acc here is an empty object {}
		// if date is not yet in object, proceed this if statement
		if (!acc[date]) {
			acc[date] = {
				// when a variable inserted into object, it become key and value like "date" here
				date,
				sales: sale.grandTotalPrice
			}
		}
		acc[date].sales += sale.grandTotalPrice

		return acc // the thing with array methods, DON'T FORGET TO EXPLICIT RETURN!!
	}, {})

	// Sanitize data
	const dashboardData = {
		totalBuyers: totalBuyers.length,
		totalCustomers: customerData.length,
		totalRevenue: totalRevenue,
		orders: salesMasterData?.splice(0, 5),
		salesChartData: Object.values(salesByDate).reverse(),
		customersChartData: Object.values(customersByDate)
	}

	return dashboardData
}