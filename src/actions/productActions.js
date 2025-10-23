"use server"

import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import path from "path"
import fs from "fs"
import { writeFile } from "fs/promises"
import { revalidatePath } from "next/cache"
import { jwtTokenVerification } from "./authActions"

// Constant
const UPLOAD_DIR = path.resolve("public/uploads") // For the case of nodejs/server, "/" always refers to root of the file system, not your project folder. resolve() combine the argument with root of project into absolute path.

// Create product
export async function createProduct(formData) {
	await jwtTokenVerification()

	// Prepare data
	const data = {
		productName: formData.get("productName"),
		description: formData.get("description"),
		sellPrice: formData.get("sellingPrice"),
		mrp: formData.get("mrp"),
		smallSizeStock: formData.get("smallSizeStock"),
		mediumSizeStock: formData.get("mediumSizeStock"),
		largeSizeStock: formData.get("largeSizeStock"),
		productTypeId: formData.get("productType"),
		isActive: formData.get("isActive"),
	}

	// Check if product type exists - The reason we do this despite the product type is chosen at select element is because users can tamper with requests. And the backend must validate all data. So it is all security and data integrity.
	const productType = await db.productType.findUnique({
		where: {
			id: parseInt(data.productTypeId)
		}
	})
	if (!productType) redirect("/product/add?errorMessage=Product Type not found. Please try different product type.")

	// Handling Image File
	const imageFile = formData.get("image")
	let imagePath = ""
	if (imageFile) {
		// Preparing the image file
		const binaryData = await imageFile.arrayBuffer() // convert to raw binary data
		const buffer = Buffer.from(binaryData) // Buffer handles binary data. This one creates buffer

		// Create directory, if does not exist
		if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR)

		// Prepare image filename and full path
		const imageFilename = Date.now() + path.extname(imageFile.name) // Date.now() returns current timestamp in milliseconds. path.extname() extracts file extension.
		imagePath = `uploads/${imageFilename}` // imagePath is needed to upload to db later
		const fullImagePath = path.join(process.cwd(), "public", imagePath)

		// Write the buffer to image full path
		await writeFile(fullImagePath, buffer)
	}

	// Handling Total Stocks
	const totalStock = parseInt(data.smallSizeStock) + parseInt(data.mediumSizeStock) + parseInt(data.largeSizeStock)

	// Create data into db
	await db.product.create({
		data: {
			name: data.productName,
			description: data.description,
			sellPrice: parseInt(data.sellPrice),
			mrp: parseFloat(data.mrp),
			image: imagePath,
			currentStock: totalStock,
			productTypeId: parseInt(data.productTypeId),
			isActive: data.isActive === "on" ? true : false,
			smallSize: parseInt(data.smallSizeStock),
			mediumSize: parseInt(data.mediumSizeStock),
			largeSize: parseInt(data.largeSizeStock)
		}
	})
	revalidatePath("/products", "page") // Update the page cache
	redirect("/products")
}

// Fetch all products
export async function getProducts() {
	await jwtTokenVerification()

	const products = await db.product.findMany({
		select: {
			id: true,
			name: true,
			description: true,
			sellPrice: true,
			mrp: true,
			image: true,
			currentStock: true,
			rating: true,
			isActive: true,
			productType: {
				select: {
					id: true,
					name: true
				}
			}
		},
		orderBy: {
			id: "asc"
		}
	})
	return products
}

// Fetch unique product
export async function getUniqueProduct(productId) {
	await jwtTokenVerification()

	const product = await db.product.findUnique({
		where: {
			id: parseInt(productId)
		},
		include: {
			productType: true
		}
	})
	return product
}

// Update db
export async function updateProduct(productId, existingImage, formData) {
	await jwtTokenVerification()

	// Prepare data
	const data = {
		productName: formData.get("productName"),
		description: formData.get("description"),
		sellPrice: formData.get("sellingPrice"),
		mrp: formData.get("mrp"),
		smallSizeStock: formData.get("smallSizeStock"),
		mediumSizeStock: formData.get("mediumSizeStock"),
		largeSizeStock: formData.get("largeSizeStock"),
		productTypeId: formData.get("productType"),
		isActive: formData.get("isActive"),
	}

	// Check if product type exists - The reason we do this despite the product type is chosen at select element is because users can tamper with requests. And the backend must validate all data. So it is all security and data integrity.
	const productType = await db.productType.findUnique({
		where: {
			id: parseInt(data.productTypeId)
		}
	})
	if (!productType) redirect("/product/add?errorMessage=Product Type not found. Please try different product type.")

	// Handling Image File
	const imageFile = formData.get("image")
	let imagePath = existingImage
	// imageFile.size > 0 indicates user uploads new image
	if (imageFile && imageFile.size > 0) {
		// Preparing the image file
		const binaryData = await imageFile.arrayBuffer() // convert to raw binary data
		const buffer = Buffer.from(binaryData) // Buffer handles binary data. This one creates buffer

		// Create directory, if does not exist
		if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR)

		// Prepare image filename and full path
		const imageFilename = Date.now() + path.extname(imageFile.name) // Date.now() returns current timestamp in milliseconds. path.extname() extracts file extension.
		imagePath = `uploads/${imageFilename}` // imagePath is needed to upload to db later
		const fullImagePath = path.join(process.cwd(), "public", imagePath)

		// Write the buffer to image full path
		await writeFile(fullImagePath, buffer)

		// Delete old image file
		await handleDeleteImage(existingImage)
	}

	// Handling Total Stocks
	const totalStock = parseInt(data.smallSizeStock) + parseInt(data.mediumSizeStock) + parseInt(data.largeSizeStock)

	// Update data into db
	await db.product.update({
		where: {
			id: parseInt(productId)
		},
		data: {
			name: data.productName,
			description: data.description,
			sellPrice: parseInt(data.sellPrice),
			mrp: parseFloat(data.mrp),
			image: imagePath,
			currentStock: totalStock,
			productTypeId: parseInt(data.productTypeId),
			isActive: data.isActive === "on" ? true : false,
			smallSize: parseInt(data.smallSizeStock),
			mediumSize: parseInt(data.mediumSizeStock),
			largeSize: parseInt(data.largeSizeStock)
		}
	})
	revalidatePath("/products", "page") // Update the page cache
	redirect("/products")
}

// Delete image file
export async function handleDeleteImage(imagePath) {
	await jwtTokenVerification()

	if (imagePath) {
		const existingImageFullPath = path.join(process.cwd(), "public", imagePath)
		if (fs.existsSync(existingImageFullPath)) fs.unlinkSync(existingImageFullPath) // Delete the file
	}
}

// Delete product
export async function deleteProduct(product) {
	await jwtTokenVerification()

	await Promise.all([
		db.product.delete({
			where: {
				id: parseInt(product.id)
			}
		}),
		handleDeleteImage(product.image)
	])
	revalidatePath("/products", "page")
}