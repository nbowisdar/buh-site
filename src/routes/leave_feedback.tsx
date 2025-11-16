import { CommentInsert } from "@/db/schema"
import { addCommentFunc } from "@/lib/funcs/comments"
import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"

export const Route = createFileRoute("/leave_feedback")({
	component: RouteComponent,
})

function RouteComponent() {
	const [feedbackEnabled, setFeedbackEnabled] = useState(true)
	const [feedbacks, setFeedbacks] = useState<CommentInsert[]>([])
	const [formData, setFormData] = useState({ name: "", company: "", rating: 5, text: "" })
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitMessage, setSubmitMessage] = useState("")
	const [userHasPermission, setUserHasPermission] = useState(false)
	const [loading, setLoading] = useState(true)
	const [existingFeedback, setExistingFeedback] = useState<CommentInsert | null>(null)
	const [userId, setUserId] = useState("")

	useEffect(() => {
		let storedUserId = localStorage.getItem("userId")
		if (!storedUserId) {
			storedUserId = `user_${Date.now()}_${Math.random().toString(36).substring(7)}`
			localStorage.setItem("userId", storedUserId)
		}
		setUserId(storedUserId)

		const enabled = localStorage.getItem("feedbackEnabled")
		if (enabled !== null) setFeedbackEnabled(JSON.parse(enabled))

		const stored = localStorage.getItem("feedbacks")
		if (stored) {
			const allFeedbacks = JSON.parse(stored)
			setFeedbacks(allFeedbacks)

			const userFeedback = allFeedbacks.find((f: CommentInsert) => f.userId === storedUserId)
			if (userFeedback) {
				setExistingFeedback(userFeedback)
				setFormData({
					name: userFeedback.name,
					company: userFeedback.company,
					rating: userFeedback.rating,
					text: userFeedback.text,
				})
			}
		}

		const contactId = new URLSearchParams(window.location.search).get("contactId")
		if (contactId) {
			const submissions = localStorage.getItem("contactSubmissions")
			if (submissions) {
				const parsed = JSON.parse(submissions)
				const userSubmission = parsed.find((s: any) => s.id === contactId)
				if (userSubmission?.feedbackAllowed) setUserHasPermission(true)
			}
		}

		setLoading(false)
	}, [])

	useEffect(() => {
		if (!loading && !feedbackEnabled && !userHasPermission) {
			console.log("Go to contact")
			// router.push("/contact")
		}
	}, [loading, feedbackEnabled, userHasPermission])

	const handleDelete = () => {
		if (!existingFeedback) return

		if (confirm("Ви впевнені, що хочете видалити свій відгук?")) {
			const updatedFeedbacks = feedbacks.filter((f) => f.id !== existingFeedback.id)
			setFeedbacks(updatedFeedbacks)
			localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks))

			setExistingFeedback(null)
			setFormData({ name: "", company: "", rating: 5, text: "" })
			setSubmitMessage("Ваш відгук видалено успішно.")
			setTimeout(() => setSubmitMessage(""), 3000)
		}
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!feedbackEnabled && !userHasPermission) {
			setSubmitMessage("Наразі ви не можете залишити відгук. Будь ласка, зв'яжіться з нами через форму контакту.")
			setTimeout(() => setSubmitMessage(""), 3000)
			return
		}

		// if (existingFeedback) {
		// 	setSubmitMessage("Ви вже залишили відгук. Ви можете його видалити та створити новий.")
		// 	setTimeout(() => setSubmitMessage(""), 3000)
		// 	return
		// }

		setIsSubmitting(true)

		const newFeedback: CommentInsert = {
			name: formData.name,
			company: formData.company,
			rating: formData.rating,
			text: formData.text,
			userId: userId,
		}

		const updatedFeedbacks = [newFeedback, ...feedbacks]
		setFeedbacks(updatedFeedbacks)
		localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks))
		setExistingFeedback(newFeedback)

		console.log("Send")

		addCommentFunc({ data: newFeedback })

		setSubmitMessage("Дякуємо за ваш відгук! Він буде опублікований після модерації.")
		setIsSubmitting(false)
		setTimeout(() => setSubmitMessage(""), 3000)
	}

	if (loading) return <div>Завантаження...</div>

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-2xl mx-auto px-4 py-20">
				<h1 className="text-3xl font-bold text-primary mb-8">Залишити відгук</h1>

				<div className="bg-card border border-border rounded-lg p-8">
					{!feedbackEnabled && !userHasPermission && (
						<div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md mb-6">
							⚠️ На даний момент форма для відгуків недоступна. Будь ласка,{" "}
							<a href="/contact" className="underline font-semibold">
								зв'яжіться з нами
							</a>{" "}
							через форму контакту.
						</div>
					)}

					{existingFeedback && (
						<div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded-md mb-6">
							Ви вже залишили відгук. Ви можете видалити його та створити новий.
						</div>
					)}

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-foreground mb-2">Ваше ім'я</label>
								<input
									type="text"
									required
									value={formData.name}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
									className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
									placeholder="Іван Петренко"
									disabled={!feedbackEnabled && !userHasPermission}
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-foreground mb-2">Компанія / Організація</label>
								<input
									type="text"
									required
									value={formData.company}
									onChange={(e) => setFormData({ ...formData, company: e.target.value })}
									className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
									placeholder="ТОВ 'Приклад'"
									disabled={!feedbackEnabled && !userHasPermission}
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-foreground mb-2">Оцінка</label>
							<select
								value={formData.rating}
								onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
								className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
								disabled={!feedbackEnabled && !userHasPermission}
							>
								<option value={5}>⭐⭐⭐⭐⭐ - Відмінно</option>
								<option value={4}>⭐⭐⭐⭐ - Дуже добре</option>
								<option value={3}>⭐⭐⭐ - Добре</option>
								<option value={2}>⭐⭐ - Задовільно</option>
								<option value={1}>⭐ - Погано</option>
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-foreground mb-2">Ваш відгук</label>
							<textarea
								required
								value={formData.text}
								onChange={(e) => setFormData({ ...formData, text: e.target.value })}
								className="w-full px-4 py-3 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-32"
								placeholder="Поділіться своєю думкою про наші послуги..."
								disabled={!feedbackEnabled && !userHasPermission}
							/>
						</div>

						<div className="flex gap-4">
							<button
								type="submit"
								disabled={isSubmitting || (!feedbackEnabled && !userHasPermission)}
								className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-md transition disabled:opacity-50"
							>
								{isSubmitting ? "Надсилання..." : "Надіслати відгук"}
							</button>

							{existingFeedback && (
								<button
									type="button"
									onClick={handleDelete}
									className="px-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-md transition"
								>
									Видалити
								</button>
							)}
						</div>

						{submitMessage && (
							<div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">{submitMessage}</div>
						)}
					</form>
				</div>
			</div>
		</div>
	)
}
