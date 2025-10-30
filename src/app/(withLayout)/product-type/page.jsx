/* Product Type Page */

import { getProductTypes } from "@/actions/productTypesActions";
import ProductTypes from "@/screens/product-type";

// export const revalidate = 120;

export default async function ProductTypeManagement() {
	const productTypes = await getProductTypes();

	return (
		<div>
			<ProductTypes productTypes={productTypes} />
		</div>
	);
}
