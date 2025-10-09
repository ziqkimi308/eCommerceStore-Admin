import { getProductTypes } from "@/actions/productTypesActions";
import ProductTypes from "@/screens/product-type";

export default async function ProductTypeManagement() {
	const productTypes = await getProductTypes();

	return (
		<div>
			<ProductTypes productTypes={productTypes} />
		</div>
	);
}
