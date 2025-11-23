import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

const VITE_DATABASE_URL =
	"postgresql://neondb_owner:npg_rb3YPyVv1Zwh@ep-autumn-tree-agi6f306.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

const sql = neon(VITE_DATABASE_URL)

export const db = drizzle(sql, { schema })
