/* Product Page */

import { getProducts } from "@/actions/productActions";
import Products from "@/screens/products";

// export const revalidate = 30;

export default async function ProductsManagement() {
	// Fetch products
	const products = await getProducts();

	return (
		<>
			<Products products={products} />
		</>
	);
}
