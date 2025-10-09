export default function Buyers({ buyers }) {

	return (
		<div>
			<div className="flex justify-between">
				<h1 className="text-2xl font-semibold p-2">Buyer Management</h1>
			</div>
			<hr className="my-5" />
			<div className="mt-20">
				<table className="custom-table">
					<thead className="border-y-2 border-gray-400">
						<tr>
							<th>Sr. No.</th>
							<th>Name</th>
							<th>Email</th>
							<th>Address</th>
							<th>City</th>
						</tr>
					</thead>
					<tbody className="text-gray-700 text-center font-medium text-lg">
						{buyers.length > 0 ? (
							buyers.map((buyer, index) => (
								<tr key={buyer.id}>
									<td>{index + 1}</td>
									<td>{buyer.customerName}</td>
									<td>{buyer.email}</td>
									<td>{buyer.address}</td>
									<td>{buyer.city}</td>
								</tr>
							))
						) : (
							// In tailwind, ! means important
							<tr colSpan={5} className="!text-center">
								<td>No Buyers Found.</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
