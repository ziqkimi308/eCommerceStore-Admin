"use client";

import { useState } from "react";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal";
import Link from "next/link";
import { EditIcon, DeleteIcon } from "@/components/icons";
import Button from "@/components/ui/Button";
import { deleteProductType } from "@/actions/productTypesActions";

export default function ProductTypes({ productTypes }) {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedId, setSelectedId] = useState();

	const handleDelete = async () => {
		await deleteProductType(selectedId);
		setIsDeleteModalOpen(false);
		setSelectedId(null);
	};

	return (
		<div>
			<div className="flex justify-between">
				<h1 className="text-2xl font-semibold p-2">Product Type Management</h1>
				<button>
					<Link href="/product-type/add" className="custom-primary-btn">
						Add Product Type
					</Link>
				</button>
			</div>
			<hr className="my-5" />
			<div className="mt-20">
				<table className="custom-table">
					<thead className="border-y-2 border-gray-400">
						<tr>
							<th>Sr. No.</th>
							<th>User Name</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody className="text-gray-700 text-center font-medium text-lg">
						{productTypes.map((productType, index) => (
							<tr key={productType.id}>
								<td>{index + 1}</td>
								<td>{productType.name}</td>
								<td className="flex items-center gap-x-3">
									<Link
										className="w-fit"
										href={`/product-type/edit/${productType.id}`}
									>
										<EditIcon />
									</Link>
									<Button
										className="bg-transparent p-0 text-red-500 border-none pt-1.5"
										onClick={() => {
											setIsDeleteModalOpen(true);
											setSelectedId(productType.id);
										}}
									>
										<DeleteIcon />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{isDeleteModalOpen && (
					<DeleteConfirmationModal
						setIsDeleteModalOpen={setIsDeleteModalOpen}
						onCancelDelete={() => setIsDeleteModalOpen(false)}
						handleDelete={handleDelete}
					/>
				)}
			</div>
		</div>
	);
}
