import { createServerFn } from "@tanstack/react-start"

export const loginFunc = createServerFn({ method: "POST" })
	.inputValidator((data: { password: string }) => data)
	.handler(async ({ data }) => {
		if (data.password === process.env.ADMIN_PASSWORD) {
			return true
		}
		return false
	})
