import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
	try {
		// Filter
		const { searchParams } = new URL(request.url)
		const filters = {
			productTypeId: searchParams.get("productTypeId"),
			sortBy: searchParams.get("sortBy"),
			minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
			maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
			rating: searchParams.get("rating") !== null ? Number(searchParams.get("rating")) : undefined,
			inStock: searchParams.get("inStock") ? searchParams.get("inStock") : undefined,
			search: searchParams.get("search")
		}

		const whereClause = {
			// spread operator spread the key and value inside an object without insert object itself
			...(filters.productTypeId ? { productTypeId: Number(filters.productTypeId) } : {}),
			...(filters.minPrice || filters.maxPrice ? {
				sellPrice: {
					gte: filters.minPrice || undefined,
					lte: filters.maxPrice || undefined
				}
			} : {}),
			// this one ignores only undefined but allow the rest of falsy
			...(filters.rating !== undefined ? { rating: filters.rating } : {}),
			...(filters.inStock === "true" ? { currentStock: { gt: 0 } } : filters.inStock === "false" ? { currentStock: 0 } : {}),
			...(filters.search ? {
				name: {
					contains: filters.search.toLocaleLowerCase()
				}
			} : {})
		}
		// orderBy is setup like this because prisma does not allow undefined for where clause
		const orderBy = {};
		if (filters.sortBy === "sellPrice") orderBy.sellPrice = "asc";
		if (filters.sortBy === "-sellPrice") orderBy.sellPrice = "desc";

		const products = await db.product.findMany({
			include: {
				productType: true
			},
			where: { ...whereClause, isActive: true },
			...(Object.keys(orderBy).length > 0 && { orderBy }),
		})

		return NextResponse.json({
			status: 200,
			message: "Products fetched successfully!",
			data: products
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