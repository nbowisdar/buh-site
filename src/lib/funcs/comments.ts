import { db } from "@/db/index"
import { type CommentInsert, comments, feedbackLinks } from "@/db/schema"
import { createServerFn } from "@tanstack/react-start"
import { eq } from "drizzle-orm"

export const addCommentFunc = createServerFn({ method: "POST" })
	.inputValidator((data: CommentInsert & { token: string }) => data)
	.handler(async ({ data }) => {
		const tasks = []
		tasks.push(db.insert(comments).values(data))
		tasks.push(db.update(feedbackLinks).set({ is_used: true }).where(eq(feedbackLinks.token, data.token)))
		await Promise.all(tasks)
	})

export const deleteCommentFunc = createServerFn({ method: "POST" })
	.inputValidator((data: { id: number }) => data)
	.handler(async ({ data }) => {
		console.log("Server fn called with:", data)
		await db.delete(comments).where(eq(comments.id, data.id))
	})

export const getAllCommentFunc = createServerFn({ method: "GET" }).handler(async () => {
	return await db.select().from(comments)
})
