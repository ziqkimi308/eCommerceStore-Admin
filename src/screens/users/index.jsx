"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { DeleteIcon, EditIcon } from "@/components/icons";
import { deleteUser } from "@/actions/userActions";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal";
import { useState } from "react";

export default function UsersScreen({ users }) {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedId, setSelectedId] = useState();

	const handleDelete = async () => {
		await deleteUser(selectedId);
		setIsDeleteModalOpen(false);
		setSelectedId(null)
	};

	return (
		<div>
			<div className="flex justify-between">
				<h1 className="text-2xl font-semibold p-2">User Management</h1>
				<button>
					<Link href="/users/add" className="custom-primary-btn">
						Add User
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
						{users.map((user, index) => (
							<tr key={user.id}>
								<td>{index + 1}</td>
								<td>{user.userName}</td>
								<td className="flex items-center gap-x-3">
									<Link className="w-fit" href={`/users/edit/${user.id}`}>
										<EditIcon />
									</Link>
									<Button
										className="bg-transparent p-0 text-red-500 border-none pt-1.5"
										onClick={() => {setIsDeleteModalOpen(true);
											setSelectedId(user.id)}
										}
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
