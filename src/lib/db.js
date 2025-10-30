import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis;

if (!globalForPrisma.prisma) {
	globalForPrisma.prisma = new PrismaClient({
		log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
		// No datasource override — uses schema.prisma
	});
}

const db = globalForPrisma.prisma;

export { db };
