import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
	try {
		const productTypes = await db.productType.findMany()

		return NextResponse.json({
			status: 200,
			message: "Product Types fetched successfully!",
			data: productTypes
		})
	} catch (err) {
		return NextResponse.json({
			message: "Something Went Wrong.",
			error: err.message,
		}, {
			status: 500
		})
	}
}