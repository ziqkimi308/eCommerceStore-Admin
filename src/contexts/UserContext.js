"use client"

import { getUserData } from "@/actions/authActions"
import { createContext, useContext, useState } from "react"

// 1️⃣ Create context
const UserContext = createContext()

// 2️⃣ Provider wrapped with custom wrapper
export function UserProvider({ children, initialUserData }) {
	const [userData, setUserData] = useState(initialUserData)
	const [isLoading, setIsLoading] = useState(false)

	// Refesh user data if needed
	const refreshUserData = async () => {
		setIsLoading(true)
		try {
			const data = await getUserData()
			setUserData(data)
		} catch (error) {
			console.error("Failed to fetch user data", error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<UserContext.Provider value={{ userData, isLoading, refreshUserData }}>
			{children}
		</UserContext.Provider>
	)
}

// 3️⃣ Use Context wrapped with custom wrapper
export function useUser() {
	const context = useContext(UserContext)
	if (!context) {
		throw new Error("useUser must be used within UserProvider")
	}

	return context
}