import { db } from "@/db/index"
import { CommentInsert, comments } from "@/db/schema"
import { createServerFn } from "@tanstack/react-start"
import { eq } from "drizzle-orm"

export const addCommentFunc = createServerFn({ method: "POST" })
	.inputValidator((data: CommentInsert) => data)
	.handler(async ({ data }) => {
		console.log("Server fn called with:", data)
		await db.insert(comments).values(data)
	})

export const deleteCommentFunc = createServerFn({ method: "POST" })
	.inputValidator((data: { id: number }) => data)
	.handler(async ({ data }) => {
		console.log("Server fn called with:", data)
		await db.delete(comments).where(eq(comments.id, data.id))
	})

export const getAllCommentFunc = createServerFn({ method: "GET" }).handler(async () => {
	console.log("Loading comments from server")
	const response = await db.select().from(comments)
	return response[0]
})
