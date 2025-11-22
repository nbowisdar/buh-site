import { db } from "@/db/index"
import { PriceFull, PriceInsert, PriceRow, PriceRowInsert, price, priceRow } from "@/db/schema"
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
	return await db.select().from(priceRow)
})

export const addPriceFullFunc = createServerFn({ method: "POST" })
	.inputValidator((data: PriceFull) => data)
	.handler(async ({ data }) => {
		console.log("Server fn called with:", data)
		const res = await db.insert(price).values({ title: data.title }).returning()
		const priceId = res[0].id
		const rows = data.rows.map((row) => ({ ...row, priceId }))
		await db.insert(priceRow).values(rows)
	})

export const getAllPriceFullFunc = createServerFn({ method: "GET" }).handler(async () => {
	// const rows = await db.select().from(price).leftJoin(priceRow, eq(price.id, priceRow.priceId))
	return await db.query.price.findMany({
		with: {
			rows: true,
		},
	})
})


