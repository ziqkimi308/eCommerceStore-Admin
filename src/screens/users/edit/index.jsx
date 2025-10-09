import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { getUniqueUser, updateUser } from "@/actions/userActions";

export default async function EditUser({ params }) {
	const { userId } = await params;
	const id = parseInt(userId); // Convert from string to integer
	const userData = await getUniqueUser(id);
	const updateUserWithId = updateUser.bind(null, id);
	return (
		<div>
			<h1 className="text-3xl font-semibold p-2">Edit user</h1>

			<form
				className="grid gap-x-6 gap-y-10 mt-10 grid-cols-2 px-2"
				action={updateUserWithId}
			>
				{/* Error Message */}
				{/* {errorMessage && (
					<div className="col-span-2 border border-red-500 rounded-xl px-5 py-3 bg-red-50 ">
						<span className="text-red-500 font-500">{errorMessage}</span>
					</div>
				)} */}

				{/* Inputs */}
				<div className="grid gap-2">
					<Label required={true} htmlFor="userName">
						Username
					</Label>
					<Input
						type="text"
						placeholder="Enter Username"
						id="userName"
						name="userName"
						defaultValue={userData.userName}
					/>
				</div>
				<div className="grid gap-2">
					<Label required={true} htmlFor="userType">
						User Type
					</Label>
					<select
						className="custom-input bg-white cursor-pointer appearance-none"
						id="userType"
						name="userType"
						defaultValue={userData.userType}
					>
						<option value="">Select User Type</option>
						<option value="Super Admin">Super Admin</option>
						<option value="Admin">Admin</option>
						<option value="Manager">Manager</option>
					</select>
				</div>
				<div className="grid gap-2">
					<Label htmlFor="password">Reset Password</Label>
					<Input
						type="password"
						id="password"
						placeholder="Example@123"
						name="password"
					/>
				</div>
				<div className="grid gap-2">
					<Label htmlFor="confirmPassword">Confirm Password</Label>
					<Input
						type="text"
						id="confirmPassword"
						placeholder="Re-enter password"
						name="confirmPassword"
					/>
				</div>
				<Button className="w-52 col-span-2 mt-2">Submit</Button>
			</form>
		</div>
	);
}
