/* jwtTokenVerification() should stay in authActions.js because it’s not just about JWTs — it also handles cookies and redirects, which are part of the authentication flow, not pure token logic. */

"use server"

import { db } from "@/lib/db"
import { createJWT, verifyJWT } from "@/lib/token"
import bcrypt from "bcrypt"
import { redirect } from "next/navigation"
import { deleteCookies } from "@/middleware"
import { getCookie, setCookie } from "@/lib/cookies"

export async function loginUser(formData) {
	// Santize data
	const data = {
		userName: formData.get("userName"),
		password: formData.get("password")
	}

	// Fetch data from db
	const user = await db.adminUser.findUnique({
		where: {
			userName: data.userName
		}
	})

	if (!user) {
		return redirect(`/login?errorMessage=Invalid credentials. Please try again.`)
	}

	// Compare hash
	const isValidPassword = await bcrypt.compare(data.password, user?.password) // bcrypt.compare is strict, it requires both arguments to be non-empty strings.

	if (!isValidPassword) {
		return redirect(`/login?errorMessage=Invalid credentials. Please try again.`)
	}

	const token = await createJWT(user)
	await setCookie("jwt_token", token, { maxAge: 2 * 60 * 60 })
	redirect("/")
}

// Verify token in cookies or redirect to login
export async function jwtTokenVerification() {
	const token = await getCookie("jwt_token")
	const tokenData = await verifyJWT(token)
	if (!tokenData) {
		await deleteCookies("jwt_token")
		return redirect("/login")
	}

	return tokenData
}

// Verify token in cookies and fetch user data
export async function getUserData() {
	const decodedToken = await jwtTokenVerification()
	const userData = await db.adminUser.findUnique({
		where: {
			id: decodedToken.id
		}
	})

	return userData
}

// logout user
export async function logoutUser() {
	await deleteCookies("jwt_token")
	redirect("/login")
}