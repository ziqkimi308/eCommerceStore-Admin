"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation" // Makes sure import from this path! 
import { jwtTokenVerification } from "./authActions"
import { getCached, setCached } from "@/lib/cache"

// Create data in db
export async function createProductType(formData) {
	await jwtTokenVerification()
	
	// Prepare data from html form
	const data = {
		name: formData.get("productType")
	}

	// Check existing data
	const existingProductType = await db.productType.findUnique({
		where: {
			name: data.name
		}
	})
	if (existingProductType) {
		return redirect("/product-type/add?errorMessage=Product Type already exists.")
	}

	// Create data in db
	await db.productType.create({
		data: {
			name: data.name
		}
	})
	revalidatePath("/product-type", "page") // Update page cache
	redirect("/product-type")
}

// Fetch all data from db
export async function getProductTypes() {
	await jwtTokenVerification()

	const cacheKey = "product-types"
	// Check cache
	const cached = getCached(cacheKey)
	if (cached) {
		console.log("✅ Product types from cache")
		return cached
	}
	
	const productTypes = await db.productType.findMany({
		select: {
			id: true,
			name: true
		},
		orderBy: {
			name: "asc"
		}
	})

	// Store cache for 10 minutes (1000 here is milliseconds)
	setCached(cacheKey, productTypes, 1000 * 60 * 10)
	console.log("📦 Product types cached")

	return productTypes
}

// Fetch unique data from db
export async function getUniqueProductType(productTypeId) {
	await jwtTokenVerification()

	const productTypes = await db.productType.findUnique({
		where: {
			id: parseInt(productTypeId)
		}
	})
	return productTypes
}

// Update data in db
export async function updateProductType(productTypeId, formData) {
	await jwtTokenVerification()

	// Prepare data from html form
	const data = {
		name: formData.get("productType")
	}

	// Update db
	await db.productType.update({
		where: {
			id: productTypeId
		},
		data: {
			name: data.name
		}
	})
	revalidatePath("/product-type", "page")
	redirect("/product-type")
}

// Delete data from db
export async function deleteProductType(productTypeId) {
	await jwtTokenVerification()

	await db.productType.delete({
		where: {
			id: productTypeId
		}
	})
	revalidatePath("/product-type", "page")
}