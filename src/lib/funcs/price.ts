import { db } from "@/db/index"
import { PriceInsert, PriceRowInsert, price, priceRow } from "@/db/schema"
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

export const addPriceRowFunc = createServerFn({ method: "POST" })
	.inputValidator((data: PriceRowInsert) => data)
	.handler(async ({ data }) => {
		console.log("Server fn called with:", data)
		await db.insert(priceRow).values(data)
	})

export const deletePriceRowFunc = createServerFn({ method: "POST" })
	.inputValidator((data: { id: number }) => data)
	.handler(async ({ data }) => {
		console.log("Server fn called with:", data)
		await db.delete(priceRow).where(eq(priceRow.id, data.id))
	})

export const getAllPriceRowFunc = createServerFn({ method: "GET" }).handler(async () => {
	console.log("Loading price rows from server")
	const response = await db.select().from(priceRow)
	return response
})
