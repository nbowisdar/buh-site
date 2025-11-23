import { deleteCommentFunc } from "@/lib/funcs/comments"
import { formatDate } from "@/lib/misk"
import { useLoaderData, useRouter } from "@tanstack/react-router"
import { Search } from "lucide-react"
import { useState } from "react"

export function FeedbackList() {
	const { comments } = useLoaderData({ from: "/admin" })
	const router = useRouter()
	const [searchTerm, setSearchTerm] = useState("")
	const [limit, setLimit] = useState(10)

	const handleDeleteFeedback = async (id: number) => {
		if (confirm("Ви впевнені, що хочете видалити цей відгук?")) {
			await deleteCommentFunc({ data: { id } })
			router.invalidate()
		}
	}

	const filteredComments = comments.filter((comment) => {
		const searchLower = searchTerm.toLowerCase()
		return (
			comment.name.toLowerCase().includes(searchLower) ||
			comment.company?.toLowerCase().includes(searchLower) ||
			comment.text?.toLowerCase().includes(searchLower)
		)
	})

	const displayedComments = filteredComments.slice(0, limit)

	return (
		<div className="bg-card border border-border rounded-lg overflow-hidden">
			<div className="p-6 bg-primary/5 border-b border-border flex flex-col md:flex-row justify-between items-center gap-4">
				<h2 className="text-xl font-semibold text-foreground">Всього відгуків: {comments.length}</h2>
				<div className="relative w-full md:w-64">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<Search className="h-4 w-4 text-muted-foreground" />
					</div>
					<input
						type="text"
						placeholder="Пошук відгуків..."
						className="pl-10 w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-primary/10 border-b border-border">
						<tr>
							<th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Ім'я</th>
							<th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Компанія</th>
							<th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Оцінка</th>
							<th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Дата</th>
							<th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Відгук</th>
							<th className="px-6 py-3 text-center text-sm font-semibold text-foreground">Дія</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-border">
						{displayedComments.length > 0 ? (
							displayedComments.map((comment) => (
								<tr key={comment.id} className="hover:bg-primary/5 transition">
									<td className="px-6 py-4 text-sm text-foreground">{comment.name}</td>
									<td className="px-6 py-4 text-sm text-foreground">{comment.company}</td>
									<td className="px-6 py-4 text-sm">
										<span className="text-yellow-500">{"★".repeat(comment.rating)}</span>
									</td>
									<td className="px-6 py-4 text-sm text-foreground/70">{formatDate(comment.createdAt)}</td>
									<td className="px-6 py-4 text-sm text-foreground/80 max-w-xs truncate">{comment.text?.substring(0, 50)}...</td>
									<td className="px-6 py-4 text-sm text-center">
										<button
											onClick={() => handleDeleteFeedback(comment.id)}
											className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded transition"
										>
											Видалити
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={6} className="px-6 py-8 text-center text-foreground/60">
									{searchTerm ? "Нічого не знайдено" : "Немає відгуків для відображення"}
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
			{filteredComments.length > limit && (
				<div className="p-4 text-center border-t border-border">
					<button
						onClick={() => setLimit((prev) => prev + 10)}
						className="text-primary hover:text-primary/80 font-semibold transition"
					>
						Завантажити ще
					</button>
				</div>
			)}
		</div>
	)
}
