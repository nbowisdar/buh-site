import { db } from "@/db/index"
import { PriceInsert, price } from "@/db/schema"
import { createServerFn } from "@tanstack/react-start"
import { eq } from "drizzle-orm"

export const addPriceFunc = createServerFn({ method: "POST" })
	.inputValidator((data: PriceInsert) => data)
	.handler(async ({ data }) => {
		console.log("Server fn called with:", data)
		await db.insert(price).values(data)
	})

export const deletePriceFunc = createServerFn({ method: "POST" })
	.inputValidator((data: { id: number }) => data)
	.handler(async ({ data }) => {
		console.log("Server fn called with:", data)
		await db.delete(price).where(eq(price.id, data.id))
	})

export const getAllPriceFunc = createServerFn({ method: "GET" }).handler(async () => {
	console.log("Loading prices from server")
	const response = await db.select().from(price)
	return response
})

// Alias for compatibility with existing code, but functionally the same as getAllPriceFunc
export const getAllPriceFullFunc = getAllPriceFunc

export const addPriceFullFunc = createServerFn({ method: "POST" })
	.inputValidator((data: PriceInsert) => data)
	.handler(async ({ data }) => {
		console.log("Server fn called with:", data)
		await db.insert(price).values(data)
	})

export const updatePriceFullFunc = createServerFn({ method: "POST" })
	.inputValidator((data: { id: number } & Partial<PriceInsert>) => data)
	.handler(async ({ data }) => {
		console.log("Server fn called with:", data)
		const { id, ...updateData } = data
		await db.update(price).set(updateData).where(eq(price.id, id))
		return { success: true }
	})
