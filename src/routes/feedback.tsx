import Footer from "@/components/footer"

import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"
export const Route = createFileRoute("/feedback")({
	component: RouteComponent,
})

interface Feedback {
	id: string
	name: string
	company: string
	rating: number
	text: string
	timestamp: number
}

const ITEMS_PER_PAGE = 6

function RouteComponent() {
	const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
	const [feedbackEnabled, setFeedbackEnabled] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		const enabled = localStorage.getItem("feedbackEnabled")
		if (enabled !== null) {
			setFeedbackEnabled(JSON.parse(enabled))
		}

		const stored = localStorage.getItem("feedbacks")
		if (stored) {
			setFeedbacks(JSON.parse(stored))
		} else {
			const initialFeedbacks: Feedback[] = [
				{
					id: "1",
					name: "Іван Петренко",
					company: "ТОВ 'Інноваційні рішення'",
					rating: 5,
					text: '"Вражаючий рівень обслуговування! Команда професіонально розібралася з нашою бухгалтерією за короткий час. Безумовно рекомендую!"',
					timestamp: Date.now() - 86400000 * 30,
				},
				{
					id: "2",
					name: "Ольга Сидоренко",
					company: "ФОП",
					rating: 5,
					text: '"Дякуємо за чіткі консультації та своєчасне опрацювання документів. Надійні партнери для нашого розвитку!"',
					timestamp: Date.now() - 86400000 * 20,
				},
				{
					id: "3",
					name: "Сергій Коваленко",
					company: "МСП",
					rating: 5,
					text: '"Кваліфікована команда спеціалістів. Завжди готові дати розумну консультацію і допомогти з оптимізацією витрат."',
					timestamp: Date.now() - 86400000 * 10,
				},
				{
					id: "4",
					name: "Марія Демченко",
					company: "ООО 'Логістика+'",
					rating: 5,
					text: '"Найкраще рішення для автоматизації обліку. Команда постійно оновлює свої знання відповідно до змін законодавства."',
					timestamp: Date.now() - 86400000 * 5,
				},
			]
			setFeedbacks(initialFeedbacks)
			localStorage.setItem("feedbacks", JSON.stringify(initialFeedbacks))
		}
	}, [])

	const handleLeaveReview = () => {
        console.log("Leave page");
        
		// router.push("/leave-feedback")
	}

	const formatDate = (timestamp: number) => {
		const date = new Date(timestamp)
		return date.toLocaleDateString("uk-UA", { year: "numeric", month: "long", day: "numeric" })
	}

	const totalPages = Math.ceil(feedbacks.length / ITEMS_PER_PAGE)
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
	const endIndex = startIndex + ITEMS_PER_PAGE
	const paginatedFeedbacks = feedbacks.slice(startIndex, endIndex)

	return (
		
			
			<div className="min-h-screen bg-background">
				<div className="max-w-6xl mx-auto px-4 py-20">
					<div className="mb-20">
						<h2 className="text-3xl font-bold text-primary mb-8">Залишити відгук</h2>
						<div className="bg-card border border-border rounded-lg p-8 max-w-2xl">
							{!feedbackEnabled ? (
								<div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md">
									⚠️ На даний момент форма для відгуків недоступна. Будь ласка, зв'яжіться з нами через{" "}
									<a href="/contact" className="underline font-semibold">
										форму контакту
									</a>
									.
								</div>
							) : (
								<div className="text-center">
									<p className="text-foreground/80 mb-6">Нам дуже важливо ваша думка! Поділіться своїм досвідом роботи з нами.</p>
									<button
										onClick={handleLeaveReview}
										className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-md transition"
									>
										Залишити відгук
									</button>
								</div>
							)}
						</div>
					</div>

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
								<p className="text-foreground/50 text-sm mt-2">{formatDate(feedback.timestamp)}</p>
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
