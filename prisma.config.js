import { defineConfig } from "prisma/config"
import dotenv from "dotenv"

dotenv.config()

export default defineConfig({
	"seed": "node prisma/seed.js"
})