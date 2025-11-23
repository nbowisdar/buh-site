import { deleteCommentFunc, getAllCommentFunc } from "@/lib/funcs/comments"
import { deleteFeedbackFunc, generateFeedbackFunc, getAllFeedbackFunc } from "@/lib/funcs/feedbacksLinks"
import { addPriceFullFunc, deletePriceFunc, getAllPriceFullFunc, updatePriceFullFunc } from "@/lib/funcs/price"
import { formatDate } from "@/lib/misk"
import { createFileRoute, Link, useRouter } from "@tanstack/react-router"

import { Check, Copy } from "lucide-react"
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

interface PricingTable {
	id: number
	title: string
	rows: { name: string; price: string; id: number }[]
}

function RouteComponent() {
	const { comments, feedbackLinks, pricingTables } = Route.useLoaderData()
	const router = useRouter()

	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [password, setPassword] = useState("")
	const [deleteMessage, setDeleteMessage] = useState("")
	const [activeTab, setActiveTab] = useState<"feedbacks" | "pricing">("feedbacks")
	const [showTableForm, setShowTableForm] = useState(false)
	const [editingTable, setEditingTable] = useState<PricingTable | null>(null)
	const [tableFormData, setTableFormData] = useState({
		title: "",
		id: undefined,
		rows: [{ name: "", price: "", id: undefined }],
	})
	const [copiedToken, setCopiedToken] = useState<string | null>(null)

	const ADMIN_PASSWORD = "admin123"

	useEffect(() => {
		const auth = localStorage.getItem("adminAuth")
		if (auth === "true") {
			setIsAuthenticated(true)
		}
	}, [])

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault()
		if (password === ADMIN_PASSWORD) {
			localStorage.setItem("adminAuth", "true")
			setIsAuthenticated(true)
			setPassword("")
		} else {
			alert("Неправильний пароль!")
			setPassword("")
		}
	}

	const handleLogout = () => {
		localStorage.removeItem("adminAuth")
		setIsAuthenticated(false)
		setPassword("")
	}

	const handleDeleteFeedback = async (id: number) => {
		if (confirm("Ви впевнені, що хочете видалити цей відгук?")) {
			await deleteCommentFunc({ data: { id } })
			router.invalidate()
		}
	}

	const handleGenerateFeedbackLink = async () => {
		await generateFeedbackFunc()
		router.invalidate()
	}

	const handleCopyLink = (token: string) => {
		const link = `${window.location.origin}/leave-feedback?token=${token}`
		navigator.clipboard.writeText(link)
		setCopiedToken(token)
		setTimeout(() => setCopiedToken(null), 2000)
	}

	const handleDeleteLink = async (id: number) => {
		if (confirm("Ви впевнені, що хочете видалити це посилання?")) {
			await deleteFeedbackFunc({ data: { id } })
			router.invalidate()
		}
	}

	const handleAddService = () => {
		setTableFormData({
			...tableFormData,
			rows: [...tableFormData.rows, { name: "", price: "" }],
		})
	}

	const handleRemoveService = (index: number) => {
		const newServices = tableFormData.rows.filter((_, i) => i !== index)
		setTableFormData({ ...tableFormData, rows: newServices })
	}

	const handleServiceChange = (index: number, field: "name" | "price", value: string) => {
		const newServices = tableFormData.rows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
		setTableFormData({ ...tableFormData, rows: newServices })
	}

	const handleSaveTable = () => {
		if (!tableFormData.title || tableFormData.rows.some((s) => !s.name || !s.price)) {
			alert("Будь ласка, заповніть всі поля")
			return
		}

		if (editingTable) {
			console.log(tableFormData, "updatedTables")

			updatePriceFullFunc({ data: tableFormData })
			setDeleteMessage("Таблицю оновлено успішно!")
		} else {
			addPriceFullFunc({ data: tableFormData })
			setDeleteMessage("Таблицю додано успішно!")
		}
		router.invalidate()
		setShowTableForm(false)
		setEditingTable(null)
		setTableFormData({ title: "", rows: [{ name: "", price: "" }] })
		setTimeout(() => setDeleteMessage(""), 3000)
	}

	const handleEditTable = (table: PricingTable) => {
		setEditingTable(table)
		setTableFormData(table)
		// setTableFormData({ title: table.title, rows: [...table.rows] })
		setShowTableForm(true)
	}

	const handleDeleteTable = async (id: number) => {
		if (confirm("Ви впевнені, що хочете видалити цю таблицю?")) {
			await deletePriceFunc({ data: { id } })
			router.invalidate()
		}
	}

	const handleCancelTableForm = () => {
		setShowTableForm(false)
		setEditingTable(null)
		setTableFormData({ title: "", rows: [{ name: "", price: "" }] })
	}

	return (
		<div className="min-h-screen bg-background">
			<div className="max-w-7xl mx-auto px-4 py-20">
				{!isAuthenticated ? (
					<div className="max-w-md mx-auto">
						<div className="bg-card border border-border rounded-lg p-8">
							<h1 className="text-3xl font-bold text-primary mb-8">Адміністратор панель</h1>
							<form onSubmit={handleLogin} className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-foreground mb-2">Пароль</label>
									<input
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
										placeholder="Введіть пароль"
									/>
								</div>
								<button
									type="submit"
									className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 rounded-md transition"
								>
									Вхід
								</button>
							</form>
							<p className="text-xs text-foreground/60 mt-4 text-center">Пароль: admin123</p>
						</div>
					</div>
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

						{deleteMessage && (
							<div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md mb-6">{deleteMessage}</div>
						)}

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
							<p className="text-foreground/60 text-sm mb-4">
								Створіть унікальне посилання для клієнта, щоб він міг залишити відгук
							</p>

							{feedbackLinks.length > 0 && (
								<div className="space-y-2">
									{feedbackLinks.map((link) => (
										<div
											key={link.id}
											className="flex items-center justify-between bg-background border border-border rounded p-3"
										>
											<div className="flex-1">
												<p className="text-sm text-foreground font-mono break-all">
													{`${typeof window !== "undefined" ? window.location.origin : ""}/leave-feedback?token=${link.token}`}
												</p>
												<p className="text-xs text-foreground/60 mt-1">
													Створено: {formatDate(link.createdAt)} • {link.is_used ? "Використано" : "Не використано"}
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

						{activeTab === "feedbacks" && (
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
														<td className="px-6 py-4 text-sm text-foreground/80 max-w-xs truncate">
															{comment.text?.substring(0, 50)}...
														</td>
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
						)}

						{activeTab === "pricing" && (
							<div>
								<div className="bg-card border border-border rounded-lg overflow-hidden mb-6">
									<div className="p-6 bg-primary/5 border-b border-border flex justify-between items-center">
										<h2 className="text-xl font-semibold text-foreground">Керування таблицями цін</h2>
										<button
											onClick={() => setShowTableForm(true)}
											className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-md transition"
										>
											+ Додати таблицю
										</button>
									</div>
								</div>

								{showTableForm && (
									<div className="bg-card border border-border rounded-lg p-6 mb-6">
										<h3 className="text-lg font-semibold text-foreground mb-4">
											{editingTable ? "Редагувати таблицю" : "Нова таблиця"}
										</h3>

										<div className="space-y-4">
											<div>
												<label className="block text-sm font-medium text-foreground mb-2">Назва таблиці</label>
												<input
													type="text"
													value={tableFormData.title}
													onChange={(e) =>
														setTableFormData({
															...tableFormData,
															title: e.target.value,
														})
													}
													className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
													placeholder="Наприклад: Бухгалтерські послуги"
												/>
											</div>

											<div>
												<div className="flex justify-between items-center mb-2">
													<label className="block text-sm font-medium text-foreground">Послуги</label>
													<button
														type="button"
														onClick={handleAddService}
														className="text-primary hover:text-primary/80 text-sm font-semibold"
													>
														+ Додати послугу
													</button>
												</div>

												<div className="space-y-3">
													{tableFormData.rows.map((service, index) => (
														<div key={index} className="flex gap-2">
															<input
																type="text"
																value={service.name}
																onChange={(e) => handleServiceChange(index, "name", e.target.value)}
																className="flex-1 px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
																placeholder="Назва послуги"
															/>
															<input
																type="text"
																value={service.price}
																onChange={(e) => handleServiceChange(index, "price", e.target.value)}
																className="w-40 px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
																placeholder="Ціна"
															/>
															{tableFormData.rows.length > 1 && (
																<button
																	type="button"
																	onClick={() => handleRemoveService(index)}
																	className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
																>
																	×
																</button>
															)}
														</div>
													))}
												</div>
											</div>

											<div className="flex gap-2 pt-4">
												<button
													onClick={handleSaveTable}
													className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-6 rounded-md transition"
												>
													{editingTable ? "Оновити" : "Зберегти"}
												</button>
												<button
													onClick={handleCancelTableForm}
													className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-md transition"
												>
													Скасувати
												</button>
											</div>
										</div>
									</div>
								)}

								<div className="space-y-4">
									{pricingTables.length > 0 ? (
										pricingTables.map((table) => (
											<div key={table.id} className="bg-card border border-border rounded-lg overflow-hidden">
												<div className="p-4 bg-primary/5 border-b border-border flex justify-between items-center">
													<h3 className="text-lg font-semibold text-foreground">{table.title}</h3>
													<div className="flex gap-2">
														<button
															onClick={() => handleEditTable(table)}
															className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded transition text-sm"
														>
															Редагувати
														</button>
														<button
															onClick={() => handleDeleteTable(table.id)}
															className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded transition text-sm"
														>
															Видалити
														</button>
													</div>
												</div>
												<div className="p-4">
													<table className="w-full">
														<thead>
															<tr className="border-b border-border">
																<th className="text-left py-2 text-sm font-semibold text-foreground/70">Послуга</th>
																<th className="text-right py-2 text-sm font-semibold text-foreground/70">Ціна</th>
															</tr>
														</thead>
														<tbody>
															{table.rows.map((service, idx) => (
																<tr key={idx} className="border-b border-border/50">
																	<td className="py-2 text-sm text-foreground">{service.name}</td>
																	<td className="py-2 text-sm text-right font-semibold text-primary">{service.price}</td>
																</tr>
															))}
														</tbody>
													</table>
												</div>
											</div>
										))
									) : (
										<div className="bg-card border border-border rounded-lg p-8 text-center text-foreground/60">
											Немає таблиць для відображення. Створіть нову таблицю натиснувши кнопку вище.
										</div>
									)}
								</div>
							</div>
						)}

						<div className="mt-8 text-center">
							<Link to="/feedback" className="text-primary hover:underline">
								← Повернутися до відгуків
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
