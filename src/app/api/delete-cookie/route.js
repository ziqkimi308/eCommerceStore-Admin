import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
	const cookieStore = cookies()
	cookieStore.delete("jwt_token")

	return NextResponse.json({ message: "Cookie deleted!" })
}