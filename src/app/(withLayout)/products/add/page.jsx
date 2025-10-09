import { getProductTypes } from "@/actions/productTypesActions";
import AddProducts from "@/screens/products/add";

export default async function AddProductsPage({ searchParams }) {
	const { errorMessage } = await searchParams;
	const productTypes = await getProductTypes();

	return (
		<>
			<AddProducts errorMessage={errorMessage} productTypes={productTypes} />
		</>
	);
}
