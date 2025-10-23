import { PrismaClient } from "@/generated/prisma";

// To stop making multiple prisma instance while it is active
const globalForPrisma = globalThis

if (!globalForPrisma.prisma) {
	globalForPrisma.prisma = new PrismaClient({
		log: process.env.NODE_ENV === 'development' ? ['error', 'warn']: ['error'],
		datasources: {
			db: {
				url: process.env.DATABASE_URL
			}
		}
	})
}

const db = globalForPrisma.prisma

export {db}
