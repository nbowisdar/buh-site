import { getAllCommentFunc } from "@/lib/funcs/comments"
import { formatDate } from "@/lib/misk"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"

export const Route = createFileRoute("/feedback")({
	component: RouteComponent,
	loader: async () => {
		const feedbacks = await getAllCommentFunc()
		return { feedbacks } // just array, no wrapper object
	},
})

const ITEMS_PER_PAGE = 6

function RouteComponent() {
	const { feedbacks } = Route.useLoaderData()
	console.log(feedbacks, "feedbacks")
	const [currentPage, setCurrentPage] = useState(1)

	const totalPages = Math.ceil(feedbacks.length / ITEMS_PER_PAGE)
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
	const endIndex = startIndex + ITEMS_PER_PAGE
	const paginatedFeedbacks = feedbacks.slice(startIndex, endIndex)

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-6xl mx-auto px-4 py-20">
				<h1 className="text-5xl font-bold text-primary mb-12 text-balance">Відгуки клієнтів</h1>

				<div className="grid md:grid-cols-2 gap-8 mb-12">
					{paginatedFeedbacks.map((feedback) => (
						<div key={feedback.id} className="bg-card border border-border rounded-lg p-8">
							<div className="flex gap-1 mb-4">
								{[...Array(feedback.rating)].map((_, i) => (
									<span key={i} className="text-yellow-400">
										★
									</span>
								))}
								{[...Array(5 - feedback.rating)].map((_, i) => (
									<span key={i} className="text-gray-300">
										★
									</span>
								))}
							</div>
							<p className="text-foreground/80 mb-6 leading-relaxed">{feedback.text}</p>
							<p className="font-semibold text-primary">{feedback.name}</p>
							<p className="text-foreground/60">{feedback.company}</p>
							<p className="text-foreground/50 text-sm mt-2">{formatDate(feedback.createdAt)}</p>
						</div>
					))}
				</div>

				{totalPages > 1 && (
					<div className="flex items-center justify-center gap-4 mt-16">
						<button
							onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
							disabled={currentPage === 1}
							className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition"
						>
							Попередня
						</button>

						<div className="flex items-center gap-2">
							{Array.from({ length: totalPages }).map((_, i) => {
								const pageNum = i + 1
								return (
									<button
										key={pageNum}
										onClick={() => setCurrentPage(pageNum)}
										className={`w-10 h-10 rounded-md transition ${
											currentPage === pageNum
												? "bg-primary text-primary-foreground font-semibold"
												: "bg-border text-foreground hover:bg-primary/20"
										}`}
									>
										{pageNum}
									</button>
								)
							})}
						</div>

						<button
							onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
							disabled={currentPage === totalPages}
							className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition"
						>
							Наступна
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
