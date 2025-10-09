import { getUniqueProductType } from "@/actions/productTypesActions";
import EditProductType from "@/screens/product-type/edit";

export default async function EditProductTypePage({ params, searchParams }) {
	const {productTypeId} = await params
	const productType = await getUniqueProductType(productTypeId);

	return (
		<>
			<EditProductType searchParams={searchParams} productType={productType} params={params} />
		</>
	);
}
