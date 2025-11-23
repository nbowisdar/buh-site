import { defineConfig } from "drizzle-kit"

// config();

const VITE_DATABASE_URL =
	"postgresql://neondb_owner:npg_rb3YPyVv1Zwh@ep-autumn-tree-agi6f306.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

export default defineConfig({
	out: "./drizzle",
	schema: "./src/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		// url: process.env.VITE_DATABASE_URL!,
		url: VITE_DATABASE_URL,
	},
})
