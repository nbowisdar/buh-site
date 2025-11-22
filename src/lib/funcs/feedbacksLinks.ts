import { db } from "@/db/index"
import { type FeedbackLinkInsert, feedbackLinks } from "@/db/schema"
import { createServerFn } from "@tanstack/react-start"
import { eq } from "drizzle-orm"

export const addFeedbackFunc = createServerFn({ method: "POST" })
	.inputValidator((data: FeedbackLinkInsert) => data)
	.handler(async ({ data }) => {
		console.log("Server fn called with:", data)
		await db.insert(feedbackLinks).values(data)
	})

export const deleteFeedbackFunc = createServerFn({ method: "POST" })
	.inputValidator((data: { id: number }) => data)
	.handler(async ({ data }) => {
		console.log("Server fn called with:", data)
		await db.delete(feedbackLinks).where(eq(feedbackLinks.id, data.id))
	})

export const getAllFeedbackFunc = createServerFn({ method: "GET" }).handler(async () => {
	console.log("Loading feedbackLinks from server")
	return await db.select().from(feedbackLinks)
})

export const updateStatusFeedbackFunc = createServerFn({ method: "POST" })
	.inputValidator((data: { id: number; status: boolean }) => data)

	.handler(async ({ data: { id, status } }) => {
		const result = await db.update(feedbackLinks).set({ is_used: status }).where(eq(feedbackLinks.id, id))
		console.log(result)
	})

export const generateFeedbackFunc = createServerFn({ method: "POST" }).handler(async () => {
	const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
	await db.insert(feedbackLinks).values({ token })
})
