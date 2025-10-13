import { PrismaClient } from "@/generated/prisma";

let db;

if (process.env.NODE_ENV === "production") {
	db = new PrismaClient();
} else {
	// Prevent multiple instances during dev/hot reload
	if (!global.db) {
		global.db = new PrismaClient();
	}
	db = global.db;
}

export { db };
