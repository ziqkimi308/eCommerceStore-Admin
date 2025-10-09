import { getBuyers } from "@/actions/buyerActions";
import Buyers from "@/screens/buyers";

export default async function BuyersPage() {
	const buyers = await getBuyers()

	return (
		<><Buyers buyers={buyers} /></>
	)
}