import { getBuyers } from "@/actions/buyerActions";
import Buyers from "@/screens/buyers";

// export const revalidate = 30

export default async function BuyersPage() {
	const buyers = await getBuyers()

	return (
		<><Buyers buyers={buyers} /></>
	)
}