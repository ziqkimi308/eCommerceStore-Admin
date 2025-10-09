import { updateProduct } from "@/actions/productActions";
import Button from "@/components/ui/Button";
import CustomFileInput from "@/components/ui/CustomFileInput";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Switch from "@/components/ui/Switch";

export default function EditProduct({ errorMessage, productTypes, product }) {
	// Bind action server before use
	const updatedUpdateProduct = updateProduct.bind(null, product.id, product.image);

	return (
		<div>
			<h1 className="text-3xl font-semibold p-2">Edit Product</h1>

			<form
				className="grid gap-x-6 gap-y-10 mt-10 grid-cols-2 px-2"
				action={updatedUpdateProduct}
			>
				{/* Error Message */}
				{errorMessage && (
					<div className="col-span-2 border border-red-500 rounded-xl px-5 py-3 bg-red-50 ">
						<span className="text-red-500 font-500">{errorMessage}</span>
					</div>
				)}

				{/* Inputs */}
				{/* Product Name */}
				<div className="grid gap-2">
					<Label required={true} htmlFor="productName">
						Product Name
					</Label>
					<Input
						type="text"
						placeholder="Enter Product Name"
						id="productName"
						name="productName"
						defaultValue={product.name}
					/>
				</div>
				{/* Product Type */}
				<div className="grid gap-2">
					<Label required={true} htmlFor="productType">
						Product Type
					</Label>
					<select
						className="custom-input bg-white cursor-pointer appearance-none"
						id="productType"
						name="productType"
						defaultValue={product.productTypeId}
					>
						{productTypes?.map((productType) => {
							return (
								<option key={productType.id} value={productType.id}>
									{productType.name}
								</option>
							);
						})}
					</select>
				</div>
				{/* MRP */}
				<div className="grid gap-2">
					<Label required={true} htmlFor="mrp">
						MRP
					</Label>
					<Input
						type="number"
						id="mrp"
						placeholder="Enter MRP"
						name="mrp"
						defaultValue={product.mrp}
					/>
				</div>
				{/* Selling Price */}
				<div className="grid gap-2">
					<Label required={true} htmlFor="sellingPrice">
						Selling Price
					</Label>
					<Input
						type="number"
						id="sellingPrice"
						placeholder="Enter Selling Price"
						name="sellingPrice"
						defaultValue={product.sellPrice}
					/>
				</div>
				{/* Image File Upload */}
				<div className="grid gap-2">
					<Label required={true} htmlFor="image">
						Image
					</Label>
					<CustomFileInput name="image" defaultValue={product.image} />
				</div>
				{/* Small Size Stock */}
				<div className="grid gap-2">
					<Label required={true} htmlFor="smallSizeStock">
						Stock of Small Size
					</Label>
					<Input
						type="number"
						id="smallSizeStock"
						placeholder="Enter Stock of Small Size"
						name="smallSizeStock"
						defaultValue={product.smallSize}
					/>
				</div>
				{/* Medium Size Stock */}
				<div className="grid gap-2">
					<Label required={true} htmlFor="mediumSizeStock">
						Stock of Medium Size
					</Label>
					<Input
						type="number"
						id="mediumSizeStock"
						placeholder="Enter Stock of Medium Size"
						name="mediumSizeStock"
						defaultValue={product.mediumSize}
					/>
				</div>
				{/* Large Size Stock */}
				<div className="grid gap-2">
					<Label required={true} htmlFor="largeSizeStock">
						Stock of Large Size
					</Label>
					<Input
						type="number"
						id="largeSizeStock"
						placeholder="Enter Stock of Large Size"
						name="largeSizeStock"
						defaultValue={product.largeSize}
					/>
				</div>
				{/* Checkbox isActive */}
				<div className="grid gap-2 justify-start">
					<Label required={true} htmlFor="isActive">
						Product Status
					</Label>
					<Switch
						name="isActive"
						defaultChecked={product.isActive ? "on" : null}
					/>
				</div>
				{/* Product Description */}
				<div className="grid gap-2 col-span-2">
					<Label required={true} htmlFor="description">
						Description
					</Label>
					<textarea
						className="custom-input h-auto"
						name="description"
						id="description"
						placeholder="Enter Product Description"
						rows={5}
						defaultValue={product.description}
					></textarea>
				</div>
				<Button className="w-52 col-span-2 mt-2">Submit</Button>
			</form>
		</div>
	);
}
