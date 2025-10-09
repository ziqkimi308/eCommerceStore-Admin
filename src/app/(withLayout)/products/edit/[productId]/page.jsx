import { getUniqueProduct } from "@/actions/productActions";
import { getProductTypes } from "@/actions/productTypesActions";
import EditProduct from "@/screens/products/edit";

export default async function EditProductPage({ searchParams, params }) {
	const { errorMessage } = await searchParams;
	const productTypes = await getProductTypes();
	const {productId} = await params
	const product = await getUniqueProduct(productId);

	return (
		<>
			<EditProduct errorMessage={errorMessage} productTypes={productTypes} product={product} />
		</>
	);
}
