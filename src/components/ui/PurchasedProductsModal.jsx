import { CloseIcon } from "../icons";

export default function PurchasedProductsModal({ setIsOpen, products }) {
	const closeModal = () => setIsOpen(false);

	return (
		// Full-screen container for modal
		<div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center">
			{/* Background overlay (dark screen) */}
			<div className="fixed inset-0 bg-black opacity-50" onClick={closeModal} />

			{/* Modal wrapper: handles padding, responsive width/height */}
			<div className="relative p-4 w-full max-w-4xl h-full md:h-auto">
				{/* Actual modal box */}
				<div className="relative text-center bg-white rounded-lg shadow-lg p-5">
					<button type="button" className="close-icon-btn" onClick={closeModal}>
						<CloseIcon />
					</button>

					<table className="custom-table">
						<thead className="border-y-2 border-gray-400">
							<tr>
								<th>Sr. No.</th>
								<th>Product Name</th>
								<th>Selling Price</th>
								<th>Purchased Quantity</th>
								<th>Total Amount</th>
							</tr>
						</thead>
						<tbody className="text-gray-700 text-center font-medium text-lg">
							{products.length > 0 ? (
								products.map((product, index) => (
									<tr key={product.id}>
										<td>{index + 1}</td>
										<td>{product.productName}</td>
										<td>{product.unitPrice}</td>
										<td>{product.qtyPurchased}</td>
										<td>${product.total}</td>
									</tr>
								))
							) : (
								// In tailwind, ! means important
								<tr colSpan={6} className="!text-center">
									<td>No Products Found.</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
