export const formatDate = (timestamp: number | Date | null) => {
	if (!timestamp) return ""
	const date = new Date(timestamp)
	return date.toLocaleDateString("uk-UA", {
		year: "numeric",
		month: "long",
		day: "numeric",
	})
}
