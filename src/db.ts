import { neon } from '@neondatabase/serverless'

let client: ReturnType<typeof neon>

const VITE_DATABASE_URL =
	"postgresql://neondb_owner:npg_rb3YPyVv1Zwh@ep-autumn-tree-agi6f306.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

export async function getClient() {
	if (!VITE_DATABASE_URL) {
		return undefined
	}
	if (!client) {
		client = await neon(VITE_DATABASE_URL)
	}
	return client
}
