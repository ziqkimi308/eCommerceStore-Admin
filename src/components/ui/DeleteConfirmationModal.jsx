import { CloseIcon, DeleteIcon } from "../icons";
import Button from "./Button";

export default function DeleteConfirmationModal({
	setIsDeleteModalOpen,
	onCancelDelete,
	handleDelete,
}) {
	// const closeModal = () => {
	// 	setIsDeleteModalOpen(false);
	// };

	return (
		// Full-screen container for modal
		<div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center">
			{/* Background overlay (dark screen) */}
			<div
				className="fixed inset-0 bg-black opacity-50"
				onClick={onCancelDelete}
			/>

			{/* Modal wrapper: handles padding, responsive width/height */}
			<div className="relative p-4 w-full max-w-xl h-full md:h-auto">
				{/* Actual modal box */}
				<div className="relative text-center bg-white rounded-lg shadow-lg p-5">
					<button
						type="button"
						className="close-icon-btn"
						onClick={onCancelDelete}
					>
						<CloseIcon />
					</button>

					<div className="flex items-center justify-center text-red-500">
						<DeleteIcon className="h-16 w-16" />
					</div>

					<p className="my-4 font-semibold text-xl">
						Are you sure you want to delete?
					</p>

					<div className="flex justify-end items-center space-x-4">
						<Button
							type="button"
							className="bg-transparent text-black border border-gray-600"
							onClick={onCancelDelete}
						>
							Cancel
						</Button>
						<Button type="submit" onClick={handleDelete}>
							Confirm
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
