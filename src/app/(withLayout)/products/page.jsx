import { getProducts } from "@/actions/productActions";
import Products from "@/screens/products";

export default async function ProductsManagement() {
	// Fetch products
	const products = await getProducts();

	return (
		<>
			<Products products={products} />
		</>
	);
}
