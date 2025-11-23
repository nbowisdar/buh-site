import { db } from "@/db/index"
import { type FeedbackLinkInsert, feedbackLinks } from "@/db/schema"
import { createServerFn } from "@tanstack/react-start"
import { and, eq } from "drizzle-orm"

export const addFeedbackFunc = createServerFn({ method: "POST" })
	.inputValidator((data: FeedbackLinkInsert) => data)
	.handler(async ({ data }) => {
		await db.insert(feedbackLinks).values(data)
	})

export const deleteFeedbackFunc = createServerFn({ method: "POST" })
	.inputValidator((data: { id: number }) => data)
	.handler(async ({ data }) => {
		await db.delete(feedbackLinks).where(eq(feedbackLinks.id, data.id))
	})

export const getAllFeedbackFunc = createServerFn({ method: "GET" }).handler(async () => {
	return await db.select().from(feedbackLinks)
})

export const updateStatusFeedbackFunc = createServerFn({ method: "POST" })
	.inputValidator((data: { id: number; status: boolean }) => data)

	.handler(async ({ data: { id, status } }) => {
		await db.update(feedbackLinks).set({ is_used: status }).where(eq(feedbackLinks.id, id))
	})

export const generateFeedbackFunc = createServerFn({ method: "POST" }).handler(async () => {
	const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
	await db.insert(feedbackLinks).values({ token })
})

export const checkTokenFunc = createServerFn({ method: "GET" })
	.inputValidator((token: string) => token)
	.handler(async ({ data: token }) => {
		const resp = await db
			.select()
			.from(feedbackLinks)
			.where(and(eq(feedbackLinks.token, token), eq(feedbackLinks.is_used, false)))

		if (resp.length > 0) {
			return true
		}
		return false
	})

export const setTokenIsUsedFunc = createServerFn({ method: "GET" })
	.inputValidator((token: string) => token)
	.handler(async ({ data: token }) => {
		await db.update(feedbackLinks).set({ is_used: true }).where(eq(feedbackLinks.token, token))
	})
