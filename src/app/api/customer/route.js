import { db } from "@/lib/db";
import { verifyJWT } from "@/lib/token";
import { NextResponse } from "next/server";

export async function GET(req) {
	try {
		// Verify token
		const token = req?.cookies?.get("customer_jwt_token")?.value
		const decodedToken = await verifyJWT(token)
		// If failed
		if (!decodedToken) {
			return NextResponse.json(
				{
					message: "Unauthorized."
				},
				{
					status: 401
				}
			)
		}

		const customerData = await db.buyerMaster.findUnique({
			where: {
				email: decodedToken.email
			}
		})
		return NextResponse.json(
			{
				message: "Customer's data fetched successfully.",
				data: customerData
			}
		)
	} catch (error) {
		return NextResponse.json(
			{
				message: "Something Went Wrong.",
				error: error.message
			},
			{
				status: 500
			}
		)
	}
}