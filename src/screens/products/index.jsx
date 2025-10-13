"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useState } from "react";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal";
import { DeleteIcon, EditIcon } from "@/components/icons";
import cn from "@/lib/utils";
import { deleteProduct } from "@/actions/productActions";

export default function Products({ products }) {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [SelectedProduct, setSelectedProduct] = useState();

	const handleDelete = async () => {
		await deleteProduct(SelectedProduct);
		setIsDeleteModalOpen(false);
		setSelectedProduct(null)
	};

	return (
		<div>
			<div className="flex justify-between">
				<h1 className="text-2xl font-semibold p-2">Product Management</h1>
				<button>
					<Link href="/products/add" className="custom-primary-btn">
						Add Product
					</Link>
				</button>
			</div>
			<hr className="my-5" />
			<div className="mt-20">
				<table className="custom-table">
					<thead className="border-y-2 border-gray-400">
						<tr>
							<th>Product</th>
							<th>Product Type</th>
							<th>MRP</th>
							<th>Selling Price</th>
							<th>Current Stock</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody className="text-gray-700 text-center font-medium text-lg">
						{products?.length > 0 ? (
							products.map((product) => {
								return (
									<tr key={product.id}>
										<td className="flex gap-3 items-center">
											<Image
												src={"/" + product.image}
												alt={product.name}
												width={0}
												height={0}
												sizes="100vw"
												className="w-20 h-20 object-cover"
											/>
											<div className="flex flex-col">
												<span>{product.name}</span>
												<span className="text-sm text-gray-500 truncate max-w-52">
													{product.description}
												</span>
											</div>
										</td>
										<td>{product.productType.name || "-"}</td>
										<td>{product.mrp || "0"}</td>
										<td>{product.sellPrice || "0"}</td>
										<td>{product.currentStock || "0"}</td>
										<td
											className={cn(
												product.isActive ? "text-green-500" : "text-red-500"
											)}
										>
											{product.isActive ? "Active" : "Inactive"}
										</td>
										<td>
											<div>
												<Link
													className="w-fit"
													href={`/products/edit/${product.id}`}
												>
													<EditIcon />
												</Link>
												<Button
													className="bg-transparent p-0 text-red-500 border-none pt-1.5"
													onClick={() => {
														setIsDeleteModalOpen(true);
														setSelectedProduct(product);
													}}
												>
													<DeleteIcon />
												</Button>
											</div>
										</td>
									</tr>
								);
							})
						) : (
							<tr colSpan={5} className="!text-center">
								<td>No Product Found.</td>
							</tr>
						)}
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
