import { deleteFeedbackFunc, generateFeedbackFunc } from "@/lib/funcs/feedbacksLinks"
import { formatDate } from "@/lib/misk"
import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { useLoaderData, useRouter } from '@tanstack/react-router'

export function FeedbackLinks() {
	const {feedbackLinks} = useLoaderData({from: "/admin"})
	const router = useRouter()
	const [copiedToken, setCopiedToken] = useState<string | null>(null)

	const handleGenerateFeedbackLink = async () => {
		await generateFeedbackFunc()
		router.invalidate()
	}

	const handleDeleteLink = async (id: number) => {
		if (confirm("Ви впевнені, що хочете видалити це посилання?")) {
			await deleteFeedbackFunc({ data: { id } })
			router.invalidate()
		}
	}

	const handleCopyLink = (token: string) => {
		const link = `${window.location.origin}/feedback/${token}`
		navigator.clipboard.writeText(link)
		setCopiedToken(token)
		setTimeout(() => setCopiedToken(null), 2000)
	}

	return (
		<div className="bg-card border border-border rounded-lg p-6 mb-8">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg font-semibold text-foreground">Керування відгуками</h2>
				<button
					onClick={handleGenerateFeedbackLink}
					className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-md transition"
				>
					Згенерувати посилання
				</button>
			</div>
			<p className="text-foreground/60 text-sm mb-4">Створіть унікальне посилання для клієнта, щоб він міг залишити відгук</p>

			{feedbackLinks.length > 0 && (
				<div className="space-y-2">
					{feedbackLinks.map((link) => (
						<div key={link.id} className="flex items-center justify-between bg-background border border-border rounded p-3">
							<div className="flex-1">
								<p className="text-sm text-foreground font-mono break-all">
									{`${typeof window !== "undefined" ? window.location.origin : ""}/feedback/${link.token}`}
								</p>
								<p className="text-xs text-foreground/60 mt-1">
									Створено: {formatDate(link.createdAt)} •{" "}
									<span className={link.is_used ? "text-green-500" : "text-yellow-500"}>
										{link.is_used ? "Використано" : "Не використано"}
									</span>
								</p>
							</div>
							<div className="flex gap-2 ml-4">
								<button
									onClick={() => handleCopyLink(link.token)}
									className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition"
									title="Копіювати"
								>
									{copiedToken === link.token ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
								</button>
								<button
									onClick={() => handleDeleteLink(link.id)}
									className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded transition text-sm"
								>
									Видалити
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
