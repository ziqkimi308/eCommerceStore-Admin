"use client";

import { InformationIcon } from "@/components/icons";
import Button from "@/components/ui/Button";
import PurchasedProductsModal from "@/components/ui/PurchasedProductsModal";
import cn, { formatDate } from "@/lib/utils";
import { useState } from "react";

export default function RecentOrderSection({ orders, className }) {
	const [isProductModalOpen, setIsProductModalOpen] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState(null);

	return (
		<>
			<div className={cn("grid dashboard-card", className)}>
				<h1 className="text-2xl font-bold">Recent Orders</h1>
				<table className="custom-table">
					<thead className="border-y-2 border-gray-400">
						<tr>
							<th>Sr. No.</th>
							<th>Buyer's Name</th>
							<th>Date</th>
							<th>Total</th>
							<th>Payment Mode</th>
							<th>Products</th>
						</tr>
					</thead>
					<tbody className="text-gray-700 text-center font-medium text-lg">
						{orders.length > 0 ? (
							orders.map((order, index) => (
								<tr key={order.id}>
									<td>{index + 1}</td>
									<td>{order.buyer.customerName}</td>
									<td>{formatDate(order.SODateTime)}</td>
									<td>{order.grandTotalPrice}</td>
									<td>{order.paymentMode}</td>
									<td>
										<Button
											type="button"
											className="bg-transparent text-blue-700 p-0"
											onClick={() => {
												setIsProductModalOpen(true);
												setSelectedOrder(order);
												console.log("This is order: ", order)
											}}
										>
											<InformationIcon />
										</Button>
									</td>
								</tr>
							))
						) : (
							// In tailwind, ! means important
							<tr colSpan={6} className="!text-center">
								<td>No Orders Found.</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* ProductModal */}
			{isProductModalOpen && (
				<PurchasedProductsModal
					setIsOpen={setIsProductModalOpen}
					products={selectedOrder?.salesTransaction}
				/>
			)}
		</>
	);
}
