import { db } from "@/db/index"
import { CommentInsert, comments } from "@/db/schema"
import { createServerFn } from "@tanstack/react-start"

export const addCommentFunc = createServerFn({ method: "POST" })
	.inputValidator((data: CommentInsert) => data)
	.handler(async ({ data }) => {
		console.log("Server fn called with:", data)
		await db.insert(comments).values(data).returning()
	})
