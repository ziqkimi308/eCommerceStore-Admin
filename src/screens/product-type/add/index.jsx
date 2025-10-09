import { createProductType } from "@/actions/productTypesActions";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";

export default async function AddProductTypes({ searchParams }) {
	const { errorMessage } = await searchParams;

	return (
		<div>
			<h1 className="text-3xl font-semibold p-2">Add Product Type</h1>

			<form className="grid gap-x-6 gap-y-10 mt-10 grid-cols-2 px-2" action={createProductType}>
				{/* Error Message */}
				{errorMessage && (
					<div className="col-span-2 border border-red-500 rounded-xl px-5 py-3 bg-red-50 ">
						<span className="text-red-500 font-500">{errorMessage}</span>
					</div>
				)}

				{/* Inputs */}
				<div className="grid gap-2">
					<Label required={true} htmlFor="productType">
						Product Type
					</Label>
					<Input
						type="text"
						placeholder="Enter Product Type"
						id="productType"
						name="productType"
					/>
				</div>
				<div className="grid gap-2"></div>

				<Button className="w-52 col-span-2 mt-2">Submit</Button>
			</form>
		</div>
	);
}
