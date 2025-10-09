"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import bcrypt from "bcrypt"
import { jwtTokenVerification } from "./authActions"

// Create User
export async function createUser(formData) {
	await jwtTokenVerification()

	// Prepare data from formData from html input form
	const data = {
		userName: formData.get("userName"),
		userType: formData.get("userType"),
		password: formData.get("password"),
		confirmPassword: formData.get("confirmPassword")
	}

	// Check if confirmPassword is wrong
	if (data.password !== data.confirmPassword) return redirect(`/users/add?errorMessage=Passwords do not match.`)

	// Check if user already existed
	const existingUser = await db.adminUser.findUnique({
		where: {
			userName: data.userName
		}
	})
	if (existingUser) return redirect("/users/add?errorMessage=Username already exists.")

	// Salt and hash password
	const salt = await bcrypt.genSalt(5);
	const hashedPassword = await bcrypt.hash(data.password, salt)

	// Create db
	await db.adminUser.create({
		data: {
			userName: data.userName,
			userType: data.userType,
			password: hashedPassword
		}
	})

	revalidatePath("/users", "page") // Update page cache
	redirect("/users")
}

// Fetch All Users
export const getUsers = async () => {
	await jwtTokenVerification()

	const users = await db.adminUser.findMany()
	return users
}

// Fetch Unique User
export const getUniqueUser = async (userId) => {
	await jwtTokenVerification()

	const user = await db.adminUser.findUnique({
		where: {
			id: userId
		}
	})
	return user
}

// Update User
export const updateUser = async (userId, formData) => {
	await jwtTokenVerification()

	// Prepare data from formData from html input form
	const data = {
		userName: formData.get("userName"),
		userType: formData.get("userType"),
		password: formData.get("password")
	}

	// Salt and hash password
	let hashedPassword
	if (data.password) {
		const salt = await bcrypt.genSalt(5);
		hashedPassword = await bcrypt.hash(data.password, salt)
	}

	await db.adminUser.update({
		where: {
			id: userId
		},
		data: {
			userType: data.userType,
			userName: data.userName,
			...(hashedPassword && { password: hashedPassword })
		}
	})
	revalidatePath("/users", "page")
	redirect("/users")
}

// Delete user
export async function deleteUser(userId) {
	await jwtTokenVerification()

	await db.adminUser.delete({
		where: {
			id: userId
		}
	})
	revalidatePath("/users", "page")
}