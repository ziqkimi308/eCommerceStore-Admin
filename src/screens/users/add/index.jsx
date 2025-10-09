import { createUser } from "@/actions/userActions";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";

export default async function AddUser({ searchParams }) {
	const { errorMessage } = await searchParams;
	console.log(errorMessage);
	return (
		<div>
			<h1 className="text-3xl font-semibold p-2">Add User</h1>

			<form
				className="grid gap-x-6 gap-y-10 mt-10 grid-cols-2 px-2"
				action={createUser}
			>
				{/* Error Message */}
				{errorMessage && (
					<div className="col-span-2 border border-red-500 rounded-xl px-5 py-3 bg-red-50 ">
						<span className="text-red-500 font-500">
							{errorMessage}
						</span>
					</div>
				)}

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
					>
						<option value="">Select User Type</option>
						<option value="Super Admin">Super Admin</option>
						<option value="Admin">Admin</option>
						<option value="Manager">Manager</option>
					</select>
				</div>
				<div className="grid gap-2">
					<Label required={true} htmlFor="password">
						Password
					</Label>
					<Input
						minLength={8}
						type="password"
						id="password"
						placeholder="Example@123"
						name="password"
					/>
				</div>
				<div className="grid gap-2">
					<Label required={true} htmlFor="confirmPassword">
						Confirm Password
					</Label>
					<Input
						minLength={8}
						type="password"
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
