import bcrypt from "bcrypt"
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
	const existing = await prisma.adminUser.findUnique({
		where: { userName: "superadmin" },
	});

	if (!existing) {
		const hashedPassword = await bcrypt.hash("12345678", 5)
		await prisma.adminUser.create({
			data: {
				userName: "superadmin",
				password: hashedPassword,
				userType: "super admin",
			},
		});
		console.log("✅ Superadmin seeded.");
	} else {
		console.log("ℹ️ Superadmin already exists.");
	}
}

main()
	.catch((e) => {
		console.error("❌ Seeding failed:", e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
