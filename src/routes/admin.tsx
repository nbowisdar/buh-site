import { FeedbackLinks } from "@/components/admin/feedback-links"
import { FeedbackList } from "@/components/admin/feedback-list"
import { LoginForm } from "@/components/admin/login-form"
import { PricingManager } from "@/components/admin/pricing-manager"
import { getAllCommentFunc } from "@/lib/funcs/comments"
import { getAllFeedbackFunc } from "@/lib/funcs/feedbacksLinks"
import { getAllPriceFullFunc } from "@/lib/funcs/price"
import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from "react"

export const Route = createFileRoute("/admin")({
	loader: async () => {
		const feedbackLinks = await getAllFeedbackFunc()
		const comments = await getAllCommentFunc()
		const pricingTables = await getAllPriceFullFunc()
		return { comments, feedbackLinks, pricingTables }
	},
	component: RouteComponent,
})

function RouteComponent() {
	const { comments, pricingTables } = Route.useLoaderData()

	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [activeTab, setActiveTab] = useState<"feedbacks" | "pricing">("feedbacks")

	useEffect(() => {
		const auth = localStorage.getItem("adminAuthSecure")
		if (auth === "true") {
			setIsAuthenticated(true)
		}
	}, [])

	const handleLogout = () => {
		localStorage.removeItem("adminAuthSecure")
		setIsAuthenticated(false)
	}

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-7xl mx-auto px-4 py-20">
				{!isAuthenticated ? (
					<LoginForm onLogin={() => setIsAuthenticated(true)} />
				) : (
					<div>
						<div className="flex justify-between items-center mb-8">
							<h1 className="text-3xl font-bold text-primary">Панель адміністратора</h1>
							<button
								onClick={handleLogout}
								className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition"
							>
								Вихід
							</button>
						</div>

						<FeedbackLinks />

						<div className="flex gap-4 mb-6 border-b border-border">
							<button
								onClick={() => setActiveTab("feedbacks")}
								className={`px-4 py-2 font-semibold transition ${
									activeTab === "feedbacks"
										? "text-primary border-b-2 border-primary"
										: "text-foreground/60 hover:text-foreground"
								}`}
							>
								Відгуки ({comments.length})
							</button>
							<button
								onClick={() => setActiveTab("pricing")}
								className={`px-4 py-2 font-semibold transition ${
									activeTab === "pricing" ? "text-primary border-b-2 border-primary" : "text-foreground/60 hover:text-foreground"
								}`}
							>
								Таблиці цін ({pricingTables.length})
							</button>
						</div>

						{activeTab === "feedbacks" && <FeedbackList />}

						{activeTab === "pricing" && <PricingManager />}
					</div>
				)}
			</div>
		</div>
	)
}
