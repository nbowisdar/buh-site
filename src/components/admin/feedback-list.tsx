import { deleteCommentFunc } from "@/lib/funcs/comments"
import { formatDate } from "@/lib/misk"
import { useLoaderData, useRouter } from "@tanstack/react-router"

export function FeedbackList() {
	const { comments } = useLoaderData({ from: "/admin" })
	const router = useRouter()
	const handleDeleteFeedback = async (id: number) => {
		if (confirm("Ви впевнені, що хочете видалити цей відгук?")) {
			await deleteCommentFunc({ data: { id } })
			router.invalidate()
		}
	}

	return (
		<div className="bg-card border border-border rounded-lg overflow-hidden">
			<div className="p-6 bg-primary/5 border-b border-border">
				<h2 className="text-xl font-semibold text-foreground">Всього відгуків: {comments.length}</h2>
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
						{comments.length > 0 ? (
							comments.map((comment) => (
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
									Немає відгуків для відображення
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}
