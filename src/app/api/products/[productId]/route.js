import { db } from "@/lib/db"
import { NextResponse } from "next/server"


export async function GET(request, { params }) {
	try {
		const productId = params.productId

		const product = await db.product.findUnique({
			include: {
				productType: true
			},
			where: {
				id: Number(productId),
				isActive: true
			}
		})
		if (!product) {
			return NextResponse.json(
				{
					message: "Product Not Found."
				},
				{
					status: 404
				}
			)
		}
		return NextResponse.json({
			message: "Product details fetched successfully!",
			data: product
		})
	} catch (err) {
		return NextResponse.json(
			{
				message: "Something Went Wrong.",
				error: err.message
			},
			{
				status: 500
			}
		)
	}
}