import { db } from "@/lib/db";
import { NextResponse } from "next/server";
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
		if (existingCustomer) {
			return NextResponse.json(
				{
					message: "User with this email already exists."
				},
				{
					status: 409
				}
			)
		}

		// Create new user
		const salt = await bcrypt.genSalt(5)
		const hashedPassword = await bcrypt.hash(data.password, salt)

		// Create user in db
		const newCustomer = await db.buyerMaster.create({
			data: {
				customerName: data.name,
				email: data.email,
				password: hashedPassword
			}
		})

		// Create token for this signed up session
		// We should not include sensitive details like password into token creation
		const tokenPayload = {
			id: newCustomer.id,
			customerName: newCustomer.customerName,
			email: newCustomer.email
		}
		const token = await createJWT(tokenPayload)

		// Return statement
		return NextResponse.json(
			{
				message: "User created successfully.",
				data: newCustomer,
				token: token
			},
		)
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