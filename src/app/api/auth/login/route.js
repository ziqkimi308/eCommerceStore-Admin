import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcrypt"
import { createJWT } from "@/lib/token";

export async function POST(req) {
	try {
		const data = await req.json()

		// Check for existing user
		const existingCustomer = await db.buyerMaster.findUnique({
			where: {
				email: data.email
			}
		})
		// If does not exist
		if (!existingCustomer) {
			return NextResponse.json(
				{
					message: "User not found.",
				},
				{
					status: 404
				}
			)
		}
		// If exists
		const isValidPassword = await bcrypt.compare(data.password, existingCustomer.password)
		// If password does not match
		if (!isValidPassword) {
			return NextResponse.json(
				{
					message: "Invalid credentials. Please try again."
				},
				{
					status: 401
				}
			)
		}

		// Create token for this login session
		const tokenPayload = {
			id: existingCustomer.id,
			customerName: existingCustomer.customerName,
			email: existingCustomer.email
		}
		const token = await createJWT(tokenPayload)

		return NextResponse.json(
			{
				message: "Login Successful.",
				data: existingCustomer,
				token: token
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